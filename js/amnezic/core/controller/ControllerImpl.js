Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.HashManager',
        'aria.storage.SessionStorage',
        'amnezic.core.controller.Flow',
        'amnezic.core.service.JsonFileLoader',
        'amnezic.core.service.Question',
        'amnezic.core.service.Storage',
        'amnezic.core.service.Message',        
        'amnezic.core.service.Theme',
        'amnezic.core.service.User',
        'amnezic.deezer.service.Search'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( config ) {
        this._enableMethodEvents = true;
        this.$ModuleCtrl.constructor.call(this);
        this.$logDebug( 'constructor>' );
        
        var data = this.getData();
        
        // config
        // this.config = config || {
        this.config = {
            root: '',
            lite_url: 'http://lite.amnezic.com/lite.py',
            lite_db: 'amnezic'
        };
        
        // service
        this.service = {
            storage: new amnezic.core.service.Storage( this ),
            message: new amnezic.core.service.Message( this ),
            theme: new amnezic.core.service.Theme( this ),
            user: new amnezic.core.service.User( this ),
            question: new amnezic.core.service.Question( this ),
            search: new amnezic.deezer.service.Search( this )
        };
        
        // admin mode
        var admin = aria.utils.QueryString.getKeyValue('admin');
        this.json.setValue( data, 'admin', typeof(admin) === 'string' );
        
        // bind
        this.bind();
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
        // bind
        
        bind : function() {
            // this.$logDebug( 'bind>' );
            aria.utils.HashManager.addCallback( {
                fn : this.on_new_section,
                scope : this
            } );
        },

        // //////////////////////////////////////////////////
        // section
        
        // TODO: check consistency between data and hash ( #setting when data non initialized )

        on_new_section : function() {
            this.$logDebug( 'on_new_section>' );
            var hash = aria.utils.HashManager.getHashString();
            this.load_section( hash );
        },
        
        load_current_section : function() {
            this.$logDebug( 'load_current_section>' );
            this.on_new_section();
        },
        
        load_section : function( hash ) {
            this.$logDebug( 'load_section> ' + hash );
            
            var section = amnezic.core.controller.Flow.get_section( hash ),
                div = 'section',
                data = this.getData();
            
            this.json.setValue( data, 'section', section );
              
            Aria.loadTemplate( { 
				classpath: section.view,
				div: div,
				moduleCtrl: this,
				data : data
			} );
        },

        // //////////////////////////////////////////////////
        // service

        get_service : function() {
            return this.service;
        },

        // //////////////////////////////////////////////////
        // service.storage
        
        storage_clear : function() {
            this.service.storage.clear();
        },

        // //////////////////////////////////////////////////
        // service.user
        
        user_add : function() {
            this.service.user.add( this.service.user.create() );
        },
        
        user_activate : function( user ) {
            this.service.user.activate( user );
        },
        
        user_deactivate : function( user ) {
            this.service.user.deactivate( user );
        },
        
        user_remove : function( user ) {
            this.service.user.remove( user );
        },

        // //////////////////////////////////////////////////
        // service.question
        
        question_prepare_all : function( themes, settings, callback ) {
            this.service.question.prepare_all( themes, settings, callback );
        },

        // //////////////////////////////////////////////////
        // service.search
        
        search : function( request, callback ) {
            this.service.search.search( request, callback );
        }
        
    }
    
});
