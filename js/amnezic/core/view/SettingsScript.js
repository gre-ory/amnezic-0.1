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
			// this.$logDebug( '$displayReady>' );
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			// this.$logDebug( '$viewReady>' );
            if ( !this.data.settings ) {
                aria.utils.Json.setValue( this.data, 'settings', {} );
            }
            if ( !this.data.settings.nb_questions ) {
                aria.utils.Json.setValue( this.data.settings, 'nb_questions', 10 );
            }
		}
		
	}
});
