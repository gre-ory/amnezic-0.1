Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemesScript',

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
            this.moduleCtrl.store_data();
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
		}, 
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, theme ) {
			this.$logDebug( 'activate>' );
            this.moduleCtrl.activate_theme( theme );
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, theme ) {
			this.$logDebug( 'deactivate>' );
            this.moduleCtrl.deactivate_theme( theme );
		}
		
	}
});
