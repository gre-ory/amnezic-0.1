Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.Json',
        'aria.storage.SessionStorage',
        'amnezic.core.util.Hash',
        'amnezic.mock.service.GameLoader'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function () {
        this.$logDebug( 'constructor>' );
        this._enableMethodEvents = true;
        this.$ModuleCtrl.constructor.call(this);
        this.$json = aria.utils.Json;
        this.storage = new aria.storage.SessionStorage( { namespace: 'amnezic' } );
        
        // handle data
        this.fetch_data();
        this.$json.addListener( this.getData(), null, this.store_data.bind(this), false, true );
        
        // set default hash            
        amnezic.core.util.Hash.default_hash = 'start';
        
        // bind to new hash
        amnezic.core.util.Hash.$on( {
            'new_hash': this.on_new_hash,
            scope: this
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
            this.$logDebug( 'fetch_data>' );
            var default_data = {
                    users: [],
                    themes: [ 
                        { name: 'Rock', active: true, questions: [ 0, 0, 0, 0, 0, 0, 0 ] },
                        { name: 'Jazz', active: true, questions: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ] },
                        { name: 'Pop', active: true, questions: [ 0, 0, 0 ] }
                    ],
                    section: undefined
                },
                stored_data = this.storage.getItem( 'data' ),
                data = stored_data || default_data;
            
            console.log( stored_data );
            console.log( default_data );
            
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
        
        on_new_hash : function( event ) {
            // this.$logDebug( 'on_new_hash>' );
            var hash = event ? event.hash : undefined;
            this.load_section( hash );
        },
        
        // //////////////////////////////////////////////////
        // section
        
        // TODO: check consistency between data and hash ( #setting when data non initialized )
        
        load_current_section : function() {
            this.$logDebug( 'load_current_section>' );
            amnezic.core.util.Hash.trigger();
        },
        
        load_section : function( hash ) {
            this.$logDebug( 'load_section> ' + hash );
            
            var path = hash ? hash.split('-') : [],
                section = path.length > 0 ? path[0] : undefined,
                args = path.slice(1),
                view = 'amnezic.core.view.' + section.charAt(0).toUpperCase() + section.slice(1),
                div = 'section',
                controller = 'amnezic.core.controller.ControllerImpl',
                data = this.getData(),
                template = { 
					classpath: view,
					div: div,
					moduleCtrl: this,
					data : data
				};
            
            // set section
            // aria.utils.Json.setValue( data, 'section', { id: section, hash: hash, args: args } );
            this.$json.setValue( data, 'section', { id: section, hash: hash, args: args } );
              
            console.log( template );
            Aria.loadTemplate( template );
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
        
        get_themes : function() {
            this.$logDebug( 'get_themes>' );
            var data = this.getData();
            return data.themes || [];
        },
        
        get_nb_themes : function() {
            this.$logDebug( 'get_nb_themes>' );
            var themes = this.get_themes();
            return themes.length;
        },
        
        create_theme : function( name, questions ) {
            this.$logDebug( 'create_theme>' );
            return {
                name: name,
                active: true,
                deleted: false,
                questions: questions
            };
        },
        
        add_theme : function( name, questions ) {
            this.$logDebug( 'add_theme>' );
            var themes = this.get_themes(),
                theme = this.create_theme( name, questions );
            
            this.$json.add( themes, theme );
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
        // load

        load_game : function() {
            this.$logDebug("[load_game] Start...");
            var service = new amnezic.mock.service.GameLoader();
            service.load_game( 'amnezic/mock/service/game.json', { fn: this.game_loaded, scope: this } );
        },
        
        game_loaded : function( game ) {
            this.$logDebug("[game_loaded] Start...");
            this.$raiseEvent( { name: 'game_loaded', game: game } );
        }
        
    }
    
});
