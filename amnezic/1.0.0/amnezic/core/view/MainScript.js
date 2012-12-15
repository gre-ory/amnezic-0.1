Aria.tplScriptDefinition({
	$classpath : "amnezic.core.view.MainScript",

	$prototype : {

        // //////////////////////////////////////////////////
		// display ready
		
		$displayReady: function() {
			this.$logDebug( "[$displayReady] Start..." );
			this.load_game_template();
		},
        		
		// //////////////////////////////////////////////////
		// view ready
		
		$viewReady: function() {
			this.$logDebug( "[$viewReady] Start..." );
		},
        		
		// //////////////////////////////////////////////////
		// load game template
		
		load_game_template: function( div ) {
			this.$logDebug( "[load_game_template] Start..." );
            Aria.loadTemplate({
				classpath: "amnezic.core.view.Game",
				div: div || "game",
                moduleCtrl: this.moduleCtrl
			});
		}
		
	}
});
