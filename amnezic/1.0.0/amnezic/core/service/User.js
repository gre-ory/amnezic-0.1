Aria.classDefinition({
	$classpath : 'amnezic.core.service.User',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'aria.utils.Json'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$JsObject.constructor.call(this);
        // this.$logDebug( 'constructor>' );
        this.controller = controller;
    },
    
	$prototype : {

        // //////////////////////////////////////////////////
        // set_all
                
        set_all : function( users ) {
            this.$logDebug( 'set_all>' );
            !users && ( users = [] );
            var data = this.controller.getData();
            aria.utils.Json.setValue( data, 'users', users );
            return users;
        },

        // //////////////////////////////////////////////////
        // get_all
                
        get_all : function() {
            this.$logDebug( 'get_all>' );
            var data = this.controller.getData();
            return data.users ? data.users : this.set_all( undefined );
        },
        
        // //////////////////////////////////////////////////
        // set
                
        set : function( user ) {
            this.$logDebug( 'set>' );
            var data = this.controller.getData();
            aria.utils.Json.setValue( data, 'user', user );
            return user;
        },
        
        // //////////////////////////////////////////////////
        // get
                
        get : function( index ) {
            this.$logDebug( 'get>' );
            var users = this.get_all();
            if ( users.length == 0 ) {
                return undefined;
            }
            if ( index < 0 ) {
                return 0 <= users.length + index ? users[ users.length + index ] : undefined;
            }
            return index < users.length ? users[ index ] : undefined;
        },
        
        // //////////////////////////////////////////////////
        // create
        
        create : function() {
            this.$logDebug( 'create>' );
            var users = this.get_all(),
                number = users.length + 1;
            return {
                number: number,
                name: 'User ' + number,
                active: true,
                deleted: false,
                score: 0
            };
        },
        
        // //////////////////////////////////////////////////
        // add
        
        add : function( user ) {
            this.$logDebug( 'add>' );
            var users = this.get_all();
            users && user && aria.utils.Json.add( users, user );
        },
        
        // //////////////////////////////////////////////////
        // activate
        
        activate : function( user ) {
            this.$logDebug( 'activate>' );
            user && aria.utils.Json.setValue( user, 'active', true );
        },
        
        // //////////////////////////////////////////////////
        // deactivate
        
        deactivate : function( user ) {
            this.$logDebug( 'deactivate>' );
            user && aria.utils.Json.setValue( user, 'active', false );
        },
        
        // //////////////////////////////////////////////////
        // remove
        
        remove : function( user ) {
            this.$logDebug( 'remove>' );
            user && aria.utils.Json.setValue( user, 'deleted', true );
        }
        
	}
	
});
