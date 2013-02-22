Aria.classDefinition({
	$classpath : 'amnezic.core.service.Message',
    $extends : 'aria.core.JsObject',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$JsObject.constructor.call( this );
        this.controller = controller;
    },
    
	$prototype : {
        
        // //////////////////////////////////////////////////
        // error

        error : function( message ) {
            this.$logError( '[error] ' + message );
        },
        
        // //////////////////////////////////////////////////
        // warning

        warning : function( message ) {
            this.$logWarn( '[warning] ' + message );
        },
        
        // //////////////////////////////////////////////////
        // info

        info : function( message ) {
            this.$logInfo( message );
        }
        
	}
	
});
