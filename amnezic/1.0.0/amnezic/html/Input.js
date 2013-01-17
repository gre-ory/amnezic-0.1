Aria.classDefinition({
    $classpath : 'amnezic.html.Input',
    $extends : 'amnezic.html.Element',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( cfg, context, lineNumber ) {
        
        // sanitize
        cfg.tagName = 'input';
        cfg.attributes = cfg.attributes || {};
        cfg.attributes.type = cfg.attributes.type || 'text';
        cfg.on = cfg.on || {};

        // this._reactOnType = this._registerType(cfg.on, context);
        // this._registerBlur(cfg.on, context);
        
        this.$Element.constructor.call( this, cfg, context, lineNumber );
        
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
        
        on_bind : function ( name, new_value, old_value ) {
            if ( name === 'value' ) {
                this.element.value = new_value;
            }
        },

        _registerType : function (listeners, context) {
            if (listeners.type) {
                if (listeners.keydown) {
                    var normalizedKeydown = this.$normCallback.call(context._tpl, listeners.keydown);
                }

                var normalizedType = this.$normCallback.call(context._tpl, listeners.type);
                listeners.keydown = {
                    fn : keyDownToType,
                    scope : this,
                    args : {
                        type : normalizedType,
                        keydown : normalizedKeydown
                    }
                };

                delete listeners.type;

                return true;
            }

            return false;
        },

        _registerBlur : function (listeners, context) {
            var normalized;

            if (listeners.blur) {
                normalized = this.$normCallback.call(context._tpl, listeners.blur);
            }

            listeners.blur = {
                fn : bidirectionalBlurBinding,
                scope : this,
                args : normalized
            };
        }

    }
    
});
