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
            
            // TODO : fix this > should be handled by the controller itself
            this.moduleCtrl.store_data();
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            this.load_themes();
		},
        
        // //////////////////////////////////////////////////
		// load_themes
		
		load_themes : function () {
			this.$logDebug( 'load_themes>' );
            
            var callback = {
                    fn: this.themes_loaded,
                    scope: this
                };
            
            this.moduleCtrl.load_themes( callback );
		},
        
        // //////////////////////////////////////////////////
		// themes_loaded
		
		themes_loaded : function ( themes ) {
			this.$logDebug( 'themes_loaded>' );
            
            this.$json.setValue( this.data, 'themes', themes );
            
            for ( var i = 0 ; i < themes.length ; i++ ) {
                var theme = themes[i];
                this.load_theme( theme );
            }
		},
        
        // //////////////////////////////////////////////////
		// load_theme
		
		load_theme : function ( theme ) {
			this.$logDebug( 'load_theme>' );
            
            var id = theme ? theme.id : undefined,
                callback = {
                    fn: this.theme_loaded,
                    scope: this,
                    args: {
                        id: id
                    }
                };

            this.moduleCtrl.load_theme( id, callback );
		},
        
        // //////////////////////////////////////////////////
		// theme_loaded
		
		theme_loaded : function ( theme, args ) {
			this.$logDebug( 'theme_loaded>' );
            
            var id = args ?  args.id : undefined,
                themes = this.data.themes;
                
            for ( var i = 0 ; i < themes.length ; i++ ) {
                var current_theme = themes[i];
                if ( id == current_theme.id ) {
                    for ( var name in theme ) {
                        this.$json.setValue( current_theme, name, theme[name] );
                    }
                    return;            
                }
            }
		},
        
        // //////////////////////////////////////////////////
		// store_theme
		
		store_theme : function ( theme ) {
			this.$logDebug( 'store_theme>' );
            
            this.$json.setValue( this.data, 'theme', theme );
            // TODO : fix this > should be handled by the controller itself
            this.moduleCtrl.store_data();
		}, 
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, theme ) {
			this.$logDebug( 'activate>' );
            this.moduleCtrl.activate_theme( theme );
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, theme ) {
			this.$logDebug( 'deactivate>' );
            this.moduleCtrl.deactivate_theme( theme );
		}
		
	}
});
