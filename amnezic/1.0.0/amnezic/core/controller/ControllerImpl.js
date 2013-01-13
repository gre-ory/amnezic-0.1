Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.Json',
        'aria.utils.HashManager',
        'aria.storage.SessionStorage',
        'amnezic.core.controller.Flow',
        'amnezic.local.service.JsonLoader',
        'amnezic.deezer.service.Search'
    ],
    $statics: {
        AMNEZIC_ROOT: 'amnezic/1.0.0/'
    },
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function () {
        this.$logDebug( 'constructor>' );
        this._enableMethodEvents = true;
        this.$ModuleCtrl.constructor.call(this);
        this.$json = aria.utils.Json;
        this.storage = new aria.storage.SessionStorage( { namespace: 'amnezic' } );
        
        // data
        this.fetch_data();
        var data = this.getData(),
            admin = aria.utils.QueryString.getKeyValue('admin');
        this.$json.setValue( data, 'admin', typeof admin == 'string' );
        this.$json.addListener( data, null, this.store_data.bind(this), false, true );
        
        // on new hash
        aria.utils.HashManager.addCallback( {
            fn : this.on_new_hash,
            scope : this
        } );
        
    },
    
    // //////////////////////////////////////////////////
    // destructor
    
    $destructor : function () {
        this.$logDebug( 'destructor>' );
        this.$ModuleCtrl.$destructor.call(this);
    },

    $prototype : {
        
        $publicInterfaceName : 'amnezic.core.controller.Controller',

        // //////////////////////////////////////////////////
        // data

        fetch_data : function() {
            // this.$logDebug( 'fetch_data>' );
            var default_data = {
                    users: [],
                    themes: undefined,
                    theme: undefined,
                    search: {
                        request: 'mars',
                        response: undefined
                    },
                    section: undefined
                },
                stored_data = this.storage.getItem( 'data' ),
                data = stored_data || default_data;
            
            this.setData( data );
        },
        
        store_data : function() {
            this.$logDebug( 'store_data>' );
            this.storage.setItem( 'data', this.getData() );
        },
        
        clear_data : function() {
            this.$logDebug( 'clear_data>' );
            this.storage.removeItem( 'data' );
            this.fetch_data(); // reset data as no data is stored
        },

        // //////////////////////////////////////////////////
        // hash
        
        on_new_hash : function() {
            this.$logDebug( 'on_new_hash>' );
            var hash = aria.utils.HashManager.getHashString();
            this.load_section( hash );
        },
        
        // //////////////////////////////////////////////////
        // section
        
        // TODO: check consistency between data and hash ( #setting when data non initialized )
        
        load_current_section : function() {
            this.$logDebug( 'load_current_section>' );
            this.on_new_hash();
        },
        
        load_section : function( hash ) {
            this.$logDebug( 'load_section> ' + hash );
            
            var section = amnezic.core.controller.Flow.get_section( hash ),
                div = 'section',
                data = this.getData();
            
            // section
            this.$json.setValue( data, 'section', section );
              
            Aria.loadTemplate( { 
				classpath: section.view,
				div: div,
				moduleCtrl: this,
				data : data
			} );
        },

        // //////////////////////////////////////////////////
        // users
        
        get_users : function() {
            this.$logDebug( 'get_users>' );
            var data = this.getData();
            return data.users || [];
        },
        
        get_nb_users : function() {
            this.$logDebug( 'get_nb_users>' );
            var users = this.get_users();
            return users.length;
        },
        
        create_user : function( number ) {
            this.$logDebug( 'create_user>' );
            return {
                number: number,
                name: 'User ' + number,
                active: true,
                deleted: false,
                score: 0
            };
        },
        
        add_user : function() {
            this.$logDebug( 'add_user>' );
            var users = this.get_users(),
                number = users.length + 1,
                user = this.create_user( number );
            
            this.$json.add( users, user );
        },
        
        activate_user : function( user ) {
            this.$logDebug( 'activate_user>' );
            user && this.$json.setValue( user, 'active', true );
        },
        
        deactivate_user : function( user ) {
            this.$logDebug( 'deactivate_user>' );
            user && this.$json.setValue( user, 'active', false );
        },
        
        remove_user : function( user ) {
            this.$logDebug( 'remove_user>' );
            user && this.$json.setValue( user, 'deleted', true );
        },

        // //////////////////////////////////////////////////
        // themes

        has_themes : function() {
            this.$logDebug( 'has_themes>' );
            var data = this.getData();
            return data.themes !== undefined;
        },
        
        get_themes : function() {
            this.$logDebug( 'get_themes>' );
            var data = this.getData();
            return data.themes || [];
        },
        
        get_theme : function( id ) {
            this.$logDebug( 'get_theme> ' + id );
            var themes = this.get_themes();
            for ( var i = 0 ; i < themes.length; i++ ) {
                var theme = themes[i];
                if ( theme.id == id ) {
                    return theme;
                }    
            }
            return undefined;
        },
        
        load_themes : function() {
            this.$logDebug( 'load_themes>' );
            // if ( !this.has_themes() ) {
                this.$json.setValue( this.getData(), 'themes', undefined );
                var service = new amnezic.local.service.JsonLoader(),
                    json_file = this.AMNEZIC_ROOT + 'amnezic/local/json/themes.json',
                    callback = {
                        fn: this.themes_loaded,
                        scope: this
                    };
                
                service.load_json( json_file, callback );
            // }
        },
        
        themes_loaded : function( json ) {
            this.$logDebug( 'themes_loaded>' );
            json.themes && this.$json.setValue( this.getData(), 'themes', json.themes );
        },
        
        load_theme : function( id ) {
            this.$logDebug( 'load_theme> ' + id );
            this.$json.setValue( this.getData(), 'theme', undefined );
            var theme = this.get_theme( id ),
                service = new amnezic.local.service.JsonLoader(),
                json_file = theme ? this.AMNEZIC_ROOT + 'amnezic/local/json/' + theme.json : undefined,
                callback = {
                    fn: this.theme_loaded,
                    scope: this
                };
            
            if ( json_file ) {
                service.load_json( json_file, callback );
            }
        },
        
        theme_loaded : function( json ) {
            this.$logDebug( 'theme_loaded>' );
            console.log( json );
            json && this.$json.setValue( this.getData(), 'theme', json );
        },
        
        activate_theme : function( theme ) {
            this.$logDebug( 'activate_theme>' );
            theme && this.$json.setValue( theme, 'active', true );
        },
        
        deactivate_theme : function( theme ) {
            this.$logDebug( 'deactivate_theme>' );
            theme && this.$json.setValue( theme, 'active', false );
        },

        // //////////////////////////////////////////////////
        // search

        search : function() {
            this.$logDebug( 'search>' );
            var service = new amnezic.deezer.service.Search(),
                data = this.getData(),
                request = data && data.search ? data.search.request : undefined,
                callback = {
                    fn: this.found,
                    scope: this
                };
                
            console.log( request );
            
            service.search( request, callback );
        },
        
        found : function( json ) {
            this.$logDebug( 'found>' );
            console.log( json );
            json && this.$json.setValue( this.getData(), 'theme', json );
        },

        // //////////////////////////////////////////////////
        // load

        load_game : function() {
            this.$logDebug("[load_game] Start...");
            var service = new amnezic.local.service.JsonLoader();
            service.load_json( this.AMNEZIC_ROOT + 'amnezic/local/json/game.json', { fn: this.game_loaded, scope: this } );
        },
        
        game_loaded : function( game ) {
            this.$logDebug("[game_loaded] Start...");
            this.$raiseEvent( { name: 'game_loaded', game: game } );
        }
        
    }
    
});
