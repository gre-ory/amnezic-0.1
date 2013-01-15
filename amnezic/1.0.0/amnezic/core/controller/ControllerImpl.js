Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.Json',
        'aria.utils.HashManager',
        'aria.storage.SessionStorage',
        'amnezic.core.controller.Flow',
        'amnezic.core.service.JsonFileLoader',
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
        
        load_themes : function( callback ) {
            this.$logDebug( 'load_themes>' );
            
            var service = new amnezic.core.service.JsonFileLoader(),
                json_file = this.AMNEZIC_ROOT + 'json/themes.json',
                adapter = function( json ) {
                    return json.themes || [];
                };
            
            service.load_json_file( json_file, adapter, callback );
        },
        
        load_theme : function( id, callback ) {
            this.$logDebug( 'load_theme>' );
            
            var service = new amnezic.core.service.JsonFileLoader(),
                default_theme = {
                    title: undefined,
                    active: false,
                    questions: []
                },
                theme = id && id != '' ? this.get_theme( id ) : undefined,
                json_file = theme ? this.AMNEZIC_ROOT + 'json/' + theme.json : undefined,
                adapter = function( json ) {
                    return json || default_theme;
                };
            
            if ( json_file ) {
                service.load_json_file( json_file, adapter, callback );
            } else {
                this.$callback( callback, default_theme );
            }
        },
        
        activate_theme : function( theme ) {
            this.$logDebug( 'activate_theme>' );
            theme && this.$json.setValue( theme, 'active', true );
        },
        
        deactivate_theme : function( theme ) {
            this.$logDebug( 'deactivate_theme>' );
            theme && this.$json.setValue( theme, 'active', false );
        },
        
        add_to_theme : function( question, theme ) {
            this.$logDebug( 'add_to_theme>' );
            question && theme && this.$json.add( theme.questions, question );
        },

        // //////////////////////////////////////////////////
        // search

        search : function( request, callback ) {
            this.$logDebug( 'search>' );
            var service = new amnezic.deezer.service.Search();
                
            console.log( request );
            
            service.search( request, callback );
        },
        
        found_bad : function( json ) {
            this.$logDebug( 'found>' );
            console.log( json );
            var data = this.getData(),
                search = data.search;
            json && this.$json.setValue( search, 'response', json );
        }
        
    }
    
});
