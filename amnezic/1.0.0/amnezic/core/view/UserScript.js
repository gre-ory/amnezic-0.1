Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.UserScript',

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
		// update_user
		
		update_user : function () {
			this.$logDebug( 'update_user>' );
            this.moduleCtrl.build_menu();
		}
		
	}
});
