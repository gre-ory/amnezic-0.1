Aria.classDefinition({
	$classpath : 'amnezic.deezer.service.Search',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// search

		search : function ( search, callback ) {
            this.$logDebug( 'search>' );
            !search && search = 'jackson';
            
            var url = 'http://api.deezer.com/2.0/search?q=' + search + '&output=jsonp';
            
            /*
            jQuery.ajax({
                type: 'GET',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'jsonp',
                error: function () {
                    this.$logDebug( 'error>' );
                    this.found( search, callback, null );
                }.bind(this),
                success: function ( response ) {
                    this.$logDebug( 'success>' );
                    this.found( search, callback, response );
                }.bind(this)
            });
            */
            
            aria.core.IO.asyncRequest({
                url: url,
                callback: {
                    fn: this.found,
                    onerror: this.found,
                    scope: this,
                    args: {
                        callback: callback
                    }
                }
            })
            
		},
        
        found : function ( response, args ) {
            this.$logDebug( 'found>' );
            
            console.log( response );
            console.log( args );
            
            
            /*
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
            */
            
		}
		
	}
	
});
