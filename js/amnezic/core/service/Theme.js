Aria.classDefinition({
	$classpath : 'amnezic.core.service.Theme',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'amnezic.core.service.JsonFileLoader'
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
                json_file = id ? this.controller.config.root + 'json/' + 'theme-' + id + '.json' : undefined,
                adapter = {
                    fn: this.adapt_theme,
                    scope: this,
                    args: {
                        id: id
                    }
                };
            
            service.load_json_file( json_file, adapter, callback );
        },
        
        adapt_theme : function ( json, args ) {
            this.$logDebug( 'adapt_theme>' );
            !json && ( json = {} );
            json.id = args.id;
            return json;
        }
        
	}
	
});
