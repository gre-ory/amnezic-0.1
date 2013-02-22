Aria.classDefinition({
	$classpath : 'amnezic.service.DeezerAlbum',
	$implements : [ 'amnezic.service.TrackFetcher' ],
	$prototype : {
		
		$publicInterfaceName : 'amnezic.service.TrackFetcher',

		// //////////////////////////////////////////////////
		// fetch

		fetch : function ( controller, album_id, callback ) {
            album_id = album_id || 302127;
            
            /*
            // token : fr1ikDCTl150bddff9394e3IyBTk4lc50bddff939521q5HyeXx
			controller.submitJsonRequest('http://api.deezer.com/2.0/deezer/album/' + album_id, {}, {
				fn : "_fetch",
				scope : controller,
				args : [ controller, album_id, callback ]
			});
            */
            
            jQuery.ajax({
                type: 'GET',
                url: 'http://api.deezer.com/2.0/album/' + album_id + '?output=jsonp',
                contentType: 'application/json; charset=utf-8',
                dataType: 'jsonp',
                error: function () {
                    controller.$logInfo("[error] Start...");
                    this._fetch( controller, callback, undefined );
                }.bind(this),
                success: function ( response ) {
                    controller.$logInfo("[success] Start...");
                    this._fetch( controller, callback, response );
                }.bind(this)
            });
            
		},
        
        _fetch : function ( controller, callback, response ) {
            var theme = {},
                music = {},
                musics = [];
                
            controller.$logInfo("[_fetch] Start...");
            
            if ( response ) {
                controller.$logInfo("[_fetch] album: " + response.id + ' - ' + response.title );
                theme.title = response.title;
                theme.url = response.cover;
                
    			if ( response.tracks && response.tracks.data ) {
                    for ( i = 0 ; i < response.tracks.data.length; i++ ) {
                        var track = response.tracks.data[i];
                        music = {};
                        music.title = track.title;
                        if ( track.artist ) {
                            music.artist = track.artist.name;
                        }
                        music.url = track.preview;
                        music.external_url = track.link;
                        controller.$logInfo("[_fetch] music: " + music.title + " by " + music.artist );
                        musics.push( music );
                    }
                }
            }
            
            controller.$logInfo("[_fetch] length: " + musics.length );
            controller.$logInfo("[_fetch] callback: " + callback );
            controller.$logInfo("[_fetch] callback.scope: " + callback.scope );
            
			controller.$callback( callback, [ theme, musics ] );
            
		}
		
	}
	
});
