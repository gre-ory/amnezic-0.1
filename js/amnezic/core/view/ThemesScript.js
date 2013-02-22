Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemesScript',

	$prototype : {
		
		// //////////////////////////////////////////////////
		// displayReady
		
		$displayReady : function () {
            this.service = this.moduleCtrl.get_service();
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
            this.retrieve_all();
		},
        
        // //////////////////////////////////////////////////
		// retrieve_all
		
		retrieve_all : function () {
            aria.utils.Json.setValue( this.data, 'themes', [] );
            this.service.theme.retrieve_all_actives( { fn: this.on_retrieve_all, scope: this } );
		},
		
		on_retrieve_all : function ( themes ) {
            aria.utils.Json.setValue( this.data, 'themes', themes );
		},
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, theme ) {
            aria.utils.Json.setValue( theme, 'active', true );
		},  
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, theme ) {
            aria.utils.Json.setValue( theme, 'active', false );
		}
		
	}
});
