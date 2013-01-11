Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemeScript',

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
            console.log( this.data.section.args.id );
            this.moduleCtrl.load_theme( this.data.section.args.id );
		}
		
	}
});
