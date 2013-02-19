Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.EndScript',

	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function () {
		this.$logDebug( 'constructor>' );
	},

	$prototype : {
		
		// //////////////////////////////////////////////////
		// displayReady
		
		$displayReady : function () {
			this.$logDebug( '$displayReady>' );
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            this.load_confetti();
		},
        
        // //////////////////////////////////////////////////
		// clear_data
		
		clear_data : function () {
			this.$logDebug( 'clear_data>' );
            this.moduleCtrl.clear_data();
		},
        
        // //////////////////////////////////////////////////
		// load_confetti
		
		load_confetti : function () {
			this.$logDebug( 'load_confetti>' );
            var view = 'amnezic.core.view.Confetti',
                container = aria.utils.Dom.getElementById( 'confetti' ),
                template = { 
					classpath: view,
					div: container,
                    moduleCtrl: this.moduleCtrl
				};
            Aria.loadTemplate( template );
		}
		
	}
});
