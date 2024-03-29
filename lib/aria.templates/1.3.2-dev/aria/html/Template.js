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
 * A HTML Template include simple widget
 */
Aria.classDefinition({
    $classpath : "aria.html.Template",
    $extends : "aria.widgetLibs.BaseWidget",
    $dependencies : ["aria.html.beans.TemplateCfg", "aria.templates.TemplateTrait", "aria.utils.Html",
            "aria.templates.TemplateCtxt", "aria.utils.Dom", "aria.templates.ModuleCtrlFactory",
            "aria.core.environment.Customizations"],
    $events : {
        "ElementReady" : {
            description : "Raised when the template content is fully displayed."
        }
    },
    $statics : {
        INVALID_CONFIGURATION : "%1Configuration for widget is not valid.",
        ERROR_SUBTEMPLATE : "#ERROR IN SUBTEMPLATE#"
    },
    $constructor : function (cfg, ctxt) {
        this.$BaseWidget.constructor.apply(this, arguments);

        /**
         * Creates a unique id to be used in the markup generated by the widget.
         * @return {String}
         */
        if (!cfg.id) {
            this._domId = this._createDynamicId();
        } else {
            this._domId = this._context.$getId(cfg.id);
        }

        /**
         * Element containing the template content
         * @protected
         * @type HTMLElement
         */
        this._subTplDiv = null;

        /**
         * Template context of the sub template.
         * @type aria.templates.TemplateCtxt
         */
        this.subTplCtxt = null;

        /**
         * Is true if a module controller instance has to be created by the template widget itself.
         * @protected
         * @type Boolean
         */
        this._needCreatingModuleCtrl = cfg.moduleCtrl && cfg.moduleCtrl.getData == null;

        /**
         * Configuration which will be sent to the template context. It is initialized with some properties in the
         * template widget constructor and completed later. It is set to null just after the template context has been
         * initialized, or if an error prevents the template from being loaded. So, if it is not null, we are still
         * waiting for the template to be loaded.
         * @protected
         * @type aria.templates.CfgBeans.InitTemplateCfg
         */
        this._tplcfg = {
            classpath : aria.core.environment.Customizations.getTemplateCP(cfg.classpath),
            args : cfg.args,
            id : this._domId,
            moduleCtrl : cfg.moduleCtrl
        };
        // does the normalization
        this._checkCfgConsistency(cfg);

        var tplCtxt = new aria.templates.TemplateCtxt();
        this.subTplCtxt = tplCtxt;

        /**
         * Whether the context was already initialized or not.<br />
         * Not-initialized context means the the widget is still waiting for some dependencies to load, thus it's a
         * differed content
         * @type Boolean
         * @protected
         */
        this._initCtxDone = false;

        /**
         * Whether or not the widget is differed in its main section.<br />
         * If the context is not initialized when the markup is created this widget should be considered as differed to
         * avoid triggering $displayReady on the containg template
         * @type Boolean
         * @override
         */
        this.isDiffered = false;
    },
    $destructor : function () {
        this._subTplDiv = null;
        if (this.subTplCtxt) {
            this.subTplCtxt.$dispose();
            this.subTplCtxt = null;
        }
        this.$BaseWidget.$destructor.apply(this, arguments);
    },
    $prototype : {
        $init : function (p) {
            var src = aria.templates.TemplateTrait.prototype;
            for (var key in src) {
                if (src.hasOwnProperty(key) && !p.hasOwnProperty(key)) {
                    // copy methods which are not already on this object (this avoids copying $classpath and
                    // $destructor)
                    p[key] = src[key];
                }
            }
        },

        /**
         * Internal function called before markup generation to check the widget configuration consistency
         */
        _checkCfgConsistency : function (cfg) {
            try {
                this._cfgOk = aria.core.JsonValidator.normalize({
                    json : cfg,
                    beanName : "aria.html.beans.TemplateCfg.Properties"
                }, true);
                if (this._needCreatingModuleCtrl) {
                    this._cfgOk = this._cfgOk && aria.core.JsonValidator.normalize({
                        json : cfg.moduleCtrl,
                        beanName : "aria.templates.CfgBeans.InitModuleCtrl"
                    });
                }
            } catch (e) {
                var logs = aria.core.Log;
                if (logs) {
                    var error;
                    for (var index = 0, l = e.errors.length; index < l; index++) {
                        error = e.errors[index];
                        error.message = logs.prepareLoggedMessage(error.msgId, error.msgArgs);
                    }
                    this.$logError(this.INVALID_CONFIGURATION, null, e);
                }
            }
        },

        /**
         * Callback for the template load. It is called after the module controller initialization. This method creates
         * and intiliazes a template context for the widget and triggers a refresh on the template.
         * @protected
         */
        _onTplLoad : function (res, args) {
            var tplcfg = this._tplcfg;
            if (!tplcfg) {
                // the template may be ready after the widget has been disposed
                // do nothing in this case
                // except disposing the module which has just been created
                if (args.autoDispose) {
                    res.moduleCtrlPrivate.$dispose();
                }
                return;
            }

            var tplDiv = this._subTplDiv; // may be null at this time

            tplcfg.tplDiv = tplDiv;

            tplcfg.data = this._cfg.data;

            // if a module controller was created, inject it in template initialization
            if (res.moduleCtrl) {
                tplcfg.moduleCtrl = res.moduleCtrl;
            } else {
                tplcfg.context = this._context;
            }
            if (args.autoDispose) {
                if (tplcfg.toDispose == null) {
                    tplcfg.toDispose = [res.moduleCtrlPrivate];
                } else {
                    tplcfg.toDispose.push(res.moduleCtrlPrivate);
                }
            }
            /*
             * var tplCtxt = new aria.templates.TemplateCtxt(); this.subTplCtxt = tplCtxt;
             */
            var tplCtxt = this.subTplCtxt;
            tplCtxt.parent = this._context;

            res = tplCtxt.initTemplate(tplcfg);
            this._initCtxDone = true;

            if (res) {
                tplCtxt.dataReady(); // data successfully loaded: signal to template through TemplateContext
                // check that tplCtxt was not disposed
                if (tplDiv && tplCtxt._cfg) {
                    // Load the CSS dependecies, the style should be added before the html
                    tplDiv.className = tplDiv.className + " " + tplCtxt.getCSSClassNames(true);
                    tplCtxt.$onOnce({
                        "Ready" : this.__innerTplReadyCb,
                        scope : this
                    });
                    tplCtxt.$refresh();
                }
                // don't clean this object, as the template context will do it. Just break reference
                this.tplcfg = null;

            } else {
                tplCtxt.$dispose();
                this.subTplCtxt = null;
            }

            tplDiv = null;
        },

        /**
         * Initialize the template widget when DOM is available. As this widget has _directInit it gets initialized soon
         * after the markup is added to the DOM.
         * @protected
         */
        initWidget : function () {
            aria.html.Template.superclass.initWidget.call(this);
            var tplDiv = aria.utils.Dom.getElementById(this._domId);
            this._subTplDiv = tplDiv;

            if (this._initCtxDone) {
                var tplCtxt = this.subTplCtxt;
                tplDiv.className = tplDiv.className + " " + tplCtxt.getCSSClassNames(true);
                tplCtxt.linkToPreviousMarkup(tplDiv);
                tplCtxt.viewReady();
            }
        },

        /**
         * Write in the output buffer the markup for a template widget. Since the template classpath might not be loaded
         * yet, this function is asynchronous. If the template is not loaded yet it will write a placeholder, otherwise
         * the template content
         * @param {aria.templates.MarkupWriter} out Markup Writer
         * @protected
         */
        writeMarkup : function (out) {
            if (this._cfgOk) {
                var tplcfg = this._tplcfg;
                Aria.load({
                    templates : [tplcfg.classpath],
                    classes : (this._needCreatingModuleCtrl ? [this._cfg.moduleCtrl.classpath] : null),
                    oncomplete : {
                        scope : this,
                        fn : this._onModuleCtrlLoad
                    }
                });
                if (this._tplcfg) {
                    var tagName = this._cfg.type;
                    var markup = ['<', tagName, ' id="', this._domId, '"'];
                    if (this._cfg.attributes) {
                        markup.push(' ' + aria.utils.Html.buildAttributeList(this._cfg.attributes));
                    }
                    markup.push('>');
                    if (this._initCtxDone) {
                        var tplCtxt = this.subTplCtxt;
                        var prevMarkup = tplCtxt.getMarkup();
                        if (prevMarkup != null) {
                            markup.push(prevMarkup);
                        } else {
                            markup.push(this.ERROR_SUBTEMPLATE);
                        }
                    } else {
                        this.isDiffered = true;
                    }
                    markup.push('</' + tagName + '>');
                    out.write(markup.join(''));
                } else {
                    out.write("<div>" + this.ERROR_SUBTEMPLATE + "</div>");
                }
            }
        },

        /**
         * Return the id of the widget, if it should be referenced from the template scripts or other widgets.<br />
         * In this case do not return dynamic ids, as they don't need to be checked for unicity and they are not known
         * outside the widget
         * @return {String} id of the widget, as specified in the config
         * @override
         */
        getId : function () {
            return this._cfg.id;
        }
    }
});