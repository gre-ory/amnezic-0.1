Aria.classDefinition({
    $classpath : 'amnezic.html.Input',
    $extends : 'amnezic.html.Element',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( cfg, context, lineNumber ) {
        this.$Element.constructor.call( this, cfg, context, lineNumber );
        this.tag = 'input';
         if ( !this.attributes.type ) {
            this.attributes.type = 'text';
        }
    }
    
});
