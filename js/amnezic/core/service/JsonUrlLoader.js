Aria.classDefinition({
	$classpath : 'amnezic.core.service.JsonUrlLoader',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// json

        load_json_url : function ( json_url, adapter, on_success, on_error ) {
            this.$logDebug( 'load_json> ' + json_url );
            
            var args = {
                    adapter: adapter,
                    on_success: on_success,
                    on_error: on_error
                };
            
            if ( json_url ) {
                aria.core.IO.asyncRequest({
                    url: json_url,
                    callback: {
                        fn: this.json_url_loaded,
                        onerror: this.json_url_loaded,
                        scope: this,
                        args: args
                   }
                });
            } else {
                this.json_url_loaded( undefined, args );
            }
		},

		// //////////////////////////////////////////////////
		// json_url_loaded
                
        json_url_loaded : function ( response, args ) {
            // this.$logDebug( 'json_url_loaded>' );
                
            var json = undefined,
                error = undefined;
            
            // decode json
            if ( response ) {
                if ( response.responseJson ) {
                    json = response.responseJson;
                }
                if ( response.responseText ) {
                    json = aria.utils.Json.load( response.responseText, this );
                }
            }
            
            // decode data or error
            if ( args.adapter ) {
                var result = this.$callback( args.adapter, json );
                // this.$logDebug( 'json_url_loaded> result: ' + result );
                json = result.json ? result.json : undefined;
                error = result.error ? result.error : undefined;
            }
            
            // this.$logDebug( 'json_url_loaded> json: ' + json );
            // this.$logDebug( 'json_url_loaded> error: ' + error );
            
            if ( args.on_error && error ) {
                this.$callback( args.on_error, error );
            }
            if ( args.on_success ) {
                this.$callback( args.on_success, json );
            }
		}
        
	}
	
});
