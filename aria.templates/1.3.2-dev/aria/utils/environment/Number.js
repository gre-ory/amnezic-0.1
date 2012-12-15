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
 * Contains getters for the Number environment.
 */
Aria.classDefinition({
    $classpath : "aria.utils.environment.Number",
    $extends : "aria.core.environment.EnvironmentBase",
    $dependencies : ["aria.utils.environment.NumberCfgBeans"],
    $singleton : true,
    $prototype : {
        /**
         * Classpath of the bean which allows to validate the part of the environment managed by this class.
         * @type String
         */
        _cfgPackage : "aria.utils.environment.NumberCfgBeans.AppCfg",

        /**
         * Return currency formats
         * @return {aria.utils.environment.Number.CurrencyFormatsCfg}
         */
        getCurrencyFormats : function () {
            return this.checkApplicationSettings("currencyFormats");
        },

        /**
         * Return decimal format symbols
         * @return {aria.utils.environment.NumberCfgBeans.DecimalFormatSymbols}
         */
        getDecimalFormatSymbols : function () {
            return this.checkApplicationSettings("decimalFormatSymbols");
        }
    }
});