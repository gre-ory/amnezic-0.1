Aria.classDefinition({
    $classpath : 'amnezic.core.controller.ControllerImpl',
    $extends : 'aria.templates.ModuleCtrl',
    $implements : [ 'amnezic.core.controller.Controller' ],
    $dependencies: [ 
        'aria.utils.HashManager',
        'aria.storage.SessionStorage',
        'amnezic.core.controller.Flow',
        'amnezic.core.service.JsonFileLoader',
        'amnezic.core.service.Storage',
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
        
        // config
        this.config = config || {
            root: 'amnezic/1.0.0/'
        };
        
        // service
        this.service = {
            storage: new amnezic.core.service.Storage( this ),
            theme: new amnezic.core.service.Theme( this ),
            user: new amnezic.core.service.User( this )
        };
        
        // admin mode
        var data = this.getData(),
            admin = aria.utils.QueryString.getKeyValue('admin');
        this.json.setValue( data, 'admin', typeof admin == 'string' );
        
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
        // service.theme
        
        theme_retrieve_all : function( callback ) {
            this.service.theme.retrieve_all( callback );
        },
        
        theme_retrieve : function( id, callback ) {
            this.service.theme.retrieve( id, callback );
        },
        
        theme_set : function( theme ) {
            this.service.theme.set( theme );
        },
        
        theme_activate : function( theme ) {
            this.service.theme.activate( theme );
        },
        
        theme_deactivate : function( theme ) {
            this.service.theme.deactivate( theme );
        },
        
        theme_add_question : function( theme, question ) {
            this.service.theme.add_question( theme, question );
        },
        
        theme_remove_question_at : function( theme, index ) {
            this.service.theme.remove_question_at( theme, index );
        },

        // //////////////////////////////////////////////////
        // search
        
        search : function( request, callback ) {
            this.$logDebug( 'search>' );
            var service = new amnezic.deezer.service.Search();
                
            console.log( request );
            
            service.search( request, callback );
        }
        
    }
    
});
