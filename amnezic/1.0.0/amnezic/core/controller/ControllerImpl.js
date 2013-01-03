Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 'amnezic.core.Hash', 'amnezic.mock.service.GameLoader' ],
    
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
        // on_new_hash
        
        on_new_hash : function( event ) {
            // this.$logDebug( 'on_new_hash>' );
            var hash = event ? event.hash : undefined;
            this.load_section( hash );
        },
        
        // //////////////////////////////////////////////////
        // init_section
        
        init_section : function() {
            this.$logDebug( 'init_section>' );

            // hash
            amnezic.core.Hash.default_hash = this.START_HASH;
            amnezic.core.Hash.$on( {
                'new_hash': this.on_new_hash,
                scope: this
            } );
            amnezic.core.Hash.trigger();
            
        },
        
        // //////////////////////////////////////////////////
        // load_section
        
        load_section : function( hash ) {
            this.$logDebug( 'load_section> ' + hash );
            hash = hash || this.START_HASH;
            
            var path = hash ? hash.split('-') : [],
                section = path.length > 0 ? path[0] : undefined,
                args = path.slice(1),
                view = 'amnezic.core.view.' + section.charAt(0).toUpperCase() + section.slice(1),
                div = 'section',
                controller = 'amnezic.core.controller.ControllerImpl',
                template = { 
					classpath: view,
					div: div,
					moduleCtrl: { 
						classpath : controller
					},
					data : {
						args : args
					}
				};
                    
            console.log( template );
            Aria.loadTemplate( template );
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
