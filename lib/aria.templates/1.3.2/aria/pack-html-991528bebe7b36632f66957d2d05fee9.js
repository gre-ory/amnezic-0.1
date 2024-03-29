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
//***MULTI-PART
//*******************
//LOGICAL-PATH:aria/html/Element.js
//*******************
(function(){function e(e){e.writeMarkup=Aria.empty,e.writeMarkupBegin=Aria.empty,e.writeMarkupEnd=Aria.empty,e.initWidget=Aria.empty}Aria.classDefinition({$classpath:"aria.html.Element",$extends:"aria.widgetLibs.BindableWidget",$dependencies:["aria.html.beans.ElementCfg","aria.core.JsonValidator","aria.utils.Html","aria.utils.Json","aria.utils.Delegate","aria.templates.DomEventWrapper","aria.utils.Dom"],$statics:{INVALID_BEAN:"Invalid propety '%1' in widget's '%2' configuration."},$constructor:function(t,n,r
){this.$cfgBean=this.$cfgBean||"aria.html.beans.ElementCfg.Properties";var i=aria.core.JsonValidator.normalize({json:t,beanName:this.$cfgBean});this.$BindableWidget.constructor.apply(this,arguments);if(!i)return e(this);this._id=this._createDynamicId(),this._domElt=null,this.__delegateId=null,this._registerBindings(),this._normalizeCallbacks()},$destructor:function(){this.__delegateId&&(aria.utils.Delegate.remove(this.__delegateId),this.__delegateId=null),this.$BindableWidget.$destructor.call(this),this._domElt=
null},$prototype:{_normalizeCallbacks:function(){var e=this._cfg.on,t=!1;for(var n in e)e.hasOwnProperty(n)&&(t=!0,e[n]=this.$normCallback.call(this._context,e[n]));if(t){var r=aria.utils.Delegate;this.__delegateId=r.add({fn:this._delegate,scope:this})}},_delegate:function(e){var t=e.type,n=this._cfg.on[t];if(n){var r=new aria.templates.DomEventWrapper(e),i=n.fn.call(n.scope,r,n.args);return r.$dispose(),i}},writeMarkup:function(e){this._openTag(e),e.write("/>")},writeMarkupBegin:function(e){this._openTag(e)
,e.write(">")},writeMarkupEnd:function(e){e.write("</"+this._cfg.tagName+">")},onbind:Aria.empty,initWidget:function(){this._domElt=aria.utils.Dom.getElementById(this._id)},_openTag:function(e){var t=this._cfg,n=aria.utils.Html.buildAttributeList(t.attributes),r=["<",t.tagName," id='",this._id,"' "];n&&r.push(n," "),this.__delegateId&&r.push(aria.utils.Delegate.getMarkup(this.__delegateId)," "),e.write(r.join(""))},_notifyDataChange:function(e,t){this.onbind(t,this._transform(this._cfg.bind[t].transform,e.newValue
,"toWidget"),e.oldValue)}}})})();
//*******************
//LOGICAL-PATH:aria/html/HtmlLibrary.js
//*******************
Aria.classDefinition({$classpath:"aria.html.HtmlLibrary",$extends:"aria.widgetLibs.WidgetLib",$singleton:!0,$prototype:{widgets:{TextInput:"aria.html.TextInput",Template:"aria.html.Template"}}});
//*******************
//LOGICAL-PATH:aria/html/Template.js
//*******************
Aria.classDefinition({$classpath:"aria.html.Template",$extends:"aria.widgetLibs.BaseWidget",$dependencies:["aria.html.beans.TemplateCfg","aria.templates.TemplateTrait","aria.utils.Html","aria.templates.TemplateCtxt","aria.utils.Dom","aria.templates.ModuleCtrlFactory","aria.core.environment.Customizations"],$events:{ElementReady:{description:"Raised when the template content is fully displayed."}},$statics:{INVALID_CONFIGURATION:"%1Configuration for widget is not valid.",ERROR_SUBTEMPLATE:"#ERROR IN SUBTEMPLATE#"
},$constructor:function(e,t){this.$BaseWidget.constructor.apply(this,arguments),e.id?this._domId=this._context.$getId(e.id):this._domId=this._createDynamicId(),this._subTplDiv=null,this.subTplCtxt=null,this._needCreatingModuleCtrl=e.moduleCtrl&&e.moduleCtrl.getData==null,this._tplcfg={classpath:aria.core.environment.Customizations.getTemplateCP(e.classpath),args:e.args,id:this._domId,moduleCtrl:e.moduleCtrl},this._checkCfgConsistency(e);var n=new aria.templates.TemplateCtxt;this.subTplCtxt=n,this._initCtxDone=!1
,this.isDiffered=!1},$destructor:function(){this._subTplDiv=null,this.subTplCtxt&&(this.subTplCtxt.$dispose(),this.subTplCtxt=null),this.$BaseWidget.$destructor.apply(this,arguments)},$prototype:{$init:function(e){var t=aria.templates.TemplateTrait.prototype;for(var n in t)t.hasOwnProperty(n)&&!e.hasOwnProperty(n)&&(e[n]=t[n])},_checkCfgConsistency:function(e){try{this._cfgOk=aria.core.JsonValidator.normalize({json:e,beanName:"aria.html.beans.TemplateCfg.Properties"},!0),this._needCreatingModuleCtrl&&(this._cfgOk=
this._cfgOk&&aria.core.JsonValidator.normalize({json:e.moduleCtrl,beanName:"aria.templates.CfgBeans.InitModuleCtrl"}))}catch(t){var n=aria.core.Log;if(n){var r;for(var i=0,s=t.errors.length;i<s;i++)r=t.errors[i],r.message=n.prepareLoggedMessage(r.msgId,r.msgArgs);this.$logError(this.INVALID_CONFIGURATION,null,t)}}},_onTplLoad:function(e,t){var n=this._tplcfg;if(!n){t.autoDispose&&e.moduleCtrlPrivate.$dispose();return}var r=this._subTplDiv;n.tplDiv=r,n.data=this._cfg.data,e.moduleCtrl?n.moduleCtrl=e.moduleCtrl
:n.context=this._context,t.autoDispose&&(n.toDispose==null?n.toDispose=[e.moduleCtrlPrivate]:n.toDispose.push(e.moduleCtrlPrivate));var i=this.subTplCtxt;i.parent=this._context,e=i.initTemplate(n),this._initCtxDone=!0,e?(i.dataReady(),r&&i._cfg&&(r.className=r.className+" "+i.getCSSClassNames(!0),i.$onOnce({Ready:this.__innerTplReadyCb,scope:this}),i.$refresh()),this.tplcfg=null):(i.$dispose(),this.subTplCtxt=null),r=null},initWidget:function(){aria.html.Template.superclass.initWidget.call(this);var e=aria.utils
.Dom.getElementById(this._domId);this._subTplDiv=e;if(this._initCtxDone){var t=this.subTplCtxt;e.className=e.className+" "+t.getCSSClassNames(!0),t.linkToPreviousMarkup(e),t.viewReady()}},writeMarkup:function(e){if(this._cfgOk){var t=this._tplcfg;Aria.load({templates:[t.classpath],classes:this._needCreatingModuleCtrl?[this._cfg.moduleCtrl.classpath]:null,oncomplete:{scope:this,fn:this._onModuleCtrlLoad}});if(this._tplcfg){var n=this._cfg.type,r=["<",n,' id="',this._domId,'"'];this._cfg.attributes&&r.push(" "+
aria.utils.Html.buildAttributeList(this._cfg.attributes)),r.push(">");if(this._initCtxDone){var i=this.subTplCtxt,s=i.getMarkup();s!=null?r.push(s):r.push(this.ERROR_SUBTEMPLATE)}else this.isDiffered=!0;r.push("</"+n+">"),e.write(r.join(""))}else e.write("<div>"+this.ERROR_SUBTEMPLATE+"</div>")}},getId:function(){return this._cfg.id}}});
//*******************
//LOGICAL-PATH:aria/html/TextInput.js
//*******************
(function(){function e(e,t){e.fn.call(e.scope,t,e.args)}function t(t){this._typeCallback=null,e(t,this._domElt.value)}function n(n,r){this._typeCallback=aria.core.Timer.addCallback({fn:t,scope:this,delay:12,args:r.type});if(r.keydown)return e(r.keydown,n)}function r(e,t){var n=this._bindingListeners.value,r=this._transform(n.transform,e.target.getValue(),"fromWidget");aria.utils.Json.setValue(n.inside,n.to,r,n.cb),t&&t.fn.call(t.scope,e,t.args)}Aria.classDefinition({$classpath:"aria.html.TextInput",$extends:"aria.html.Element"
,$dependencies:["aria.html.beans.TextInputCfg"],$statics:{INVALID_USAGE:"Widget %1 can only be used as a %2."},$constructor:function(e,t,n){this.$cfgBean="aria.html.beans.TextInputCfg.Properties",e.tagName="input",e.attributes=e.attributes||{},e.attributes.type="text",e.on=e.on||{},this._reactOnType=this._registerType(e.on,t),this._registerBlur(e.on,t),this.$Element.constructor.call(this,e,t,n)},$destructor:function(){this._typeCallback&&aria.core.Timer.cancelCallback(this._typeCallback),this.$Element.$destructor
.call(this)},$prototype:{writeMarkupBegin:function(e){this.$logError(this.INVALID_USAGE,[this.$class,"container"])},writeMarkupEnd:Aria.empty,initWidget:function(){this.$Element.initWidget.call(this);var e=this._cfg.bind;if(e.value){var t=this._transform(e.value.transform,e.value.inside[e.value.to],"toWidget");t!=null&&(this._domElt.value=t)}},onbind:function(e,t,n){e==="value"&&(this._domElt.value=t)},_registerType:function(e,t){if(e.type){if(e.keydown)var r=this.$normCallback.call(t._tpl,e.keydown);var i=this
.$normCallback.call(t._tpl,e.type);return e.keydown={fn:n,scope:this,args:{type:i,keydown:r}},delete e.type,!0}return!1},_registerBlur:function(e,t){var n;e.blur&&(n=this.$normCallback.call(t._tpl,e.blur)),e.blur={fn:r,scope:this,args:n}}}})})();
//*******************
//LOGICAL-PATH:aria/html/beans/AutoCompleteCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.AutoCompleteCfg",$description:"Configuration for AutoComplete widget.",$namespaces:{json:"aria.core.JsonTypes",input:"aria.html.beans.TextInputCfg"},$beans:{Properties:{$type:"input:Properties",$description:"Properties of an AutoComplete widget.",$properties:{bind:{$type:"input:Properties.bind",$properties:{suggestions:{$type:"json:Array",$description:"List of suggestions taken from the Resources Handler",$contentType:{$type:"json:Object",$description:"Suggestion"
},$default:[]}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/ElementCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.ElementCfg",$description:"Base configuration for Element widget.",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$description:"All properties that can be used in Element widget.",$properties:{tagName:{$type:"json:String",$description:"Qualified name of the Element node",$sample:"div",$mandatory:!0},attributes:{$type:"html:HtmlAttribute",$default:{}},bind:{$type:"json:Object",$description:"List of properties that can be bound to this widget. Values should match bean aria.widgetLibs.CommonBeans.BindRef"
,$default:{},$restricted:!1},on:{$type:"json:Object",$description:"List of registered events and their callbacks. Values should match bean aria.widgetLibs.CommonBeans.Callback",$default:{},$restricted:!1}},$restricted:!1}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TemplateCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TemplateCfg",$description:"Definition of the JSON beans used by the aria html lib",$namespaces:{json:"aria.core.JsonTypes",html:"aria.templates.CfgBeans"},$beans:{Properties:{$type:"json:Object",$description:"The configuration for HTML Template include simple widget",$properties:{attributes:{$type:"html:HtmlAttribute",$description:"Parameters to apply to the DOM element of the section."},id:{$type:"json:String",$description:"unique id (within the template) to associate to the widget - if not provided, a unique id will automatically be generated by the framework"
,$mandatory:!1},classpath:{$type:"json:PackageName",$description:"Classpath of the template to be displayed when no customization has been done.",$mandatory:!0},type:{$type:"json:String",$description:"DOM type for this section.",$default:"div"},data:{$type:"json:ObjectRef",$description:"JSON object to be made accessible in the sub-template as this.data. By default, use the parent template data, unless moduleCtrl is specified, in which case the data model of that module controller is used.",$mandatory:!1},moduleCtrl
:{$type:"html:ModuleCtrl",$description:"Module controller to be used with the sub-template. By default, use the parent template module controller, unless data is specified and is the data model of one of the sub-modules of the parent template module controller, in which case that sub-module is used.",$mandatory:!1},args:{$type:"json:Array",$description:"Parameters to pass to the main macro in the sub-template.",$contentType:{$type:"json:MultiTypes",$description:"Any parameter to be passed to the main macro in the sub-template."
},$default:[]},baseTabIndex:{$type:"json:Integer",$description:"The base tab index that will be added to all tab indexes in the template",$default:0}}}}});
//*******************
//LOGICAL-PATH:aria/html/beans/TextInputCfg.js
//*******************
Aria.beanDefinitions({$package:"aria.html.beans.TextInputCfg",$description:"Configuration for Text Input widget.",$namespaces:{base:"aria.html.beans.ElementCfg",common:"aria.widgetLibs.CommonBeans"},$beans:{Properties:{$type:"base:Properties",$description:"Properties of a Text Input widget.",$properties:{bind:{$type:"base:Properties.$properties.bind",$properties:{value:{$type:"common:BindingRef",$description:"Bi-directional binding. The text input's value is set in the bound object on blur."}}},on:{$type:"base:Properties.$properties.on"
,$properties:{type:{$type:"common:Callback",$description:"Callback called when the user types inside the input. It corresponds to a keydown."}}}}}}});
//*******************
//LOGICAL-PATH:aria/html/controllers/Suggestions.js
//*******************
(function(){function e(){this.getSuggestions=function(e,t){this.pendingSuggestion={entry:e,callback:t}},this.getAllSuggestions=function(e){this.pendingSuggestion={callback:e}},this.$dispose=Aria.empty}function t(e){var t=e.scope;t._autoDisposeHandler=!1,t.$logError(t.INVALID_RESOURCES_HANDLER,e.classpath)}function n(e){var t=e.scope,n=Aria.getClassInstance(e.classpath),r=t._resourcesHandler.pendingSuggestion;t._resourcesHandler=n,t._autoDisposeHandler=!0,r&&(r.entry?n.getSuggestions(r.entry,r.callback):n.getAllSuggestions
(r.callback))}function r(e){aria.core.Timer.addCallback({fn:n,args:e,scope:{},delay:12})}function i(n,i){var s=Aria.getClassRef(n);if(s)return new s;var o={scope:i,classpath:n};return Aria.load({classes:[n],oncomplete:{fn:r,args:o},onerror:{fn:t,args:o}}),new e}Aria.classDefinition({$classpath:"aria.html.controllers.Suggestions",$dependencies:["aria.utils.Json","aria.utils.Type"],$constructor:function(){this._init()},$destructor:function(){this.dispose()},$statics:{INVALID_RESOURCES_HANDLER:"Invalid resources handler '%1'"
},$prototype:{_init:function(){this.data={suggestions:[],value:null},this._resourcesHandler=null,this._autoDisposeHandler=!1},dispose:function(){this._autoDisposeHandler&&this._resourcesHandler&&this._resourcesHandler.$dispose()},setResourcesHandler:function(e){aria.utils.Type.isString(e)&&(e=i(e,this),this._autoDisposeHandler=!0),this._resourcesHandler=e},suggestValue:function(e){this._resourcesHandler.getSuggestions(e,{fn:this._callback,scope:this})},_callback:function(e){aria.utils.Json.setValue(this.data
,"suggestions",e||[])},setSelected:function(e){aria.utils.Json.setValue(this.data,"value",e),this.empty()},empty:function(){aria.utils.Json.setValue(this.data,"suggestions",[])}}})})();