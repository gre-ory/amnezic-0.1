Aria.classDefinition({
	$classpath : 'amnezic.core.service.JsonFileLoader',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// load_json_file

        load_json_file : function ( json_file, adapter, callback ) {
            this.$logDebug( 'load_json_file> ' + json_file );
            
            aria.core.IO.asyncRequest({
                url: json_file,
                callback: {
                    fn: this.json_file_loaded,
                    onerror: this.json_file_loaded,
                    scope: this,
                    args: {
                        adapter: adapter,
                        callback: callback
                    }
                }
            });
		},

		// //////////////////////////////////////////////////
		// json_file_loaded
        
        json_file_loaded : function ( response, args ) {
            this.$logDebug( 'json_file_loaded>' );
            
            // json
            var json = response.responseJson ? response.responseJson : response.responseText ? aria.utils.Json.load(response.responseText, this) : null;

            // adapt
            if ( args.adapter ) {
                json = args.adapter( json );
            }
            
            // callback
            if ( args.callback ) {
                this.$callback( args.callback, json );
            }
            
		}
        
	}
	
});
