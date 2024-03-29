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
 * Contains getters for the Visual Focus environment.
 * @class aria.utils.environment.Date
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
    $classpath : "aria.utils.environment.VisualFocus",
    $extends : "aria.core.environment.EnvironmentBase",
    $dependencies : ["aria.utils.environment.VisualFocusCfgBeans"],
    $singleton : true,
    $prototype : {
        /**
         * Classpath of the bean which allows to validate the part of the environment managed by this class.
         * @type String
         */
        _cfgPackage : "aria.utils.environment.VisualFocusCfgBeans.AppCfg",

        /**
         * Get the specified outline style for visual focus
         * @public
         * @return {String} outline style
         */
        getAppOutlineStyle : function () {
            return this.checkApplicationSettings("appOutlineStyle");
        },

        /**
         * Apply the current environment.
         * @param {aria.core.JsObject.Callback} callback Will be called after the environment is applied.
         * @protected
         */
        _applyEnvironment : function (callback) {
            var appOutlineStyle = this.checkApplicationSettings("appOutlineStyle");
            // load aria.utils.VisualFocus if needed
            if (appOutlineStyle) {
                Aria.load({
                    classes : ['aria.utils.VisualFocus'],
                    oncomplete : callback ? {
                        fn : function () {
                            this.$callback(callback);
                        },
                        scope : this
                    } : null
                });
            } else {
                this.$callback(callback);
            }
        }
    }
});