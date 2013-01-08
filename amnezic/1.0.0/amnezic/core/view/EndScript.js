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
		},
        
        // //////////////////////////////////////////////////
		// clear_data
		
		clear_data : function () {
			this.$logDebug( 'clear_data>' );
            this.moduleCtrl.clear_data();
		}
		
	}
});
