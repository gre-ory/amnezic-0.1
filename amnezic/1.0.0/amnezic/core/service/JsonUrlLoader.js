Aria.classDefinition({
	$classpath : 'amnezic.core.service.JsonUrlLoader',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// json

        load_json_url : function ( json_url, adapter, callback ) {
            this.$logDebug( 'load_json> ' + json_url );
            
            if ( json_url ) {
                jQuery.ajax( {
                    type: 'GET',
                    url: json_url,
                    contentType: 'application/json; charset=utf-8',
                    dataType: 'jsonp',
                    error: function () {
                        this.json_url_loaded( undefined, adapter, callback );
                    }.bind(this),
                    success: function ( response ) {
                        this.json_url_loaded( response, adapter, callback );
                    }.bind(this)
                } );
            } else {
                this.json_url_loaded( undefined, adapter, callback );
            }
            
            // var args = {
            //         adapter: adapter,
            //         callback: callback
            //     };
            // 
            // if ( json_file ) {
            //     aria.core.IO.asyncRequest({
            //         url: json_file,
            //         callback: {
            //             fn: this.json_url_loaded,
            //             onerror: this.json_url_loaded,
            //             scope: this,
            //             args: args
            //        }
            //     });
            // } else {
            //     this.json_url_loaded( undefined, args );
            // }
		},

		// //////////////////////////////////////////////////
		// json_url_loaded
                
        json_url_loaded : function ( response, adapter, callback ) {
            this.$logDebug( 'json_url_loaded' );
            
            // decode
            var json = response;
            // var json = undefined;
            // if ( response ) {
            //     if ( response.responseJson ) {
            //         json = response.responseJson;
            //     }
            //     if ( response.responseText ) {
            //         json = aria.utils.Json.load( response.responseText, this );
            //     }
            // }
            
            // adapt
            if ( adapter ) {
                json = this.$callback( adapter, json );
            }
            // if ( args.adapter ) {
            //     json = args.adapter( json );
            // }

            // callback
            if ( callback ) {
                this.$callback( callback, json );
            }
            // if ( args.callback ) {
            //     this.$callback( args.callback, json );
            // }

		}
        
	}
	
});
