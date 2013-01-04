Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.UsersScript',

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
		// remove
		
		remove : function ( event, args ) {
			this.$logDebug( 'add>' );
            var user = args && args.length > 0 ? args[0] : undefined;
            if ( user ) {
                this.moduleCtrl.remove_user( user );
            }
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
		}
		
	}
});
