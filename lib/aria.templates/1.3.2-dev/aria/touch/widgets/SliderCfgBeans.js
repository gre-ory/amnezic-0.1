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
Aria.beanDefinitions({
    $package : "aria.touch.widgets.SliderCfgBeans",
    $description : "Slider config beans",
    $namespaces : {
        "json" : "aria.core.JsonTypes"
    },
    $beans : {
        "SliderCfg" : {
            $type : "json:Object",
            $description : "Configuration of the slider widget.",
            $properties : {
                width : {
                    $type : "json:Integer",
                    $description : "Width to use for the widget.",
                    $default : 100
                },
                bindValue : {
                    $type : "json:Object",
                    $description : "Binding for the value of the slider.",
                    $properties : {
                        inside : {
                            $type : "json:ObjectRef",
                            $description : "Reference to the object that holds the property to bind to.",
                            $mandatory : true
                        },
                        to : {
                            $type : "json:String",
                            $description : "Name of the JSON property to bind to.",
                            $mandatory : true
                        }
                    }
                }
            }
        }
    }
});
