Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.UsersScript',

	$prototype : {
		
		// //////////////////////////////////////////////////
		// displayReady
		
		$displayReady : function () {
            this.service = this.moduleCtrl.get_service();
            this.game_id = 0;
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
            aria.utils.Json.setValue( this.data, 'users', [] );
            this.retrieve_all();
		},     
        
        // //////////////////////////////////////////////////
		// retrieve_all
		
		retrieve_all : function () {
            this.$logDebug( 'retrieve_all>' );
            this.service.user.retrieve_all_by_game( this.game_id, { fn: this.on_retrieve_all, scope: this } );
		},
		
		on_retrieve_all : function ( users ) {
			this.$logDebug( 'on_retrieve_all>' );
            aria.utils.Json.setValue( this.data, 'users', users );
		},
        
		// //////////////////////////////////////////////////
		// add
		
		add : function () {
			this.$logDebug( 'add>' );
            var number = this.data.users ? this.data.users.length + 1 : 1;
            this.service.user.add( this.game_id, 'User ' + number, { fn: this.on_add, scope: this } );
		},
		
		on_add : function ( oid ) {
			this.$logDebug( 'on_add> oid: ' + oid );
            this.retrieve_all();
		},     
        
		// //////////////////////////////////////////////////
		// remove
		
		remove : function ( event, user ) {
			this.$logDebug( 'remove>' );
            this.service.user.remove( user.oid, { fn: this.on_remove, scope: this } );
		},
		
		on_remove : function () {
			this.$logDebug( 'on_remove>' );
            this.retrieve_all();
		},   
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, user ) {
			this.$logDebug( 'activate>' );
            this.service.user.activate( user.oid, { fn: this.on_activate, scope: this, args: user } );
		},
		
		on_activate : function ( user ) {
			this.$logDebug( 'on_activate>' );
            aria.utils.Json.setValue( user, 'active', true );
		},   
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, user ) {
			this.$logDebug( 'deactivate>' );
            this.service.user.deactivate( user.oid, { fn: this.on_deactivate, scope: this, args: user } );
		},
		
		on_deactivate : function ( user ) {
			this.$logDebug( 'on_deactivate>' );
            aria.utils.Json.setValue( user, 'active', false );
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
