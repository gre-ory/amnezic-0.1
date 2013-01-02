// //////////////////////////////////////////////////
// singleton amnezic.core.Hash

// REMARK : use history browser implementation 
// TODO : integrate History.js or aria.utils.History

Aria.classDefinition({
    $classpath : "amnezic.core.Hash",
    $singleton : true,
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function () {
        // this.$logDebug( 'constructor>' );
        this.default_hash = undefined;
        this.bind();
    },
    
    // //////////////////////////////////////////////////
    // event
    
    $events : {
        'new_hash' : {
            description : 'new hash event',
            properties : {
                hash : 'new hash'
            }
        }
    },
    
    // //////////////////////////////////////////////////
    // prototype
    
    $prototype : {

        // //////////////////////////////////////////////////
        // bind

        bind : function() {
            // this.$logDebug( 'bind>' );
            
            // bind trigger to window event
            window.onpopstate = function( event ) {
                event.preventDefault();
                var hash = event.state ? event.state.hash : undefined;
                this.trigger( hash );
            }.bind( this );
                        
        },
        
        // //////////////////////////////////////////////////
        // normalize

        normalize : function( hash ) {
            // this.$logDebug( 'normalize> ' + hash );
            var length = hash ? hash.length : 0;
            
            return length > 1 && hash.charAt(0) == '#' ?  hash.slice(1) : length > 0 ? hash : null;
        },
        
        // //////////////////////////////////////////////////
        // current

        current : function() {
            // this.$logDebug( 'current>' );
            
            return this.normalize( document.location.hash || this.default_hash );
        },

        // //////////////////////////////////////////////////
        // last
        
        last : function() {
            // this.$logDebug( 'last>' );
            
            return history.state ? history.state.hash : undefined;
        },

        // //////////////////////////////////////////////////
        // push

        push : function( hash ) {
            this.$logDebug( 'push> ' + hash );
            
            var state = { hash: hash },
                title = hash ? 'Hash ' + hash : 'Home',
                url = ( document.location.pathname || '/' ) + ( hash ? '#' +  hash : '' );
            
            // history.pushState( state, title, url );
            history.replaceState( state, title, url );
        },

        // //////////////////////////////////////////////////
        // raise
                 
        raise : function( hash ) {
            // this.$logDebug( 'raise> ' + hash );
            
            this.$raiseEvent( { name : "new_hash", hash: hash } );
        },

        // //////////////////////////////////////////////////
        // trigger
        
        trigger : function( hash ) {
            // this.$logDebug( 'trigger> ' + hash );
            
            var current_hash = hash || this.current(),
                last_hash = this.last();
            
            // push current state
            if ( current_hash != last_hash ) {
                this.push( current_hash );
            }
            
            // raise event
            this.raise( current_hash );
        }
        
    }
});
