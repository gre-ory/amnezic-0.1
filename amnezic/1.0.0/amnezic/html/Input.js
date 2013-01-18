Aria.classDefinition({
    $classpath : 'amnezic.html.Input',
    $extends : 'amnezic.html.Element',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( cfg, context, lineNumber ) {
        this.$Element.constructor.call( this, cfg, context, lineNumber );
        this.tag = 'input';
        !this.attributes.type && ( this.attributes.type = 'text' );
    },
    
    // //////////////////////////////////////////////////
    // destructor
    
    $destructor : function () {
        if (this._typeCallback) {
            aria.core.Timer.cancelCallback(this._typeCallback);
        }

        this.$Element.$destructor.call(this);
    },
    
    $prototype : {

        // //////////////////////////////////////////////////
        // init
        
        initWidget : function () {
            this.$Element.initWidget.call(this);
            
            /*
            var bindings = this._cfg.bind;
            if (bindings.value) {
                var newValue = this._transform(bindings.value.transform, bindings.value.inside[bindings.value.to], "toWidget");
                if (newValue != null) {
                    this._domElt.value = newValue;
                }
            }
            */
        },

        // //////////////////////////////////////////////////
        // bind
        
        set_widget_value : function( value ) {
            this.$logDebug( 'set_widget_value>' );
            if ( this.element ) {
                this.element.value = value || '';
            } else {
                this.$logDebug( 'set_widget_value> undefined element' );
            }
        },
        
        on_value_change : function ( new_value, old_value ) {
            this.$logDebug( 'on_value_change>' );
            if ( this.element ) {
                this.element.value = ( new_value || '' );
            } else {
                this.$logDebug( 'on_value_change> undefined element' );
            }
        },
        
        on_keyup : function ( event ) {
            this.$logDebug( 'on_keyup>' );
            this.notify_widget_change( 'value', this.element.value );
        },
        
        on_blur : function ( event ) {
            this.$logDebug( 'on_blur>' );
        }

    }
    
});
