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
 * Contains getters for the Date environment.
 * @class aria.utils.environment.Date
 * @extends aria.core.environment.EnvironmentBase
 * @singleton
 */
Aria.classDefinition({
    $classpath : "aria.utils.environment.Date",
    $dependencies : ["aria.utils.environment.DateCfgBeans"],
    $extends : "aria.core.environment.EnvironmentBase",
    $singleton : true,
    $prototype : {
        /**
         * Classpath of the bean which allows to validate the part of the environment managed by this class.
         * @type String
         */
        _cfgPackage : "aria.utils.environment.DateCfgBeans.AppCfg",

        /**
         * Get Date configuration
         * @return {aria.utils.environmentDateCfgBeans.DateFormatsCfg}
         */
        getDateFormats : function () {
            return this.checkApplicationSettings("dateFormats");
        },

        /**
         * Get Time configuration
         * @return {aria.utils.environment.DateCfgBeans.TimeFormatsCfg}
         */
        getTimeFormats : function () {
            return this.checkApplicationSettings("timeFormats");
        },

        /**
         * Get First day of week configuration
         * @return {Integer}
         */
        getFirstDayOfWeek : function () {
            var firstDayOfWeek = this.checkApplicationSettings("firstDayOfWeek");
            // Backward compatibility code to be removed, PTR#05579605 - start.
            if (aria.utils.Date) {
                firstDayOfWeek = aria.utils.Date.firstDayOfWeek;
            }
            // Backward compatibility code to be removed, PTR#05579605 - end.
            return firstDayOfWeek;
        },
        /**
         * Backward compatibility code to be removed, PTR#05579605 - start. Apply the current environment.
         * @param {aria.core.JsObject.Callback} callback Will be called after the environment is applied.
         * @override
         */
        _applyEnvironment : function (callback) {
            if (aria.utils.Date) {
                aria.utils.Date.firstDayOfWeek = this.checkApplicationSettings("firstDayOfWeek");
            }
            this.$callback(callback);
        }
    }
});