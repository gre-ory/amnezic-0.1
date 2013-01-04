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
		// add
		
		add : function () {
			this.$logDebug( 'add>' );
            this.moduleCtrl.add_user();
		},     
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, args ) {
			this.$logDebug( 'activate>' );
            var user = args && args.length > 0 ? args[0] : undefined;
            if ( user ) {
                this.moduleCtrl.activate_user( user );
            }
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, args ) {
			this.$logDebug( 'deactivate>' );
            var user = args && args.length > 0 ? args[0] : undefined;
            if ( user ) {
                this.moduleCtrl.deactivate_user( user );
            }
		},     
        
		// //////////////////////////////////////////////////
		// update
		
		update : function () {
			this.$logDebug( 'update>' );
            // this.moduleCtrl.build_menu();
		},     
        
		// //////////////////////////////////////////////////
		// cancel
		
		cancel : function () {
			this.$logDebug( 'cancel>' );
            // this.moduleCtrl.build_menu();
		}
		
	}
});
