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
            this.moduleCtrl.store_data();
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
		
		remove : function ( event, user ) {
			this.$logDebug( 'add>' );
            this.moduleCtrl.remove_user( user );
		},   
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, user ) {
			this.$logDebug( 'activate>' );
            this.moduleCtrl.activate_user( user );
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, user ) {
			this.$logDebug( 'deactivate>' );
            this.moduleCtrl.deactivate_user( user );
		}
		
	}
});
