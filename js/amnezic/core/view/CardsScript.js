Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.CardsScript',

	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function () {
		this.$logDebug( 'constructor>' );
	},

	$prototype : {
		
		// //////////////////////////////////////////////////
		// displayReady
		
		$displayReady : function () {
			// this.$logDebug( '$displayReady>' );
            this.service = this.moduleCtrl.get_service();
            this.user = this.service.user;
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			// this.$logDebug( '$viewReady>' );
            jQuery( '#' + this.data.container_id ).modal();
		},
        
        // //////////////////////////////////////////////////
		// update_card
		
		update_card : function ( event, card ) {
			this.$logDebug( 'update_card>' );
            jQuery( '#' + this.data.container_id ).modal( 'hide' );
            this.user.update_card( this.data.user.oid, card, { fn: this.on_update_card, scope: this, args: card } );
		},
		
		on_update_card : function ( success, card ) {
			this.$logDebug( 'on_update_card>' );
            success && aria.utils.Json.setValue( this.data.user, 'card', card );
		}
		
	}
});
