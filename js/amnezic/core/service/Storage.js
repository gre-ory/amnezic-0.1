Aria.classDefinition({
	$classpath : 'amnezic.core.service.Storage',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'aria.storage.SessionStorage',
        'aria.utils.Json'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller, namespace, key ) {
        this.$JsObject.constructor.call(this);
        // this.$logDebug( 'constructor>' );
        this.controller = controller;
        this.namespace = namespace || 'amnezic';
        this.key = key || 'data';
        this.storage = new aria.storage.SessionStorage( {
            namespace: this.namespace
        } );
        this.synchronize();
        this.bind();
    },
    
	$prototype : {
        
        // //////////////////////////////////////////////////
        // bind

        bind : function() {
            // this.$logDebug( 'bind>' );
            var data = this.controller.getData();
            aria.utils.Json.addListener( data, undefined, {
                fn: this.store,
                scope: this
            }, false, true );
        },
        
        // //////////////////////////////////////////////////
        // synchronize

        synchronize : function() {
            // this.$logDebug( 'synchronize>' );
            var data = this.storage.getItem( this.key );
            this.controller.setData( data );
            this.log_data( 'synchronize' );
        },

		// //////////////////////////////////////////////////
        // store
        
        store : function() {
            // this.$logDebug( 'store>' );
            var data = this.controller.getData();
            this.storage.setItem( this.key, data );
            this.log_data( 'store' );
        },

		// //////////////////////////////////////////////////
        // clear
        
        clear : function() {
            // this.$logDebug( 'clear>' );
            this.storage.removeItem( this.key );
            var data = this.controller.getData();
            data && this.$logDebug( 'clear>' + data.nb + ', ' + typeof(data.nb) );
            for ( var name in data ) {
                aria.utils.Json.deleteKey( data, name );
            }
            this.synchronize();
            // this.log_data( 'clear' );
        },

		// //////////////////////////////////////////////////
        // log_data
        
        log_data : function( step ) {
            var data = this.controller.getData(),
                out = '';
            out += ( step ? step + '> ' : '' );
            // out += this.namespace + '.' + this.key + ': ';
            if ( data ) {
                // out += '{ ';
                out += 'users' + ( data.users ? '[' + data.users.length + ']' : '' );
                out += ', themes' + ( data.themes ? '[' + data.themes.length + ']' : '' );
                out += ', theme' + ( data.theme ? '-' + data.theme.id : '' );
                out += ', section' + ( data.section ? '-' + data.section.id : '' );
                out += ', nb' + ( data.nb ? '-' + data.nb : '' );
                // out += ' }';
            }
            // this.$logInfo( out );
        }
        
	}
	
});
