Aria.classDefinition({
	$classpath : 'amnezic.mock.service.GameLoader',
    $extends : 'aria.core.JsObject',
	$implements : [ 'amnezic.core.service.GameLoader' ],
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {
    
		$publicInterfaceName : 'amnezic.core.service.GameLoader',

		// //////////////////////////////////////////////////
		// load game

        load_game : function ( json_file, callback ) {
            this.$logDebug("[load_game] Start...");        
            this.$logInfo("[load_game] file: " + json_file);
            aria.core.IO.asyncRequest({
                url: json_file,
                callback: {
                    fn: this.game_loaded,
                    onerror: this.game_loaded,
                    scope: this,
                    args: {
                        callback: callback
                    }
                }
            });
		},
        
        game_loaded : function ( response, args ) {
            this.$logDebug("[game_loaded] Start...");
            var game = response.responseJson ? response.responseJson : response.responseText ? aria.utils.Json.load(response.responseText, this) : null;
			this.$logInfo("[game_loaded] " + response.url + " >>> " + game + " >>> " + args.callback);
            this.$callback( args.callback, game );
		}
        
	}
	
});
