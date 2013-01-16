Aria.classDefinition({
	$classpath : 'amnezic.core.service.Theme',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'aria.utils.Json'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$JsObject.constructor.call(this);
        // this.$logDebug( 'constructor>' );
        this.controller = controller;
    },
    
	$prototype : {
        
        // //////////////////////////////////////////////////
        // set_all
                
        set_all : function( themes ) {
            this.$logDebug( 'set_all>' );
            !themes && ( themes = [] );
            var data = this.controller.getData();
            aria.utils.Json.setValue( data, 'themes', themes );
            return themes;
        },
        
        // //////////////////////////////////////////////////
        // get_all
                
        get_all : function() {
            this.$logDebug( 'get_all>' );
            var data = this.controller.getData();
            return data.themes || this.set_all( undefined );
        },
        
        // //////////////////////////////////////////////////
        // set
                
        set : function( theme ) {
            this.$logDebug( 'set>' );
            !theme && ( theme = {} );
            var data = this.controller.getData();
            aria.utils.Json.setValue( data, 'theme', theme );
            return theme;
        },
        
        // //////////////////////////////////////////////////
        // get
                
        get : function() {
            this.$logDebug( 'get>' );
            var data = this.controller.getData();
            return data.theme || this.set( undefined );
        },
        
        // //////////////////////////////////////////////////
        // set_by_index
                
        set_by_index : function( index, theme ) {
            this.$logDebug( 'set>' );
            !theme && ( theme = {} );
            var themes = this.get_all();
            if ( 0 <= index && index < themes.length ) {
                aria.utils.Json.removeAt( themes, index );
                aria.utils.Json.add( themes, theme, index );
            } else if ( index == themes.length ) {
                aria.utils.Json.add( themes, theme );
            }
            return theme;
        },
        
        // //////////////////////////////////////////////////
        // get_by_index
                
        get_by_index : function( index ) {
            this.$logDebug( 'get_by_index>' );
            var themes = this.get_all();
            !index && ( index = themes.length );
            if ( 0 <= index && index < themes.length ) {
                return themes[index] || this.set_by_index( index, undefined );
            }
            if ( index == themes.length ) {
                return this.set_by_index( index, undefined );
            }
            return undefined;
        },
        
        // //////////////////////////////////////////////////
        // set_by_id
                
        set_by_id : function( id, theme ) {
            this.$logDebug( 'set_by_id>' );
            !theme && ( theme = {} );
            !theme.id && ( theme.id = id );
            var themes = this.get_all();
            for ( var i = 0 ; i < themes.length ; i++ ) {
                if ( themes[i].id == theme.id ) {
                    aria.utils.Json.removeAt( themes, i );
                    aria.utils.Json.add( themes, theme, i );
                    return theme;
                }
            }
            aria.utils.Json.add( themes, theme );
            return theme;
        },
        
        // //////////////////////////////////////////////////
        // get_by_id
                
        get_by_id : function( id ) {
            this.$logDebug( 'get_by_id>' );
            var themes = this.get_all();
            for ( var i = 0 ; i < themes.length ; i++ ) {
                if ( themes[i].id == id ) {
                    return themes[i] || this.set_by_id( id, undefined );
                }
            }
            return this.set_by_id( id, undefined );
        },
        
        // //////////////////////////////////////////////////
        // retrieve_all

        retrieve_all : function( callback ) {
            this.$logDebug( 'retrieve_all>' );
            
            var service = new amnezic.core.service.JsonFileLoader(),
                json_file = this.controller.config.root + 'json/themes.json',
                adapter = {
                    fn: this.adapt_themes,
                    scope: this
                };
            
            service.load_json_file( json_file, adapter, callback );
        },
        
        adapt_themes : function ( json ) {
            this.$logDebug( 'adapt_themes>' );
            !json && ( json = {} );
            !json.themes && ( json.themes = [] );
            return json.themes;
        },
        
        // //////////////////////////////////////////////////
        // retrieve
        
        retrieve : function( id, callback ) {
            this.$logDebug( 'retrieve>' );
            
            var service = new amnezic.core.service.JsonFileLoader(),
                theme = this.get_by_id( id ),
                json_file = theme ? this.controller.config.root + 'json/' + theme.json : undefined,
                adapter = {
                    fn: this.adapt_theme,
                    scope: this,
                    args: {
                        id: theme.id,
                        json: theme.json
                    }
                };
            
            service.load_json_file( json_file, adapter, callback );
        },
        
        adapt_theme : function ( json, args ) {
            this.$logDebug( 'adapt_theme>' );
            !json && ( json = {} );
            json.id = args.id;
            json.json = args.json;
            return json;
        },

        // //////////////////////////////////////////////////
        // activate
                
        activate : function( theme ) {
            this.$logDebug( 'activate>' );
            aria.utils.Json.setValue( theme, 'active', true );
        },

        // //////////////////////////////////////////////////
        // deactivate
                
        deactivate : function( theme ) {
            this.$logDebug( 'deactivate>' );
            aria.utils.Json.setValue( theme, 'active', false );
        },
        
        // //////////////////////////////////////////////////
        // add_question
                
        add_question : function( theme, question ) {
            this.$logDebug( 'add_question>' );
            aria.utils.Json.add( theme.questions, question );
        },
        
        // //////////////////////////////////////////////////
        // remove_question_at
                
        remove_question_at : function( theme, index ) {
            this.$logDebug( 'remove_question_at>' );
            aria.utils.Json.removeAt( theme.questions, index );
        }
        
	}
	
});
