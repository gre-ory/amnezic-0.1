Aria.classDefinition({
	$classpath : 'amnezic.deezer.service.Search',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// search

		search : function ( search, callback ) {
            this.$logDebug( 'search>' );
            
            var url = 'http://api.deezer.com/2.0/search?q=' + search + '&output=jsonp';
            
            jQuery.ajax({
                type: 'GET',
                url: url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'jsonp',
                error: function () {
                    this.found( undefined, callback );
                }.bind(this),
                success: function ( response ) {
                    this.found( response, callback );
                }.bind(this)
            });
            
            // TODO : make it work with aria!!!
            /*
            aria.core.IO.asyncRequest({
                url: url,
                method: 'POST',
                callback: {
                    fn: this.found,
                    onerror: this.found,
                    scope: this,
                    args: {
                        callback: callback
                    }
                }
            });
            */
            
		},
        
        found : function ( response, callback ) {
            this.$logDebug( 'found>' );
            
            console.log( response );
            // console.log( callback );
            
            var questions = [];
            
            if ( response.data ) {
                for ( var i = 0 ; i < response.data.length && i < 20 ; i++ ) {
                    var track = response.data[i];
                    // console.log( track );
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
            
            if ( callback ) {
                this.$callback( callback, { questions: questions } );
            }
            
		}
		
	}
	
});
