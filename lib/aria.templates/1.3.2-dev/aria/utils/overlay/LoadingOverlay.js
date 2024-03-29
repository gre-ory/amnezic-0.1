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
 * This class creates an overlay and keeps it positioned above a given HTML element
 */
Aria.classDefinition({
    $classpath : "aria.utils.overlay.LoadingOverlay",
    $extends : "aria.utils.overlay.Overlay",
    $constructor : function (element, overlayId, text) {
        // This is used by the parent constructor.
        this.__text = text;

        this.$Overlay.constructor.call(this, element, {
            id : overlayId,
            className : "xLDI"
        });
    },
    $prototype : {
        /**
         * Creates DIV element to act as the overlay
         * @param {Object} params Configuration object
         * @return {HTMLElement}
         * @protected
         * @override
         */
        _createOverlay : function (params) {
            var overlay = this.$Overlay._createOverlay.call(this, params);

            if (this.__text) {
                overlay.innerHTML = "<span class='xLDI-text'>" + this.__text + "</span>";
            }

            return overlay;
        },

        /**
         * Appends Overlay to DOM. The element is always added to the DOM and it's position is refreshed on scroll
         * @param {HTMLElement} overlay Overlay element
         * @protected
         */
        _appendToDOM : function (overlay) {
            var document = Aria.$window.document;
            document.body.appendChild(overlay);
        },

        /**
         * Calculate the Geometry/Position for the overlay
         * @param {HTMLElement} element DOM element to apply the overlay
         * @param {HTMLElement} overlay DOM element of the overlay
         * @protected
         */
        _setInPosition : function (element, overlay) {
            var geometry = aria.utils.Dom.getGeometry(element);
            var style = overlay.style;
            // geometry may be null if the element is not currently visible
            if (geometry) {
                style.top = geometry.y + "px";
                style.left = geometry.x + "px";
                style.width = geometry.width + "px";
                style.height = geometry.height + "px";
                style.display = "block";
            } else {
                style.display = "none";
            }
        }
    }
});