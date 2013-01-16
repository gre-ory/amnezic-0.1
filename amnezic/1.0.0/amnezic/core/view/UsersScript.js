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
            this.moduleCtrl.user_add();
		},     
        
		// //////////////////////////////////////////////////
		// remove
		
		remove : function ( event, user ) {
			this.$logDebug( 'remove>' );
            this.moduleCtrl.user_remove( user );
		},   
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, user ) {
			this.$logDebug( 'activate>' );
            this.moduleCtrl.user_activate( user );
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, user ) {
			this.$logDebug( 'deactivate>' );
            this.moduleCtrl.user_deactivate( user );
		}
		
	}
});
