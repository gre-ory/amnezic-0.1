/*
 * Aria Templates 1.3.2 - 11 Dec 2012
 *
 * Copyright 2009-2012 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Constrain a given text element in the DOM to a specific width. This method only works on leaf elements (final dom
 * elements containing nothing but text). It will force the text to display on a single line only and cut it if it is
 * longer than the specified width.
 */
Aria.classDefinition({
    $classpath : 'aria.utils.Ellipsis',
    $dependencies : ['aria.utils.Function', 'aria.utils.FireDomEvent', 'aria.utils.Dom', 'aria.popups.Popup'],

    /**
     * Create ellipsis
     * @param {HTMLElement} el The DOM element to apply this to
     * @param {Number} width The width (in px) after which the text should be cut, if it is longer. If no width is
     * passed, the parent's size is used.
     * @param {String} position "right" or "left" to specify if the beginning of the text should be shown and the end
     * cut, or the opposite
     * @param {String} ellipsisStr The actual string to use for the ellipsis (defaults to "...")
     * @param {String} context Used for the popup (defaults to "...")
     */
    $constructor : function (el, width, position, ellipsisStr, context) {
        var document = Aria.$window.document;
        this.textContent = el.innerHTML;
        this.context = context;
        this.ellipsisElement = el;
        this.ellipsesNeeded = false;

        if (el.childNodes.length == 1 && el.childNodes[0].nodeType == 3) {

            // Get the width automatically from the parent if none was specified
            if (!width) {

                width = el.parentNode.offsetWidth;
                if (el.parentNode.lastChild.className == "xICNsortIndicator") {
                    if (el.parentNode.lastChild.offsetWidth > 0) {
                        width = width - el.parentNode.lastChild.offsetWidth;
                    }
                }
            }

            // temp element to get the width of text and the elipses
            var tempSizerEl = this._createSizerEl(el);

            tempSizerEl.innerHTML = el.innerHTML;
            document.body.appendChild(tempSizerEl);
            var textWidth = tempSizerEl.offsetWidth;
            tempSizerEl.parentNode.removeChild(tempSizerEl);

            tempSizerEl.innerHTML = (ellipsisStr != null ? ellipsisStr : "") + "&nbsp;";
            document.body.appendChild(tempSizerEl);
            var ellipsisWidth = tempSizerEl.offsetWidth;

            tempSizerEl.parentNode.removeChild(tempSizerEl);
            tempSizerEl = null;

            if (textWidth > width) {

                this.ellipsesNeeded = true;
                // Create the new span that will hold the complete string
                var textSpan = document.createElement("SPAN");
                // FIXME: use a css class instead
                textSpan.style.whiteSpace = "nowrap";
                textSpan.style.overflow = "hidden";
                textSpan.style.display = "inline-block";
                textSpan.style.verticalAlign = "bottom";

                // ie 6 isn't calculating the with properly. As such it can cut off a bit of the sort indicator icon
                if (aria.core.Browser.isIE6) {
                    width = width - 4;
                }
                width -= ellipsisWidth;

                if (width < 0) {
                    // this check is important, otherwise IE can raise an
                    // exception when setting the width
                    width = 0;
                }

                textSpan.style.width = width + "px";
                if (position == "left") {
                    textSpan.style.direction = "rtl";
                }
                textSpan.innerHTML = el.innerHTML;

                el.innerHTML = "";

                var ellSpan = document.createElement("SPAN");
                if (position == "left") {
                    ellSpan.innerHTML = ellipsisStr + "&nbsp;";
                    el.appendChild(ellSpan);
                    el.appendChild(textSpan);
                } else if (position == "right") {
                    ellSpan.innerHTML = "&nbsp;" + ellipsisStr;
                    el.appendChild(textSpan);
                    el.appendChild(ellSpan);
                }

            }
        } else {
            this.$logWarn(this.ELLIPSIS_NONTEXTUAL_ELEMENTS);
        }

    },
    $destructor : function () {

        if (this._popup && this._popup !== null) {
            this._popup.close();
            this._popup = null;
        }
        this.context = null;
        this.textContent = null;
        this.ellipsisElement = null;
        this.ellipsesNeeded = null;

        if (this.callbackID) {
            aria.core.Timer.cancelCallback(this.callbackID);
        }
        this.callbackID = null;

    },
    $statics : {
        // ERROR MESSAGE:
        ELLIPSIS_NONTEXTUAL_ELEMENTS : "Non-textual elements cannot be constrained to a specific width"
    },
    $prototype : {

        /**
         * Create the temporary sizer element to be used internally to measure text
         * @param {HTMLElement} el The element that will be measured thanks to this sizer
         * @return {HTMLElement} The sizer element
         * @private
         */
        _createSizerEl : function (el) {
            var document = Aria.$window.document;
            // Need to make sure the new element has the same exact styling applied as the original element so we use
            // the same tag, class, style and append it to the same parent
            var tempSizerEl = document.createElement(el.tagName);
            tempSizerEl.className = el.className;
            tempSizerEl.setAttribute("style", el.getAttribute("style"));
            el.parentNode.appendChild(tempSizerEl);

            // Now we need to make sure the element displays on one line and is not visible in the page
            tempSizerEl.style.visibility = "hidden";
            tempSizerEl.style.position = "absolute";
            tempSizerEl.style.whiteSpace = "nowrap";

            return tempSizerEl;
        },
        /**
         * Creates the container markup with the full text of the Ellipses
         * @param {aria.templates.MarkupWriter} out Markup writer which should receive the content of the popup.
         * @private
         */
        _renderFullText : function (out) {
            out.write("<span style='cursor:pointer;white-space:nowrap;background:white;font-weight:bold;'>"
                    + this.textContent + "</span>");

        },
        /**
         * Displays the full text of the ellipsised element
         * @param {Object} offset This gives an offset to the popup
         * @private
         */
        displayFullText : function (offset) {

            if (this.callbackID) {
                aria.core.Timer.cancelCallback(this.callbackID);
                this.callbackID = null;
            }

            if (this._popup == null && this.ellipsesNeeded === true) {

                this.callbackID = aria.core.Timer.addCallback({
                    fn : this._showPopup,
                    scope : this,
                    delay : 500,
                    args : offset
                });
            }
        },

        /**
         * Displays the full text of the ellipsised element
         * @param {offset} offset This gives an offset to the popup
         * @private
         */
        _showPopup : function (passedOffset) {
            var section = this.context.createSection({
                fn : this._renderFullText,
                scope : this
            });

            var popup = new aria.popups.Popup();
            this._popup = popup;

            popup.$on({
                scope : this,
                "onAfterClose" : this._onAfterPopupClose
            });

            popup.open({
                section : section,
                domReference : this.ellipsisElement,
                preferredPositions : [{
                            reference : "top left",
                            popup : "top left"
                        }],
                closeOnMouseOut : true,
                offset : {
                    top : passedOffset.top,
                    left : passedOffset.left
                }
            });

            popup.domElement.firstChild.onclick = aria.utils.Function.bind(this._popup_onmouseclick, this);

            this.callbackID = null;
        },

        /**
         * This raises and event as if the element has been clicked when the popup has been clicked
         * @protected
         */
        _popup_onmouseclick : function () {
            aria.utils.FireDomEvent.fireEvent('click', this.ellipsisElement, {});
        },

        /**
         * This hides the Full version of the ellipsised element
         * @param {event} domEvt The click DOM event
         * @protected
         */
        _hideFullText : function (relatedTarget) {

            if (this.callbackID) {
                aria.core.Timer.cancelCallback(this.callbackID);
            }
            if (this._popup != null) {
                if (!aria.utils.Dom.isAncestor(relatedTarget, this._popup.domElement)) {

                    if (this._popup) {
                        this._popup.closeOnMouseOut();
                    }
                }
            }
            this.callbackID = null;

        },

        /**
         * Event handler called when the popup is closed. This disposes of the popup
         * @protected
         */
        _onAfterPopupClose : function () {

            this._popup.$dispose();
            this._popup = null;
        }

    }
});
