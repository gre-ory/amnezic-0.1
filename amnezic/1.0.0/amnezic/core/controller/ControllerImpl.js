Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.Json',
        'amnezic.core.Hash',
        'amnezic.mock.service.GameLoader'
    ],
    
    // //////////////////////////////////////////////////
    // static
    
    $statics : {
        START_HASH : 'start',
        SETTING_HASH : 'setting',
        USER_HASH : 'user-{0}',
        THEME_HASH : 'theme-{0}',
        QUESTION_HASH : 'question-{0}',
        SCORE_HASH : 'score',
        END_HASH : 'end'
    },
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function () {
        this.$logDebug( 'constructor>' );
        this._enableMethodEvents = true;
        this.$ModuleCtrl.constructor.call(this);
        this.$json = aria.utils.Json;
        
        // initialize data
        this.setData( {
            menu: undefined,
            users: []
        } );

        // set default hash            
        amnezic.core.Hash.default_hash = this.START_HASH;
        
        // bind to new hash
        amnezic.core.Hash.$on( {
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
            amnezic.core.Hash.trigger();
        },
        
        load_section : function( hash ) {
            this.$logDebug( 'load_section> ' + hash );
            hash = hash || this.START_HASH;
            
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
        // initialize

        initialize : function() {
            this.$logDebug( 'initialize>' );
            this.build_menu();
            this.init_users(); // TODO: init after
        },

        // //////////////////////////////////////////////////
        // menu

        build_menu : function() {
            this.$logDebug( 'build_menu>' );
            
            var menu = { items: [] },
                data = this.getData();
            
            menu.items.push( { title: 'Settings', hash: 'setting' } );
            menu.items.push( { title: 'Users', hash: 'users' } );
            menu.items.push( { title: 'Themes', hash: 'theme' } );
            menu.items.push( { title: 'Question', hash: 'question' } );
            menu.items.push( { title: 'Score', hash: 'score' } );
            menu.items.push( { title: 'End', hash: 'end' } );
            
            this.$json.setValue( data, 'menu', menu );
        },

        // //////////////////////////////////////////////////
        // user
        
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
        
        set_users : function( users ) {
            this.$logDebug( 'set_users>' );
            var data = this.getData(),
                merge = true;
            
        },
        
        create_default_user : function( number ) {
            this.$logDebug( 'create_default_user>' );
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
                user = this.create_default_user( number );
            
            this.$json.add( users, user );
        },
        
        init_users : function() {
            this.$logDebug( 'init_users>' );
            var count = 0;
            
            while ( this.get_nb_users() < 0 && count < 100 ) {
                this.add_user();
                count++;
            }
        },
        
        activate_user : function( user ) {
            this.$logDebug( 'activate_user>' );
            
            this.$json.setValue( user, 'active', true );
        },
        
        deactivate_user : function( user ) {
            this.$logDebug( 'deactivate_user>' );
            
            this.$json.setValue( user, 'active', false );
        },
        
        remove_user : function( user ) {
            this.$logDebug( 'remove_user>' );
            
            this.$json.setValue( user, 'deleted', true );
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
