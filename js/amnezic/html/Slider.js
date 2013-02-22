Aria.classDefinition({
    $classpath : 'amnezic.html.Slider',
    $extends : 'amnezic.html.Element',
    $statics : {
        BUTTON_WIDTH : 14
    },
    $dependencies : [
        'aria.utils.Event',
        'aria.DomEvent'
    ],

    // //////////////////////////////////////////////////
    // constructor
        
    $constructor : function ( cfg, context, lineNumber ) {
        this.$Element.constructor.call( this, cfg, context, lineNumber );
        
        // max_left_position
        this.max_left_position = this._cfg.width - this.BUTTON_WIDTH;
        if ( this.max_left_position < 10 ) {
            this.max_left_position = 10;
        }
        
        // bind
        var binding = this._cfg.bindValue;
        if ( binding ) {
            this.bind_callback = {
                fn : this._notifyDataChange,
                scope : this
            };
            aria.utils.Json.addListener( binding.inside, binding.to, this.bind_callback, false );
        }
        
        // value
        this.value = undefined;
        this.read_value();
        
        // left_position
        this.left_position = undefined;
        this.set_left_position( this.value * this.max_left_position );

        // element
        this.id = this._createDynamicId();
        this.element = undefined;

        // mouse
        this.saved_client_x = undefined;
        this.mouse_over = false;
        this.mouse_down = false;
        
        this.delegate_id = aria.utils.Delegate.add({
            fn : this.delegate_event,
            scope : this
        });
        
        this.need_update = false;
    },
  
    // //////////////////////////////////////////////////
    // destructor
  
    $destructor : function () {
        this._detachBodyEvents();
        
        if ( this.delegate_id ) {
            aria.utils.Delegate.remove( this.delegate_id );
            this.delegate_id = undefined;
        }
        
        if (this.bind_callback) {
            var binding = this._cfg.bindValue;
            aria.utils.Json.removeListener( binding.inside, binding.to, this.bind_callback, false );
            this.bind_callback = undefined;
        }
        
        this.element = undefined;
        this.$BaseWidget.$destructor.call(this);
        
    },
    
    $prototype : {

        // //////////////////////////////////////////////////
        // markup

        writeMarkup : function (out) {
            var html = ['<div class="sampleLibSlider" style="width:', this.max_left_position + this.BUTTON_WIDTH,
                'px;"><span class="sliderBegin">&nbsp;</span><span class="sliderEnd">&nbsp;</span><span ',
                aria.utils.Delegate.getMarkup(this.delegate_id), ' id="', this.id,
                '" class="sliderButton" style="left:', this.left_position, 'px;">&nbsp;</span></div>'];
            out.write(html.join(''));
        },

        // //////////////////////////////////////////////////
        // event
                
        delegate_event : function ( event ) {
            var method = this[ 'on_' + event.type ];
            if ( method ) {
                method.call( this, event );
                event.preventDefault();
            }
        },
        
        on_mouseover : function ( event ) {
            this.mouse_over = true;
            this.update_display();
        },
        
        on_mouseout : function ( event ) {
            this.mouse_over = false;
            this.update_display();
        },
        
        on_mousedown : function ( event ) {
            this.saved_client_x = event.clientX;
            this._attachBodyEvents();
            this.update_display();
        },
        
        /**
         * Register _document_mousemove and _document_mouseup for mouse events on the document body, if they are not
         * already registered.
         */
        _attachBodyEvents : function () {
          if (!this.mouse_down) {
            this.mouse_down = true;
            var body = Aria.$window.document.body;
            aria.utils.Event.addListener(body, "mousemove", {
              fn : this._document_mousemove,
              scope : this
            }, true);
            aria.utils.Event.addListener(body, "mouseup", {
              fn : this._document_mouseup,
              scope : this
            }, true);
          }
        },
        
        /**
         * Unregister _document_mousemove and _document_mouseup for mouse events on the document body, if they are not
         * already unregistered.
         */
        _detachBodyEvents : function () {
          if (this.mouse_down) {
            var body = Aria.$window.document.body;
            aria.utils.Event.removeListener(body, "mousemove", {
              fn : this._document_mousemove,
              scope : this
            });
            aria.utils.Event.removeListener(body, "mouseup", {
              fn : this._document_mouseup,
              scope : this
            });
            this.mouse_down = false;
          }
        },
        
        /**
         * Called when the user moves the mouse on the page, if this.mouse_down == true.
         * @param {HTMLEvent} evt HTML mousemove event
         */
        _document_mousemove : function (evt) {
          // wrap the HTML event in aria.DomEvent for cross-browser compatibility:
          var domEvt = new aria.DomEvent(evt);
          domEvt.stopPropagation(true);
          var diff = domEvt.clientX - this.saved_client_x;
          domEvt.$dispose(); // dispose the wrapper
          var oldLeftPosition = this.left_position;
          this.set_left_position(this.left_position + diff);
          this.saved_client_x += this.left_position - oldLeftPosition;
          this.update_display();
          this._setValue(this.left_position / this.max_left_position);
        },
        
        /**
         * Called when the user releases a mouse button on the page, if this.mouse_down == true.
         */
        _document_mouseup : function () {
          this._detachBodyEvents();
          this.update_display();
          this._setValue(this.left_position / this.max_left_position);
        },
        
        /**
         * Set the position of the button in pixels
         * @param {Number} newLeftPosition new position
         */
        _setLeftPosition : function (newLeftPosition) {
          if (newLeftPosition > this.max_left_position) {
            newLeftPosition = this.max_left_position;
          } else if (newLeftPosition < 0) {
            newLeftPosition = 0;
          }
          this.left_position = newLeftPosition;
        },
        
        /**
         * Set the value of the slider in the data model.
         * @param {Number} newValue new value
         */
        _setValue : function (newValue) {
          if (newValue !== this.value) {
            this.value = newValue;
            var binding = this._cfg.bindValue;
            if (binding) {
              aria.utils.Json.setValue(binding.inside, binding.to, newValue);
            }
          }
        },
        
        /**
         * Read the bound value in the data model, ensure it is defined, between 0 and 1, and assign the _value
         * property.
         */
        _readValue : function () {
          var value = this.value;
          var binding = this._cfg.bindValue;
          if (binding) {
            value = binding.inside[binding.to];
          }
          if ( value == undefined ) {
            value = 0;
          }
          if (value < 0) {
            value = 0;
          }
          if (value > 1) {
            value = 1;
          }
          this.value = value;
        },
        
        /**
         * Internal method called when the value in the data model changed (this method was registered with addListener
         * in the constructor of the slider).
         */
        _notifyDataChange : function () {
          this.read_value();
          this.set_left_position(this.value * this.max_left_position);
          this.update_display();
        },
        
        /**
         * Uses this.mouse_down, this.mouse_over and this.left_position to update the actual display of the slider.
         */
        update_display : function () {
          var domElt = this.getButtonDom();
          if (!domElt) {
            // This case may happen if the bound value changed between the time the widget is created and the time
            // its markup is inserted in the DOM
            this.need_update = true; // mark that it needs update (it will be updated when the widget is inserted
            // in the DOM, see the initWidget method)
            return;
          }
          var className = "sliderButton";
          if (this.mouse_down) {
            className += " down";
          } else if (this.mouse_over) {
            className += " highlighted";
          }
          if (domElt.className != className) {
            domElt.className = className;
          }
          var leftStyle = this.left_position + "px";
          if (domElt.style.left != leftStyle) {
            domElt.style.left = leftStyle;
          }
        },
        
        /**
         * Initialization method called after the markup of the widget has been inserted in the DOM. This method calls
         * update_display if the value has changed between the time the widget is created and the time its markup is
         * inserted in the DOM.
         */
        initWidget : function () {
            if ( this.need_update ) {
                this.update_display();
            }
        },
        
        /**
         * Return the DOM element corresponding to the button of the slider.
         * @return {HTMLElement}
         */
        getButtonDom : function () {
          var domElt = this.element;
          if ( domElt == undefined ) {
            domElt = aria.utils.Dom.getElementById(this.id);
            this.element = domElt;
          }
          return domElt;
        },
        
        /**
         * Return the DOM element corresponding to the whole slider. This method is used by the Aria Templates inspector
         * to highlight the widget.
         * @return {HTMLElement}
         */
        getDom : function () {
          var domElt = this.getButtonDom();
          return domElt.parentNode;
        }
    }
    
});
