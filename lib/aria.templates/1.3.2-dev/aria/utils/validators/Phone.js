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
 * Validates the entry if it is formatted as something like a phone.
 */
Aria.classDefinition({
    $classpath : "aria.utils.validators.Phone",
    $extends : "aria.utils.validators.RegExp",
    $constructor : function (message) {
        this.$RegExp.constructor.call(this, this.PHONE_REGEXP, message);
    },
    $statics : {
        PHONE_REGEXP : /^[A-Za-z0-9 \-\+\(\)]{2,30}$/,
        DEFAULT_LOCALIZED_MESSAGE : "Invalid PHONE string."
    },
    $prototype : {}
});
