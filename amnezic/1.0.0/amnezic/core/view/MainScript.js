Aria.tplScriptDefinition({
	$classpath : "amnezic.core.view.MainScript",

	$prototype : {

        // //////////////////////////////////////////////////
		// display ready
		
		$displayReady: function() {
			this.$logDebug( '$displayReady>' );
			// this.load_game_template();
		},
        		
		// //////////////////////////////////////////////////
		// view ready
		
		$viewReady: function() {
			this.$logDebug( '$viewReady>' );
            this.moduleCtrl.init_section();
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
