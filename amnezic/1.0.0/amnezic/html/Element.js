Aria.classDefinition({
    $classpath : 'amnezic.html.Element',
    $extends : 'aria.widgetLibs.BaseWidget',
    $dependencies : [
        'aria.utils.Html', 
        'aria.utils.Json',
        'aria.utils.Delegate',
        'aria.templates.DomEventWrapper',
        'aria.utils.Dom',
        'aria.utils.String',
        'aria.utils.Type'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( cfg, context, lineNumber ) {
        this.$BaseWidget.constructor.call( this, cfg, context, lineNumber );
        // this.$logDebug( 'constructor>' );
        
        // set
        this.tag = 'span';
        this.attributes = {};
        this.bindings = {};
        this.delegate_id = undefined;
        this.listeners = {};
        this.element = undefined;
        
        // extract
        if ( this._cfg ) {
            for ( var name in this._cfg ) {
                if ( !name || !this._cfg.hasOwnProperty( name ) ) {
                    continue;
                }
                var value = this._cfg[ name ];
                if ( !value ) {
                    continue;
                }
                // this.$logDebug( 'constructor> ' + name + ' ' + typeof( value ) );
                if ( name === 'tag' ) {
                    this.tag = value;
                } else if ( name === 'bind' ) {
                    this.bindings = value;
                } else if ( name === 'on' ) {
                    this.listeners = value;
                } else {
                    this.attributes[ name ] = value;
                }
            }
        }
        
        // init
        if ( !this.attributes.id ) {
            this.attributes.id = this._createDynamicId();
        }
        this.normalize_listeners();
        this.register_listeners();
        
    },
    
    // //////////////////////////////////////////////////
    // destructor
    
    $destructor : function () {
        this.$logDebug( 'destructor>' );
        
        this.unregister_bindings();
        
        this.unregister_listeners();
        this.delegate_id = undefined;
        
        this.element = undefined;
        
        this.$BaseWidget.$destructor.call(this);
    },
    
    $prototype : {

        // //////////////////////////////////////////////////
        // init

        initWidget : function () {
            // this.$logDebug( 'initWidget>' );
            this.element = aria.utils.Dom.getElementById( this.attributes.id );
            this.register_bindings();
            this.synchronize_from_data();
        },
        
        // //////////////////////////////////////////////////
        // data property

        get_data_property : function ( name ) {
            // this.$logDebug( 'get_data_property>' );
            
            var binding = this.bindings[ name ];
            if ( !binding || !binding.inside || !binding.to ) {
                return;
            }
            
            return binding.inside[ binding.to ];
        },
        
        set_data_property : function ( name, new_value, override ) {
            // this.$logDebug( 'set_data_property>' );
            
            if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                return;
            }
            
            var binding = this.bindings[ name ],
                old_value = binding.inside[ binding.to ];
            
            if ( ( old_value !== new_value ) || ( override === true ) ) {
                this.$logDebug( 'set_data_property> data.' + binding.to + ' <<< ' + new_value + ', ' + typeof(new_value) );
                aria.utils.Json.setValue( binding.inside, binding.to, new_value );
            } else {
                // this.$logDebug( 'set_data_property> data.' + binding.to + ' === ' + new_value );
            }
        },
        
        set_data_property_from_widget : function ( name ) {
            // this.$logDebug( 'set_data_property_from_widget>' );
            
            if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                return;
            }
            
            var binding = this.bindings[ name ],
                widget_value = this.get_widget_property( name ),
                transform = binding ? binding.transform : undefined,
                data_value = this.transform_value( transform, widget_value, 'from_widget' );
            
            this.set_data_property( name, data_value );
        },
        
        synchronize_from_widget : function () {
            // this.$logDebug( 'synchronize_from_widget>' );
            
            for ( var name in this.bindings ) {
                this.set_data_property_from_widget( name );
            }
        },

        // //////////////////////////////////////////////////
        // transform
        
        transform_value : function ( transform, value, direction ) {
            // this.$logDebug( 'transform_value>' );
            var new_value = value;
            if ( transform ) {
                var created = false;
                if ( aria.utils.Type.isString( transform ) && transform.indexOf('.') != -1 ) {
                    transform = Aria.getClassInstance( transform );
                    created = true;
                }
                if ( transform[ direction ] ) {
                    new_value = this._context.evalCallback( transform[ direction ], new_value );
                } else if ( aria.utils.Type.isFunction( transform ) ) {
                    new_value = this._context.evalCallback( transform, new_value );
                }
                if ( created ) {
                    transform.$dispose();
                }
            }
            return new_value;
        },
        
        // //////////////////////////////////////////////////
        // widget property

        get_widget_property : function ( name ) {
            // this.$logDebug( 'get_widget_property>' );
            if ( !this.element ) {
                return;
            }
            return this.element[ name ];
        },
        
        set_widget_property : function ( name, new_value, override ) {
            // this.$logDebug( 'set_widget_property>' );
            
            if ( !this.element ) {
                return;
            }
            
            var old_value = this.element.getAttribute( name );
            
            if ( ( old_value !== new_value ) || ( override === true ) ) {
                this.$logDebug( 'set_widget_property> widget.' + name + ' <<< ' + new_value + ', ' + typeof(new_value) );
                // this.element.setAttribute( name, new_value );
                this.element[ name ] = new_value ;
            } else {
                // this.$logDebug( 'set_widget_property> widget.' + name + ' = ' + new_value );
            }
        },
        
        set_widget_property_from_data : function ( name ) {
            // this.$logDebug( 'set_widget_property_from_data>' );
            
            if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                return;
            }
            
            var binding = this.bindings[ name ],
                data_value = binding.inside[ binding.to ],
                transform = binding ? binding.transform : undefined,
                widget_value = this.transform_value( transform, data_value, 'to_widget' );
                
            this.set_widget_property( name, widget_value );
        },
        
        synchronize_from_data : function () {
           // this.$logDebug( 'synchronize_from_data>' );
            
            for ( var name in this.bindings ) {
                this.set_widget_property_from_data( name );
            }
        },

        // //////////////////////////////////////////////////
        // bindings

        register_bindings : function () {
            // this.$logDebug( 'register_bindings>' );
            
            for ( var name in this.bindings ) {
                if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                    continue;
                }
                
                var binding = this.bindings[ name ];
                
                if ( !binding ) {
                    continue;
                }
                    
                // register
                binding.callback = {
                    fn : this.notify_data_change,
                    scope : this,
                    args : name
                };
                // aria.utils.Json.addListener( binding.inside, binding.to, binding.callback, true );
                
                // this.$logDebug( 'register_bindings> data.' + binding.to + ' > notify_data_change'  );
                aria.utils.Json.addListener( binding.inside, binding.to, binding.callback, false, true );
            }
        },
        
        unregister_bindings : function () {
            // this.$logDebug( 'unregister_bindings>' );
            
            for ( var name in this.bindings ) {
                if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                    continue;
                }
                
                var binding = this.bindings[ name ];
                
                if ( binding && binding.callback ) {
                    aria.utils.Json.removeListener( binding.inside, binding.to, binding.callback );
                }
            }
        },
        
        notify_data_change : function ( args, name ) {
            // this.$logDebug( 'notify_data_change>' );
            this.set_widget_property_from_data( name, args.newValue );
        },
        
        // //////////////////////////////////////////////////
        // listeners
        
        normalize_listeners : function () {
            // this.$logDebug( 'normalize_listeners>' );

            for ( var type in this.listeners ) {
                if ( !this.listeners.hasOwnProperty( type ) ) {
                    continue;
                }
                this.listeners[ type ] = this.$normCallback.call( this._context, this.listeners[ type ] );
            }
        },
        
        register_listeners : function () {
            // this.$logDebug( 'register_listeners>' );
            
            this.delegate_id = aria.utils.Delegate.add( {
                fn : this.delegate_event,
                scope : this
            } );
            
            // this.$logDebug( 'register_listeners> ' + this.delegate_id );
        },
        
        unregister_listeners : function () {
            // this.$logDebug( 'unregister_listeners>' );

            if ( this.delegate_id ) {
                aria.utils.Delegate.remove( this.delegate_id ); 
            }
        },
        
        delegate_event : function ( event ) {
            // this.$logDebug( 'delegate_event>' );
            
            {
                var callback = this[ 'on_' + event.type ];
                if ( callback ) {
                    if ( callback.call( this, event ) === false ) {
                        return false;
                    }
                }
            }
            
            {
                var callback = this.listeners.hasOwnProperty( event.type ) ? this.listeners[ event.type ] : undefined;
                if ( callback ) {
                    var wrapped = new aria.templates.DomEventWrapper( event );
                    if ( callback.fn.call( callback.scope, wrapped, callback.args ) === false ) {
                        wrapped.$dispose();
                        return false;
                    }
                    wrapped.$dispose();
                }
            }
            
            return true;
        },
        
        on_change : function ( event ) {
            this.$logDebug( 'on_change>' );
            this.synchronize_from_widget();
        },
        
        on_keyup : function ( event ) {
            this.$logDebug( 'on_keyup>' );
            this.synchronize_from_widget();
        },
        
        on_blur : function ( event ) {
            this.$logDebug( 'on_blur>' );
            this.synchronize_from_widget();
        },

        // //////////////////////////////////////////////////
        // markup
        
        writeMarkup : function ( out ) {
            // this.$logDebug( 'writeMarkup>' );
            var html = [];
            html = this.push_tag( html );            
            out.write( html.join( '' ) );
        },

        writeMarkupBegin : function ( out ) {
            // this.$logDebug( 'writeMarkupBegin>' );
            var html = [];
            html = this.push_opening_tag( html );            
            out.write( html.join( '' ) );
        },

        writeMarkupEnd : function ( out ) {
            // this.$logDebug( 'writeMarkupBegin>' );
            var html = [];
            html = this.push_closing_tag( html );            
            out.write( html.join( '' ) );
        },

        push_tag : function ( html ) {
            // this.$logDebug( 'push_tag>' );
            html.push( '<', this.tag );
            html = this.push_attributes( html );
            html.push( '/> ');
            return html;
        },

        push_opening_tag : function ( html ) {
            // this.$logDebug( 'push_opening_tag>' );
            html.push( '<', this.tag );
            html = this.push_attributes( html );
            html.push( '> ');
            return html;
        },

        push_closing_tag : function ( html ) {
            // this.$logDebug( 'push_closing_tag>' );
            html.push( '</', this.tag, '>' );
            return html;
        },

        push_attributes : function ( html ) {
            // this.$logDebug( 'get_attributes>' );
            if ( this.attributes ) {
                for ( var name in this.attributes ) {
                    if ( !this.attributes.hasOwnProperty( name ) ) {
                        continue;
                    }
                    
                    var value = this.attributes[ name ];
                    if ( aria.utils.Type.isArray( value ) ) {
                        value = aria.utils.String.encodeForQuotedHTMLAttribute( value.join( ' ' ) );
                    } else {
                        value = aria.utils.String.encodeForQuotedHTMLAttribute( value );
                    }
                    html.push( ' ', name, '="', value, '"' );
                }
            }
            if ( this.delegate_id ) {
                html.push( ' ', aria.utils.Delegate.getMarkup( this.delegate_id ) );
            }
            
            return html;
        }
        
    }
    
});
