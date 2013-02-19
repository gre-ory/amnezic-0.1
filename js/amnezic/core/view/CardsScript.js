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
			this.$logDebug( '$displayReady>' );
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            jQuery( '#' + this.data.container_id ).modal();
		},
        
        // //////////////////////////////////////////////////
		// select_card
		
		select_card : function ( event, card ) {
			this.$logDebug( 'select_card>' );
            
            jQuery( '#' + this.data.container_id ).modal( 'hide' );
            
            if ( this.data.user ) {
                aria.utils.Json.setValue( this.data.user, 'card', card );
            }
		}
		
	}
});
