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
        this.$logDebug( 'constructor>' );
        
        // extract attributes
        this.attributes = aria.utils.Json.copy( this._cfg || {} );
        !this.attributes.id && ( this.attributes.id = this._createDynamicId() );
        
        // extract tag
        this.tag = this.attributes.tag || 'span';
        aria.utils.Json.deleteKey( this.attributes, 'tag' );
        
        // bindings
        this.bindings = aria.utils.Json.copy( this.attributes.bind || {} );
        aria.utils.Json.deleteKey( this.attributes, 'bind' );
        this.register_bindings();
        
        // listeners
        this.listeners = aria.utils.Json.copy( this.attributes.on || {} );
        aria.utils.Json.deleteKey( this.attributes, 'on' );
        this.delegate_id = undefined;
        this.register_listeners();
        
        // dom
        this.element = undefined;
    },
    
    // //////////////////////////////////////////////////
    // destructor
    
    $destructor : function () {
        this.$logDebug( 'destructor>' );
        
        // bindings
        this.unregister_bindings();

        // listeners
        this.unregister_listeners();
        if ( this.delegate_id ) {
            aria.utils.Delegate.remove( this.delegate_id );
            this.delegate_id = undefined;
        }
        
        // dom
        this.element = undefined;
        
        this.$BaseWidget.$destructor.call(this);
        

        // TODO
        
    },
    
    $prototype : {

        // //////////////////////////////////////////////////
        // bindings
        
        register_bindings : function () {
            this.$logDebug( 'register_bindings>' );
            
            for ( var name in this.bindings ) {
                this.register_binding( name );
            }
        },
        
        register_binding : function ( name ) {
            this.$logDebug( 'register_binding>' );
            
            if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                return;
            }
            var binding = this.bindings[ name ];
            
            if ( binding ) {
                
                // register
                try {
                    binding.callback = {
                        fn : this.notify_data_change,
                        scope : this,
                        args : name
                    };
                    // aria.utils.Json.addListener( binding.inside, binding.to, binding.callback, true );
                    console.log( binding.inside );
                    console.log( binding.to );
                    console.log( binding.callback );
                    aria.utils.Json.addListener( binding.inside, binding.to, binding.callback );
                } catch ( ex ) {
                    this.$logError( 'Error while registering binding for property %1', [ name ] );
                }
                
                // set widget value
                try {
                    var value = binding.inside[ binding.to ],
                        widget_value = this.transform_value( binding.transform, value, 'to_widget' ),
                        setter = this[ 'set_widget_' + name ];
                    if ( setter ) {
                        setter.call( this, widget_value );
                    }
                } catch ( ex ) {
                    this.$logError( 'Error while setting value for property %1', [ name ] );
                }
            }
        },
        
        unregister_bindings : function () {
            this.$logDebug( 'unregister_bindings>' );
            
            for ( var name in this.bindings ) {
                this.unregister_binding( name );
            }
        },
        
        unregister_binding : function ( name ) {
            this.$logDebug( 'unregister_binding>' );
            
            if ( !name || !this.bindings.hasOwnProperty( name ) ) {
                return;
            }
            var binding = this.bindings[ name ];
            
            if ( binding && binding.callback ) {
                aria.utils.Json.removeListener( binding.inside, binding.to, binding.callback );
            }
        },
        
        _notifyDataChange : function ( args, name ) {
            this.$logDebug( '_notifyDataChange>' );
        },
        
        notify_data_change : function ( args, name ) {
            this.$logDebug( 'notify_data_change>' );
            
            var bindings = this.bindings,
                binding = bindings ? bindings [ name ] : undefined,
                old_value = args.oldValue,
                new_value = args.newValue,
                new_widget_value = this.transform_value( binding.transform, new_value, 'to_widget' ),
                callback = this[ 'on_' + ( name || '' ) + '_change' ];

            this.$logDebug( 'notify_data_change> data.' + binding.to + ' = ' + new_value + ' >>> ' + new_widget_value + ' >>> widget.' + name + ' = ???' );
            
            if ( callback ) {
                callback.call( this, new_value, old_value );
            }
        },
        
        notify_widget_change : function ( name, new_widget_value ) {
            this.$logDebug( 'notify_widget_change>' );
            
            var bindings = this.bindings,
                binding = bindings ? bindings [ name ] : undefined,
                old_value = binding.inside[ binding.to ],
                new_value = this.transform_value( binding.transform, new_widget_value, 'from_widget' );
            
            this.$logDebug( 'notify_widget_change> widget.' + name + ' = ' + new_widget_value + ' >>> ' + new_value + ' >>> data.' + binding.to + ' = ' + old_value );
            
            if ( binding ) {
                aria.utils.Json.setValue( binding.inside, binding.to, new_value );
            }
        },
        
        transform_value : function ( transform, value, direction ) {
            this.$logDebug( 'transform_value>' );
            var new_value = value;
            if ( transform ) {
                var created = false;
                if ( aria.utils.Type.isString( transform ) && transform.indexOf('.') != -1 ) {
                    transform = Aria.getClassInstance( transform );
                    created = true;
                }
                if ( transform[ direction ] ) {
                    new_value = this.evalCallback( transform[ direction ], new_value );
                } else if ( aria.utils.Type.isFunction( transform ) ) {
                    new_value = this.evalCallback( transform, new_value );
                }
                if ( created ) {
                    transform.$dispose();
                }
            }
            return new_value;
        },

        // //////////////////////////////////////////////////
        // listeners
        
        /*
        
        delegate_event : function ( event ) {
            var method = this[ 'on_' + event.type ];
            if ( method ) {
                method.call( this, event );
                event.preventDefault();
            }
        },
        
        register_listener : function ( type, global ) {
            this.$logDebug( 'register_listener>' );
            global = ( global === true );
            
            var element = global ? Aria.$window.document.body : this.element;
            
            if ( element && type ) {
            
                var listener = {
                        global: global,
                        element: element,
                        type: type,
                        callback: {
                            fn: global ? 'on_global_' + type : 'on_' + type,
                            scope: this
                        } 
                    };
                    
                aria.utils.Event.addListener( listener.element, listener.type, listener.callback, true );
                this.listeners.push( listener );
            }
        },
        
        unregister_listener : function ( type, global ) {
            this.$logDebug( 'unregister_listener>' );
            global = ( global === true );
            
            var element = global ? Aria.$window.document.body : this.element;
            
            if ( element && type ) {
                for ( var i = 0 ; i < this.listeners.length ; i++ ) {
                    var listener = this.listeners[i];
                    if ( listener.global && listener.type == type ) {
                        aria.utils.Event.removeListener( listener.element, listener.type, listener.callback );
                    }
                }
            }
        },
        
        */
        
        register_listeners : function () {
            this.$logDebug( 'register_listeners>' );
            
            var has_listeners = false;

            for ( var type in this.listeners ) {
                if ( !this.listeners.hasOwnProperty( type ) ) {
                    continue;
                }
                
                this.listeners[ type ] = this.$normCallback.call( this._context, this.listeners[ type ] );
                
                this.$logDebug( 'register_listeners> ' + type + ', ' + this.listeners[ type ] );
                
                has_listeners = true;
            }

            this.$logDebug( 'register_listeners> ' + this.listeners.length );

            this.delegate_id = aria.utils.Delegate.add( {
                fn : this.delegate_event,
                scope : this
            } );
            
            this.$logDebug( 'register_listeners> ' + this.delegate_id );
        },
        
        delegate_event : function ( event ) {
            // this.$logDebug( 'delegate_event>' );
            
            // global level?
            // TODO
            
            // widget level
            this.call_widget_callback( event );
            
            // listener level
            this.call_listener_callback( event );
        },
        
        call_widget_callback : function ( event ) {
            // this.$logDebug( 'call_widget_callback> ' + event.type );
            // mousemove, mouseout, mouseover, click
            
            var type = event.type,
                callback = type ? this[ 'on_' + type ] : undefined;

            if ( callback ) {
                var return_value = callback.call( this, event );
                if ( return_value === false ) {
                    event.preventDefault();
                }
            }
        },
        
        call_listener_callback : function ( event ) {
            // this.$logDebug( 'call_listener_callback> ' + event.type );
            
            var type = event.type,
                callback = this.listeners.hasOwnProperty( type ) ? this.listeners[ type ] : undefined;

            if ( callback ) {
                this.$logDebug( 'call_listener_callback> ' + type );
                var wrapped = new aria.templates.DomEventWrapper( event );
                var return_value = callback.fn.call( callback.scope, wrapped, callback.args );
                wrapped.$dispose();
                if ( return_value === false ) {
                    event.preventDefault();
                }
            }
        },
        
        // //////////////////////////////////////////////////
        // init

        initWidget : function () {
            this.$logDebug( 'initWidget>' );
            this.element = aria.utils.Dom.getElementById( this.attributes.id );
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
