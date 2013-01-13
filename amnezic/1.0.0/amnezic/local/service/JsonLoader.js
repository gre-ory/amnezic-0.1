Aria.classDefinition({
	$classpath : 'amnezic.local.service.JsonLoader',
    $extends : 'aria.core.JsObject',
	$implements : [ 'amnezic.core.service.JsonLoader' ],
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {
    
		$publicInterfaceName : 'amnezic.core.service.JsonLoader',

		// //////////////////////////////////////////////////
		// json

        load_json : function ( json_file, callback ) {
            // this.$logDebug( 'load_json>' );
            this.$logInfo( 'load_json> file : ' + json_file );
            aria.core.IO.asyncRequest({
                url: json_file,
                callback: {
                    fn: this.json_loaded,
                    onerror: this.json_loaded,
                    scope: this,
                    args: {
                        callback: callback
                    }
                }
            });
		},
        
        json_loaded : function ( response, args ) {
            // this.$logDebug( 'json_loaded>' );
            var json = response.responseJson ? response.responseJson : response.responseText ? aria.utils.Json.load(response.responseText, this) : null;
            this.$callback( args.callback, json );
		}
        
	}
	
});
