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
            this.load_themes();
		},
        
        // //////////////////////////////////////////////////
		// load_themes
		
		load_themes : function () {
			this.$logDebug( 'load_themes>' );
            
            if ( this.data.themes ) {
                this.themes_loaded( this.data.themes );
                return;
            }
            
            var callback = {
                    fn: this.themes_loaded,
                    scope: this
                };
            
            this.moduleCtrl.theme_retrieve_all( callback );
		},
		
		themes_loaded : function ( themes ) {
			this.$logDebug( 'themes_loaded>' );
            this.$json.setValue( this.data, 'themes', themes );
            this.$json.setValue( this.data, 'nb_themes_loaded', 0 );
            for ( var i = 0 ; i < themes.length ; i++ ) {
                this.load_theme( themes[i] );
            }
		},
        
        // //////////////////////////////////////////////////
		// load_theme
		
		load_theme : function ( theme ) {
			this.$logDebug( 'load_theme>' );
            
            var id = theme ? theme.id : undefined,
                themes = this.data.themes,
                args = {
                    id: id
                },
                callback = {
                    fn: this.theme_loaded,
                    scope: this,
                    args: args
                };
            
            if ( themes ) {
                for ( var i = 0 ; i < themes.length ; i++ ) {
                    if ( theme.id == themes[i].id ) {
                        if ( themes[i].questions ) {
                            this.theme_loaded( themes[i], args );
                            return;
                        }
                        break;
                    }
                }
            }
            
            this.moduleCtrl.theme_retrieve( id, callback );
		},
		
        theme_loaded : function ( theme, args ) {
			this.$logDebug( 'theme_loaded>' );
            this.$json.setValue( this.data, 'nb_themes_loaded', ( this.data.nb_themes_loaded + 1 ) );
            
            var id = args ?  args.id : undefined,
                themes = this.data.themes;
                
            for ( var i = 0 ; i < themes.length ; i++ ) {
                if ( id == themes[i].id ) {
                    aria.utils.Json.removeAt( themes, i );
                    aria.utils.Json.add( themes, theme, i );
                    return;            
                }
            }
            
            if ( theme ) {
                aria.utils.Json.add( themes, theme );
            }
		},
        
		// //////////////////////////////////////////////////
		// activate
		
		activate : function ( event, theme ) {
			this.$logDebug( 'activate>' );
            aria.utils.Json.setValue( theme, 'active', true );
		},     
        
		// //////////////////////////////////////////////////
		// deactivate
		
		deactivate : function ( event, theme ) {
			this.$logDebug( 'deactivate>' );
            aria.utils.Json.setValue( theme, 'active', false );
		}
		
	}
});
