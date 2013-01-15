Aria.classDefinition({
	$classpath : 'amnezic.deezer.service.Search',
    $extends : 'amnezic.core.service.JsonUrlLoader',
	$prototype : {

		// //////////////////////////////////////////////////
		// search

		search : function ( search, callback ) {
            this.$logDebug( 'search>' );
            
            var url = 'http://api.deezer.com/2.0/search?q=' + search + '&output=jsonp',
                adapter = this.adapt.bind(this);
            
            this.load_json_url( url, adapter, callback );
		},
        
        adapt : function ( json ) {
            this.$logDebug( 'adapt>' );
            
            console.log( json );
            
            var max_tracks = 20,
                tracks = json ? json.data : undefined,
                questions = [];
            
            if ( tracks ) {
                for ( var i = 0 ; i < tracks.length && i < max_tracks ; i++ ) {
                    var track = tracks[i];
                    if ( track.readable ) {
                        var question = {
                            answer: track.artist ? track.artist.name : undefined,
                            hint: track.title,
                            img: track.album ? track.album.cover : undefined,
                            mp3: track.preview 
                        };
                        questions.push( question ); 
                    }
                }
            }
            
            return {
                questions: questions
            };
		}
		
	}
	
});
