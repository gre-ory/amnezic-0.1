Aria.classDefinition({
	$classpath : 'amnezic.core.service.JsonFileLoader',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// load_json_file

        load_json_file : function ( json_file, adapter, callback ) {
            this.$logDebug( 'load_json_file> ' + json_file );
            
            var args = {
                    adapter: adapter,
                    callback: callback
                };
            
            if ( json_file ) {
                aria.core.IO.asyncRequest({
                    url: json_file,
                    callback: {
                        fn: this.json_file_loaded,
                        onerror: this.json_file_loaded,
                        scope: this,
                        args: args
                    }
                });
            } else {
                this.json_file_loaded( undefined, args );
            }
		},

		// //////////////////////////////////////////////////
		// json_file_loaded
        
        json_file_loaded : function ( response, args ) {
            this.$logDebug( 'json_file_loaded>' );
            
            // decode
            var json = undefined;
            if ( response ) {
                if ( response.responseJson ) {
                    json = response.responseJson;
                }
                if ( response.responseText ) {
                    json = aria.utils.Json.load( response.responseText, this );
                }
            }
            
            // adapt
            if ( args.adapter ) {
                json = this.$callback( args.adapter, json );
            }
            
            // callback
            if ( args.callback ) {
                this.$callback( args.callback, json );
            }
            
		}
        
	}
	
});
