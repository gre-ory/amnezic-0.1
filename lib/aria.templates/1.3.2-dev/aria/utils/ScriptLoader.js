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
 * Utility to load external scripts
 */
Aria.classDefinition({
    $classpath : "aria.utils.ScriptLoader",
    $singleton : true,
    $dependencies : ['aria.utils.Type', 'aria.core.Browser'],
    $constructor : function () {
        this._queueIndex = 0;
        this._queueCount = {};
        this._loadedSripts = [];
    },
    $destructor : function () {
        this._queueCount = null;
        this.loadedScripts = null;
    },
    $prototype : {

        /**
         * Load the scripts then call a callback function
         * @param {Array} scripts - An array of scripts to load
         * @param {Function} callback - A function to call once the whole set of scripts are loaded
         */
        load : function (scripts, callback) {
            var i, ii, url, scriptNode, scriptCount, loadedScripts = this._loadedSripts,

            queueIndex = this._queueIndex, document = Aria.$frameworkWindow.document,

            head = document.getElementsByTagName('head')[0], that = this,

            onReadyStateChangeCallback = function (queueId, scriptNode) {
                var key = "" + queueId;
                that._queueCount[key]--;
                if (that._queueCount[key] === 0) {
                    delete that._queueCount[key];
                    that.$callback(callback);
                }
            };

            if (aria.utils.Type.isString(scripts)) {
                scripts = [scripts];
            }

            scriptCount = 0;
            for (i = 0, ii = scripts.length; i < ii; i++) {
                url = scripts[i];
                if (!loadedScripts[url]) {
                    scriptCount++;
                    loadedScripts[url] = true;
                    scriptNode = document.createElement('script');
                    scriptNode.setAttribute("language", "javascript");
                    if (callback) {
                        this._addScriptLoadedCallback(scriptNode, onReadyStateChangeCallback, [queueIndex, scriptNode]);
                    }
                    scriptNode.src = url;
                    head.appendChild(scriptNode);
                }
            }
            if (scriptCount === 0) {
                this.$callback(callback);
            } else {
                this._queueCount["" + queueIndex] = scriptCount;
            }
            this._queueIndex++;
        },

        /**
         * Load the scripts then call a callback function
         * @param {Node} scriptNode The script node to manage
         * @param {Function} callback The callback to call once the script is loaded
         * @param {Array} callbackArgs an array of arguments to be given to the callback
         * @private
         */
        _addScriptLoadedCallback : function (scriptNode, callback, callbackArgs) {
            if (aria.core.Browser.isIE) {
                this._addScriptLoadedCallback = function (scriptNode, callback, callbackArgs) {
                    scriptNode.onreadystatechange = function () {
                        if (this.readyState == 'complete' || this.readyState == 'loaded') {
                            callback.apply(null, callbackArgs);
                        }
                    };
                };
            } else {
                this._addScriptLoadedCallback = function (scriptNode, callback, callbackArgs) {
                    scriptNode.onload = function () {
                        callback.apply(null, callbackArgs);
                    };
                };
            }
            this._addScriptLoadedCallback.call(this, scriptNode, callback, callbackArgs);
        }
    }
});