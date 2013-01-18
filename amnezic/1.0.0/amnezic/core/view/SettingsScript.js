Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.SettingsScript',

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
            aria.utils.Json.setValue( this.data, 'nb', 10 );
		},
        
        // //////////////////////////////////////////////////
		// increment
        
		increment : function () {
			this.$logDebug( 'increment>' );
            aria.utils.Json.setValue( this.moduleCtrl.getData(), 'nb', ( this.data.nb + 1 ) );
		},

        // //////////////////////////////////////////////////
		// decrement
        		
		decrement : function () {
			this.$logDebug( 'decrement>' );
            aria.utils.Json.setValue( this.data, 'nb', ( this.data.nb - 1 ) );
		}
		
	}
});
