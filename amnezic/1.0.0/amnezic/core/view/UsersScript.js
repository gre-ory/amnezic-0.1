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
		},

        // //////////////////////////////////////////////////
		// select_card
                
        select_card : function ( event, user ) {
            this.$logDebug( 'select_card>' );
            
            Aria.loadTemplate( { 
				classpath: 'amnezic.core.view.Cards',
				div: 'select_card',
				moduleCtrl: this.moduleCtrl,
				data : {
                    container_id: 'select_card',
                    user: user
                }
			} );
        }
		
	}
});
