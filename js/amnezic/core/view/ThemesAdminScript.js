Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemesScript',

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
            if ( !this.data.themes ) {
                this.retrieve_all();
            }
		},
        
        // //////////////////////////////////////////////////
		// retrieve_all
		
		retrieve_all : function () {
			this.$logDebug( 'retrieve_all>' );
            this.moduleCtrl.theme_retrieve_all( { fn: this.on_retrieve_all, scope: this } );
		},
		
		on_retrieve_all : function ( themes ) {
			this.$logDebug( 'on_retrieve_all>' );
            aria.utils.Json.setValue( this.data, 'themes', themes );
		},
        
		// //////////////////////////////////////////////////
		// insert
		
		insert : function ( event ) {
			this.$logDebug( 'insert> ' );
            this.moduleCtrl.theme_insert( '???', { fn: this.on_insert, scope: this } );
		},
		
		on_insert : function ( oid ) {
			this.$logDebug( 'on_insert> ' + oid );
            if ( oid ) {
                this.retrieve_all();
            }
		},
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, theme ) {
			this.$logDebug( 'activate> ' + theme.oid );
            this.moduleCtrl.theme_activate( theme.oid, { fn: this.on_activate, scope: this, args: theme } );
		},
        
        on_activate : function ( result, theme ) {
			this.$logDebug( 'on_activate> ' + theme.oid );
            aria.utils.Json.setValue( theme, 'active', true );
		}, 
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, theme ) {
			this.$logDebug( 'deactivate> ' + theme.oid );
            this.moduleCtrl.theme_deactivate( theme.oid, { fn: this.on_activate, scope: this, args: theme } );
		},
        
        on_deactivate : function ( result, theme ) {
			this.$logDebug( 'on_deactivate> ' + theme.oid );
            aria.utils.Json.setValue( theme, 'active', true );
		}
		
	}
});
