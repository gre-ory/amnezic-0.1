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
 * @class aria.widgets.form.TimeField TimeField widget
 * @extends aria.widgets.form.TextInput
 */
Aria.classDefinition({
    $classpath : 'aria.widgets.form.TimeField',
    $extends : 'aria.widgets.form.TextInput',
    $dependencies : ['aria.widgets.controllers.TimeController'],
    /**
     * TimeField constructor
     * @param{aria.widgets.CfgBeans.TextFieldCfg} cfg the widget configuration
     * @param{aria.templates.TemplateCtxt} ctxt template context
     */
    $constructor : function (cfg, ctxt, lineNumber) {
        var controller = new aria.widgets.controllers.TimeController(cfg);
        controller.setPattern(cfg.pattern);
        this.$TextInput.constructor.call(this, cfg, ctxt, lineNumber, controller);
    },
    $prototype : {}
});
