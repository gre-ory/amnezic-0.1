Aria.classDefinition({
    $classpath : 'amnezic.html.Element',
    $extends : 'aria.widgetLibs.BindableWidget',
    $dependencies : [
        'aria.core.JsonValidator',
        'aria.utils.Html', 
        'aria.utils.Json',
        'aria.utils.Delegate',
        'aria.templates.DomEventWrapper',
        'aria.utils.Dom',
        'aria.utils.String'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( cfg, context, lineNumber ) {
        this.$BindableWidget.constructor.apply( this, arguments );
        this.id = this._createDynamicId();
        this.element = undefined;
        this.delegate_id = undefined;
        this._registerBindings();
        this.normalize_callbacks();
    },
    
    // //////////////////////////////////////////////////
    // destructor
    
    $destructor : function () {
        if ( this.delegate_id ) {
            aria.utils.delegate_id.remove( this.delegate_id );
            this.delegate_id = undefined;
        }
        this.$BindableWidget.$destructor.call(this);
        this.element = undefined;
    },
    
    $prototype : {

        // //////////////////////////////////////////////////
        // normalize_callbacks
        
        normalize_callbacks : function () {
            this.$logDebug( 'normalize_callbacks>' );
            
            var cfg = this._cfg,
                eventListeners = cfg.on,
                hasListeners = false;

            for ( var listener in eventListeners ) {
                if ( eventListeners.hasOwnProperty(listener) ) {
                    hasListeners = true;
                    eventListeners[listener] = this.$normCallback.call( this._context, eventListeners[listener] );
                }
            }

            if ( hasListeners ) {
                this.delegate_id = aria.utils.Delegate.add( {
                    fn : this.delegate,
                    scope : this
                } );
            }
        },
        
        delegate : function ( event ) {
            this.$logDebug( 'delegate>' );
            
            var cfg = this._cfg,
                type = event.type,
                callback = cfg.on[type];

            if ( callback ) {
                var wrapped = new aria.templates.DomEventWrapper( event );
                var returnValue = callback.fn.call( callback.scope, wrapped, callback.args );
                wrapped.$dispose();
                return returnValue;
            }
        },
        
        // //////////////////////////////////////////////////
        // notify
        
        _notifyDataChange : function ( args, propertyName ) {
            this.$logDebug( '_notifyDataChange>' );
            
            var cfg = this._cfg,
                old_value = args.oldValue,
                new_value = this._transform( cfg.bind[propertyName].transform, args.newValue, "toWidget" );
                
            this.on_bind( propertyName, new_value, old_value );
        },
        
        on_bind : Aria.empty,

        // //////////////////////////////////////////////////
        // init

        initWidget : function () {
            this.element = aria.utils.Dom.getElementById( this.id );
        },

        // //////////////////////////////////////////////////
        // markup
        
        writeMarkup : function ( out ) {
            this.$logDebug( 'writeMarkup>' );
            var markup = this.get_open_markup();
            markup.push( '/>' );
            out.write( markup.join( '' ) );
        },

        writeMarkupBegin : function ( out ) {
            this.$logDebug( 'writeMarkupBegin>' );
            var markup = this.get_open_markup();
            markup.push( '>' );
            out.write( markup.join( '' ) );
        },

        writeMarkupEnd : function ( out ) {
            this.$logDebug( 'writeMarkupEnd>' );
            var cfg = this._cfg,
                tag_name = cfg.tagName,
                markup = [ '</', tag_name, '>' ];
            out.write( markup.join( '' ) );
        },

        get_open_markup : function () {
            this.$logDebug( 'get_open_markup>' );
            var cfg = this._cfg,
                tag_name = cfg.tagName,
                attributes = cfg.attributes,
                markup = [ '<', tag_name, ' id="', this.id, '"' ];
            
            // attributes
            if ( attributes ) {
                for ( var key in attributes ) {
                    if ( attributes.hasOwnProperty(key) ) {
                        var value = attributes[key],
                            attribute_name = key,
                            attribute_value = undefined;

                        if ( key.substr( key.length-5, key.length ) == '_list' ) {
                            attribute_name = key.substr( 0, key.length-5 );
                            attribute_value = aria.utils.String.encodeForQuotedHTMLAttribute( value.join( ' ' ) );
                            console.log( attribute_name );
                        } else {
                            attribute_value = aria.utils.String.encodeForQuotedHTMLAttribute( value );
                        }
                        
                        markup.push( ' ', attribute_name, '="', attribute_value, '"' );
                    }
                }
            }
            
            // delegate
            if ( this.delegate_id ) {
                markup.push( aria.utils.Delegate.getMarkup( this.delegate_id ), ' ' );
            }
            
            return markup;
        }
        
    }
    
});
