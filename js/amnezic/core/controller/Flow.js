Aria.classDefinition({
    $classpath : 'amnezic.core.controller.Flow',
    $singleton : true,
    $statics : {
        DEFAULT : 'default',
        NOT_FOUND : 'not_found'
    },
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function () {
        this.config = {
            'default' : 'amnezic.core.view.Default',
            'not_found' : 'amnezic.core.view.NotFound',
            
            'users' : 'amnezic.core.view.Users',
            'themes' : 'amnezic.core.view.Themes',
            'theme' : {
                view: 'amnezic.core.view.Theme',
                names: [ 'id' ]
            },
            'settings' : {
                view: 'amnezic.core.view.Settings'
            },
            'start' : 'amnezic.core.view.Start',
            'question' : {
                view: 'amnezic.core.view.Question',
                names: [ 'number' ]
            },
            'score' : 'amnezic.core.view.Score',
            'end' : 'amnezic.core.view.End',
        };
    },
    
    $prototype : {
        
        // //////////////////////////////////////////////////
        // config
        
        get_config : function ( id ) {
            // this.$logDebug( 'get_config>' );
            var config = id in this.config ? this.config[ id ] : undefined;
            
            if ( config && config.view ) {
                if ( !config.names ) {
                    config.names = [];
                }
                return config;
            }
            return config ? {
                view: String(config),
                names: []
            } : undefined;
        },
        
        // //////////////////////////////////////////////////
        // section
        
        build_section : function ( hash, id, values ) {
            // this.$logDebug( 'build_section> ' + hash + ', ' + id + ', ' + values );
            
            var config = this.get_config( id ),
                view = config ? config.view : undefined,
                names = config && config.names ? config.names : [],
                args = {};
                
            for ( var i = 0; i < names.length; i++ ) {
                var name = names[i],
                    value = values.length > i ? values[i] : undefined;
                
                args[name] = value;
            }
            
            return {
                hash: hash,
                id: id,
                args: args,
                view: view
            };
        },
        
        build_default_section : function ( hash ) {
            // this.$logDebug( 'build_default_section> ' + hash );
            return this.build_section( hash, this.DEFAULT, [] );
        },
        
        build_not_found_section : function ( hash ) {
            // this.$logDebug( 'build_not_found_section> ' + hash );
            return this.build_section( hash, this.NOT_FOUND, [] );
        },
        
        get_section : function ( hash ) {
            // this.$logDebug( 'get_section> ' + hash );
            
            var path = hash ? hash.split('-') : [],
                id = path.length > 0 ? path[0] : undefined,
                values = path.length > 1 ? path.slice(1) : [],
                section = this.build_section( hash, id, values );
                
            if ( !section || !section.view ) {
                if ( section.id ) {
                    section = this.build_not_found_section();
                } else {
                    section = this.build_default_section();
                }
            }
            return section;
        }
        
    }
    
});
