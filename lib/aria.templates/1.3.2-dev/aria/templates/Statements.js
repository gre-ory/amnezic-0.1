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
 * Template statements. Note that root statements are special ones and are not included here.
 */
Aria.classDefinition({
    $classpath : "aria.templates.Statements",
    $dependencies : ["aria.utils.String", "aria.templates.Modifiers", "aria.utils.Path", "aria.utils.Delegate"],
    $singleton : true,
    $statics : {
        // ERROR MESSAGES:
        SHOULD_BE_IN_MACRO : "line %2: Template error: statement '%1' cannot be used out of a macro.",
        TEMPLATE_STATEMENT_MISUSED : "Template error: the '%1' statement is misused, it should only be used as the root statement in a template.",
        ELSE_WITHOUT_IF : "line %1: Template error: 'else' or 'elseif' is used outside an 'if' structure.",
        ELSEIF_AFTER_ELSE : "line %1: Template error: 'elseif' is used after 'else' in the same 'if' structure.",
        ELSE_ALREADY_USED : "line %1: Template error: an 'else' statement has already been used in this 'if' structure.",
        INVALID_WIDGET_SYNTAX : "line %1: Template error: invalid syntax for the widget statement; expected syntax: @lib:widget",
        UNDECLARED_WIDGET_LIBRARY : "line %2: Template error: found widget library '%1', which is undeclared in the wlibs parameter of the 'Template' statement.",
        INVALID_MODIFIER_SYNTAX : "line %2: Template error: invalid modifier syntax '%1'.",
        UNKNOWN_WIDGET : "line %2: Template error: unknown widget '%1'.",
        MACRO_ALREADY_DEFINED : "line %3: Template error: macro '%1' is already defined line %2.",
        SEPARATOR_NOT_FIRST_IN_FOREACH : "line %1: Template error: the separator statement can only be used as the first statement inside a {foreach ...} ... {/foreach} loop.",
        INCOMPATIBLE_CREATEVIEW : "line %2: Template error: two createView statements with the same view base name must have the same depth (previous definition line %1).",
        INCORRECT_VARIABLE_NAME : "line %2: Template error: incorrect variable name '%1'.",
        INVALID_FOREACH_INKEYWORD : "line %2: Template error: invalid foreach syntax, expected one of 'in', 'inView', 'inFilteredView', 'inSortedView', 'inPagedView' but found: '%1'.",
        INVALID_WIDGET_LIBRARY : "line %3: Template error: %1 (%2) is not a valid widget library. A widget library must extend aria.widgetLibs.WidgetLib.",
        INVALID_EVENT_TYPE : "The event type: '%1' is an invalid event type."
    },
    $constructor : function () {
        var utilString = aria.utils.String;
        var modifiers = aria.templates.Modifiers;
        var pathUtils = aria.utils.Path;
        var statementsSingleton = this;

        // Root statements are processed differently from other statements (they are processed directly without going
        // through ALLSTATEMENT), so if the process method is called, it means the statement was misused):
        var rootStatement = {
            inMacro : false,
            container : true,
            process : function (out, statement) {
                return out.logError(statement, statementsSingleton.TEMPLATE_STATEMENT_MISUSED, [statement.name]);
            }
        };

        this.ALLSTATEMENTS = {
            "Template" : rootStatement,
            "Library" : rootStatement,
            "CSSTemplate" : rootStatement,
            "CSSLibrary" : rootStatement,
            "TextTemplate" : rootStatement,
            "#TEXT#" : {
                container : false,
                process : function (out, statement) {
                    if (out.isOutputReady()) {
                        var param = out.stringify(statement.paramBlock);
                        out.writeln("this.__$write(", param, ",", statement.lineNumber, ");");
                    } else {
                        // check if text contains something
                        if (statement.paramBlock.replace(/[ \t\r\n]+/gm, "") !== '') {
                            out.logError(statement, statementsSingleton.SHOULD_BE_IN_MACRO, ["#TEXT# - "
                                    + statement.paramBlock]);
                        }
                    }
                }
            },
            "#CDATA#" : {
                inMacro : true,
                container : false,
                process : function (out, statement) {
                    var param = out.stringify(statement.paramBlock);
                    out.writeln("this.__$write(", param, ",", statement.lineNumber, ");");
                }
            },
            "#EXPRESSION#" : {
                inMacro : true,
                container : false,
                process : function (out, statement, classGenerator) {
                    var param = statement.paramBlock, nextPipe = utilString.indexOfNotEscaped(param, "|"), parts = [];
                    // split param against unescaped |
                    while (nextPipe != -1) {
                        parts.push(param.substr(0, nextPipe));
                        param = param.substr(nextPipe + 1);
                        nextPipe = utilString.indexOfNotEscaped(param, "|");
                    }
                    parts.push(param);

                    // Check if the secure must be done automatically or not:
                    // - either the modifier is present in the list and thus we leave the default behavior of modifiers
                    // - either we are in the context of a CSS Template and we decide not to escape automatically
                    var automaticSecure = true;

                    var escapeModifier = classGenerator.escapeModifier;
                    if (!escapeModifier) {
                        automaticSecure = false;
                    } else {
                        for (var i = parts.length - 1; i >= 1; i--) {
                            var part = parts[i];
                            if (part.indexOf(escapeModifier) === 0) {
                                automaticSecure = false;
                                break;
                            }
                        }
                    }

                    /* Begin non backward compatible change */
                    var automaticSecure = false;
                    /* End non backward compatible change */

                    // If the secure must be done automatically, we add the modifier at the end of the list, to rely on
                    // this available mechanism
                    if (automaticSecure) {
                        parts.splice(1, 0, escapeModifier);
                    }

                    var beginexpr = [], endexpr = [];
                    var expr;
                    var regExp = /^(\w+)(?::([\s\S]*))?$/;
                    for (var i = parts.length - 1; i >= 1; i--) {
                        var modifier = parts[i]; // e.g. default:"param"
                        var match = regExp.exec(modifier); // something like ['default:"param"', "default", '"param"']
                        if (!match) {
                            return out.logError(statement, statementsSingleton.INVALID_MODIFIER_SYNTAX, [modifier]);
                        }
                        var modifierName = match[1];
                        // init the modifier, for example add a dependency
                        modifiers.initModifier(modifierName, out);
                        beginexpr.push("this.$modifier('" + modifierName + "',[");
                        expr = match[2]; // parameters of the modifier
                        if (expr) {
                            endexpr[i] = ", " + expr;
                            if (automaticSecure) {
                                endexpr[i] += ", '" + escapeModifier + "'";
                            }
                            endexpr[i] += "])";
                        } else {
                            endexpr[i] = "])";
                        }
                    }
                    expr = parts[0];
                    beginexpr.push(expr);

                    // merge final expression
                    expr = beginexpr.concat(endexpr).join('');

                    if (out.debug) {
                        expr = out.wrapExpression(expr, statement, "this.EXCEPTION_IN_EXPRESSION");
                    }
                    out.writeln("this.__$write(", expr, ",", statement.lineNumber, ");");
                }
            },
            "separator" : {
                inMacro : true,
                container : true,
                paramRegexp : /^$/,
                process : function (out, statement) {
                    var foreachStruct = statement.parent;
                    // allow text before the foreach for the Txt templates
                    var okStruct = foreachStruct.content[0] == statement
                            || (foreachStruct.content[1] == statement && foreachStruct.content[0].name == "#TEXT#");
                    if (foreachStruct.name != "foreach" || !okStruct) {
                        out.logError(statement, statementsSingleton.SEPARATOR_NOT_FIRST_IN_FOREACH);
                        return;
                    }
                    var variterct = foreachStruct[Aria.FRAMEWORK_PREFIX + 'foreachCounter'];
                    out.writeln("if (", variterct, ">1) {");
                    out.increaseIndent();
                    out.processContent(statement.content);
                    out.decreaseIndent();
                    out.writeln("}");
                }
            },
            "id" : {
                inMacro : true,
                container : false,
                paramRegexp : /^\s*(\S[\s\S]*)\s*$/,
                process : function (out, statement, param) {
                    var userId = param[0];
                    out.writeln('this.__$writeId(', userId, ",", statement.lineNumber, ');');
                }
            },
            "on" : {
                inMacro : true,
                container : false,
                paramRegexp : /^(\w+)\s+([\s\S]+)$/,
                process : function (out, statement, param) {
                    var eventName = param[1];
                    var callback = param[2];
                    var delegate = aria.utils.Delegate;
                    var eventDependencies = delegate.delegatedGestures[eventName];
                    if (eventDependencies) {
                        out.addDependency(eventDependencies);
                    }
                    if (!delegate.supportedEvents[eventName]) {
                        out.logWarn(statement, statementsSingleton.INVALID_EVENT_TYPE, [eventName]);
                    }
                    out.writeln("this.__$statementOnEvent(", out.stringify(eventName), ",this.$normCallback(", callback, "),", statement.lineNumber, ');');
                }
            },
            "bindRefreshTo" : {
                inMacro : true,
                container : false,
                paramRegexp : /^([\s\S]+)$/,
                process : function (out, statement, param) {
                    var data = statement.paramBlock, container, pathParts;
                    pathParts = pathUtils.parse(utilString.trim(data));
                    if (pathParts.length > 1) {
                        param = out.stringify(pathParts.pop());
                        container = pathUtils.pathArrayToString(pathParts);
                    } else {
                        // case for {bindRefreshTo myVar/}
                        param = "null";
                        container = pathParts[0];
                    }
                    out.writeln("this.__$bindAutoRefresh(", container, ", ", param, ", ", statement.lineNumber, ");");
                }
            },
            "if" : {
                inMacro : true,
                container : true,
                process : function (out, statement) {
                    var param = statement.paramBlock;
                    out.writeln("if (", param, ") {");
                    out.increaseIndent();
                    out.processContent(statement.content);

                    // clean statement in case of reprocessing of the tree
                    delete statement[Aria.FRAMEWORK_PREFIX + "elsepresent"];

                    out.decreaseIndent();
                    out.writeln("}");
                }
            },
            "elseif" : {
                inMacro : true,
                container : false,
                process : function (out, statement) {
                    var param = statement.paramBlock;
                    var ifstruct = statement.parent;
                    if (ifstruct.name != "if") {
                        return out.logError(statement, statementsSingleton.ELSE_WITHOUT_IF);
                    }
                    if (ifstruct[Aria.FRAMEWORK_PREFIX + "elsepresent"]) {
                        return out.logError(statement, statementsSingleton.ELSEIF_AFTER_ELSE);
                    }
                    out.decreaseIndent();
                    out.writeln("} else if (", param, ") {");
                    out.increaseIndent();
                }
            },
            "else" : {
                inMacro : true,
                container : false,
                paramRegexp : /^$/, /* no parameter for else */
                process : function (out, statement) {
                    var ifstruct = statement.parent;
                    if (ifstruct.name != "if") {
                        return out.logError(statement, statementsSingleton.ELSE_WITHOUT_IF);
                    } else if (ifstruct[Aria.FRAMEWORK_PREFIX + "elsepresent"]) {
                        return out.logError(statement, statementsSingleton.ELSE_ALREADY_USED);
                    }
                    ifstruct[Aria.FRAMEWORK_PREFIX + "elsepresent"] = true;
                    out.decreaseIndent();
                    out.writeln("} else {");
                    out.increaseIndent();
                }
            },
            "createView" : {
                inMacro : undefined, /* may be either in or out of a macro */
                container : false,
                // syntax: createView myView[param1][param2] on myArray
                paramRegexp : /^([_\w]+)(\[([^\[\]]+(\]\[[^\[\]])*)\])?\s+on\s+([\s\S]+)$/,
                process : function (out, statement, param) {
                    var viewBaseName = param[1];
                    if (Aria.isJsReservedWord(viewBaseName)) {
                        return out.logError(statement, statementsSingleton.INCORRECT_VARIABLE_NAME, [viewBaseName]);
                    }
                    var viewParametersString = param[3];
                    var viewArray = param[5];
                    var viewParametersArray = [];
                    var numberOfParameters = 0;
                    if (viewParametersString) {
                        viewParametersArray = viewParametersString.split('][');
                        numberOfParameters = viewParametersArray.length;
                        viewParametersString = ['[(', viewParametersArray.join('),('), ')]'].join('');
                    } else {
                        viewParametersString = "[]";
                    }
                    var view = out.getView(viewBaseName);
                    if (view.firstDefinition) {
                        // check the number of parameters, which must be the same for a given view base name
                        // through the whole template
                        if (view.nbParams != numberOfParameters) {
                            out.logError(statement, statementsSingleton.INCOMPATIBLE_CREATEVIEW, [view.firstDefinition.lineNumber]);
                            return;
                        }
                    } else {
                        view.firstDefinition = statement;
                        view.nbParams = numberOfParameters;
                    }
                    out.addDependency("aria.templates.View"); // dependency on the view object
                    var isGlobal = !out.isOutputReady();
                    if (isGlobal) {
                        out.enterBlock("globalVars");
                    }
                    out.writeln(isGlobal ? "this." : "var ", viewBaseName, "=this.__$createView(", out.stringify(viewBaseName), ",", viewParametersString, ",(", viewArray, "));");
                    if (isGlobal) {
                        out.leaveBlock();
                    }
                }
            },
            "for" : {
                inMacro : true,
                container : true,
                process : function (out, statement) {
                    // TODO: check parameter to avoid code injection and make debugging easier?
                    out.writeln("for (", statement.paramBlock, ") {");
                    out.increaseIndent();
                    out.processContent(statement.content);
                    out.decreaseIndent();
                    out.writeln("}");
                }
            },
            "foreach" : {
                inMacro : true,
                container : true,
                // syntax: foreach varname in mymap
                // or : foreach varname inArray myArray
                // or : foreach varname inSortedView myview
                // or : foreach varname inFilteredView myview
                // or : foreach varname inPagedView myview
                // or : foreach varname inView myview
                paramRegexp : /^([_\w]+)\s+(\w+)\s+([\s\S]+)$/,
                process : function (out, statement, param) {
                    var variterset = out.newVarName();
                    var varitervalue = param[1];
                    if (Aria.isJsReservedWord(varitervalue)) {
                        return out.logError(statement, statementsSingleton.INCORRECT_VARIABLE_NAME, [varitervalue]);
                    }
                    var inKeyWord = param[2];
                    if (inKeyWord != "in" && inKeyWord != "inArray" && inKeyWord != "inView"
                            && inKeyWord != "inSortedView" && inKeyWord != "inFilteredView"
                            && inKeyWord != "inPagedView") {
                        return out.logError(statement, statementsSingleton.INVALID_FOREACH_INKEYWORD, [inKeyWord]);
                    }
                    var iteratesView = (inKeyWord != "in" && inKeyWord != "inArray");
                    if (inKeyWord == "inView") {
                        inKeyWord = "inPagedView";
                    }
                    var iteratedObject = param[3];
                    var variterindex = varitervalue + "_index";
                    if (out.debug) {
                        iteratedObject = out.wrapExpression(iteratedObject, statement, "this.ITERABLE_UNDEFINED");
                    }

                    out.writeln("var ", variterset, "=(", iteratedObject, ");");

                    out.writeln("if(", iteratedObject, "==undefined){");
                    out.increaseIndent();
                    out.writeln("this.$logError(this.ITERABLE_UNDEFINED,[", out.stringify(statement.name), ", ", statement.lineNumber, "]);");
                    out.decreaseIndent();
                    out.writeln("}");

                    var variterct = varitervalue + "_ct";
                    statement[Aria.FRAMEWORK_PREFIX + 'foreachCounter'] = variterct; // for the separator statement
                    out.writeln("var ", variterct, "=0;");
                    var varLastIndex;
                    if (iteratesView) {
                        varLastIndex = out.newVarName();
                        out.writeln(variterset, ".refresh();");
                        if (inKeyWord == "inPagedView") {
                            var varCurrentPageIndex = out.newVarName();
                            out.writeln("var ", varCurrentPageIndex, "=", variterset, ".currentPageIndex;");
                            out.writeln("var ", varLastIndex, "=", variterset, ".pages[", varCurrentPageIndex, "].lastItemIndex;");
                            out.writeln("for (var ", variterindex, "=", variterset, ".pages[", varCurrentPageIndex, "].firstItemIndex;", variterindex, "<=", varLastIndex, ";", variterindex, "++) {");
                        } else {
                            out.writeln("var ", varLastIndex, "=", variterset, ".items.length;");
                            out.writeln("for (var ", variterindex, "=0;", variterindex, "<", varLastIndex, ";", variterindex, "++) {");
                        }
                        out.increaseIndent();
                        out.writeln("var ", varitervalue, "_info=", variterset, ".items[", variterindex, "];");
                        if (inKeyWord == "inPagedView") {
                            out.writeln("if (", varitervalue, "_info.pageIndex==", varCurrentPageIndex, ") {");
                        } else if (inKeyWord == "inFilteredView") {
                            out.writeln("if (", varitervalue, "_info.filteredIn) {");
                        }
                        out.increaseIndent();
                        out.writeln("var ", varitervalue, "=", varitervalue, "_info.value;");
                    } else if (inKeyWord == "inArray") {
                        varLastIndex = out.newVarName();
                        out.writeln("var ", varLastIndex, "=", variterset, ".length;");
                        out.writeln("for (var ", variterindex, "=0;", variterindex, "<", varLastIndex, ";", variterindex, "++) {");
                        out.increaseIndent();
                        out.writeln("var ", varitervalue, "=", variterset, "[", variterindex, "];");
                    } else /* if (inKeyWord == "in") */{
                        out.writeln("for (var ", variterindex, " in ", variterset, ") {");
                        out.increaseIndent();
                        out.writeln("if (", variterset, ".hasOwnProperty(", variterindex, ") && !this.$json.isMetadata(", variterindex, ")) {");
                        out.increaseIndent();
                        out.writeln("var ", varitervalue, "=", variterset, "[", variterindex, "];");
                    }
                    out.writeln(variterct, "++;");
                    out.processContent(statement.content);
                    if (inKeyWord != "inSortedView" && inKeyWord != "inArray") {
                        out.decreaseIndent();
                        out.writeln("}");
                    }
                    out.decreaseIndent();
                    out.writeln("}");
                }
            },
            "repeater" : {
                inMacro : true,
                container : false,
                process : function (out, statement) {
                    var param = statement.paramBlock;
                    if (out.debug) {
                        param = out.wrapExpression(param, statement, "this.EXCEPTION_IN_REPEATER_PARAMETER");
                    }
                    out.addDependency("aria.templates.Repeater"); // dependency on the Repeater object
                    out.writeln("this.__$statementRepeater(", statement.lineNumber, ",(", param, "));");
                }
            },
            "macro" : {
                inMacro : false,
                container : true,
                // Syntax: macro macroname ( macroparam1, macroparam2 ... )
                paramRegexp : /^([_\w]+)\s*(\(\s*([_\w]+\s*(,\s*[_\w]+\s*)*)?\))\s*$/,
                process : function (out, statement, param) {
                    var macroname = param[1];
                    var definedMacro = out.getMacro(macroname);
                    if (definedMacro.definition != null) {
                        return out.logError(statement, statementsSingleton.MACRO_ALREADY_DEFINED, [macroname,
                                definedMacro.definition.lineNumber]);
                    }
                    definedMacro.definition = statement;
                    out.enterBlock("prototype");
                    out.writeln("macro_", macroname, ": function ", param[2], "{");
                    out.increaseIndent();
                    out.writeln("try {");
                    out.increaseIndent();
                    out.writeln("with (this) {");
                    out.increaseIndent();
                    out.processContent(statement.content);
                    out.decreaseIndent();
                    out.writeln("}");
                    out.decreaseIndent();
                    out.writeln("} catch (_ex) {");
                    out.increaseIndent();
                    out.writeln("this.$logError(this.EXCEPTION_IN_MACRO,[", out.stringify(macroname), ", this['"
                            + Aria.FRAMEWORK_PREFIX + "currentLineNumber']],_ex);");
                    out.decreaseIndent();
                    out.writeln("}");
                    out.decreaseIndent();
                    out.writeln("},");
                    out.leaveBlock();
                }
            },
            "memo" : {
                inMacro : true,
                container : true,
                // Syntax: macro macroname ( macroparam1, macroparam2 ... )
                paramRegexp : /^[\S\s]*$/,
                process : function (out, statement, param) {
                    out.processContent(statement.content);
                }
            },
            "call" : {
                inMacro : true,
                container : false,
                // Syntax: call macroname ( any params ... )
                // PTR 04231438: Regular expression must accept spaces at the end.
                paramRegexp : /^(\$?[_\w]+\.)?([_\w]+)\s*\(([\s\S]*)\)\s*$/,
                process : function (out, statement, param) {
                    var macroContainer = param[1]; // macro container (with the dot at the end)
                    var macroname = param[2];
                    var macroparams = param[3];
                    var macroRef;
                    var macroCall;
                    if (macroContainer) {
                        macroRef = "this." + macroContainer + "macro_" + macroname;
                        if (macroContainer.charAt(0) == "$") {
                            // call a macro from a parent template
                            macroCall = macroRef + ".apply(this,[" + macroparams + "]);";
                        } else {
                            macroCall = macroRef + "(" + macroparams + ");";
                        }
                    } else {
                        macroRef = "this.macro_" + macroname;
                        macroCall = macroRef + "(" + macroparams + ");";
                    }
                    if (out.debug) {
                        var macroDisplay = macroContainer ? macroContainer + macroname : macroname;
                        out.writeln("if (", macroRef, " == null) {");
                        out.increaseIndent();
                        out.writeln('this.$logError(this.MACRO_NOT_FOUND,[', statement.lineNumber, ',', out.stringify(macroDisplay), ']);');
                        out.decreaseIndent();
                        out.writeln("}");
                    }
                    out.writeln(macroCall);
                }
            },
            "section" : {
                inMacro : true,
                container : null, /* may be used either as a container or not */
                process : function (out, statement) {
                    var sectionParam = statement.paramBlock;
                    var container = (statement.content ? "true" : "false");
                    out.writeln("this.__$beginSection(", statement.lineNumber, ",", container, ",", sectionParam, ");");
                    if (statement.content) {
                        // in case it is used as a container
                        out.processContent(statement.content);
                    }
                    out.writeln("this.__$endSection();");
                }
            },
            "var" : {
                inMacro : undefined, /* may be in or out of a macro */
                container : false,
                paramRegexp : /^([_\w]+)\s*=([\s\S]*)$/,
                process : function (out, statement, param) {

                    var varname = param[1];
                    var value = param[2];
                    if (Aria.isJsReservedWord(varname)) {
                        return out.logError(statement, statementsSingleton.INCORRECT_VARIABLE_NAME, [varname]);
                    }
                    if (out.isOutputReady()) {
                        // in a macro
                        if (out.debug) {
                            value = out.wrapExpression(value, statement, "this.EXCEPTION_IN_VAR_EXPRESSION");
                        }
                        out.writeln("var ", varname, "=(", value, ");");
                    } else {
                        // out of a macro
                        out.enterBlock("globalVars");
                        if (out.debug) {
                            value = out.wrapExpression(value, statement, "this.EXCEPTION_IN_VAR_EXPRESSION");
                        }
                        out.writeln("this.", varname, "=(", value, ");");
                        out.leaveBlock();
                    }
                }
            },
            "set" : {
                inMacro : true,
                container : false,
                paramRegexp : /^([_\w]+(?:\.[_\w]+)*)\s*([\+\-]?\=)([\s\S]*)$/,
                process : function (out, statement, param) {
                    var varname = param[1];
                    var op = param[2];
                    var value = param[3];
                    var varnames = varname.split('.');
                    for (var i = 0, ii = varnames.length; i < ii; i++) {
                        if (Aria.isJsReservedWord(varnames[i])) {
                            return out.logError(statement, statementsSingleton.INCORRECT_VARIABLE_NAME, [varname]);
                        }
                    }
                    if (out.debug) {
                        value = out.wrapExpression(value, statement, "this.EXCEPTION_IN_SET_EXPRESSION");
                    }
                    out.writeln(varname, op, "(", value, ");");
                }
            },
            "checkDefault" : {
                inMacro : true,
                container : false,
                paramRegexp : /^([_\w]+)\s*\=([\s\S]*)$/,
                process : function (out, statement, param) {
                    var varname = param[1];
                    var value = param[2];
                    if (Aria.isJsReservedWord(varname)) {
                        return out.logError(statement, statementsSingleton.INCORRECT_VARIABLE_NAME, [varname]);
                    }
                    if (out.debug) {
                        value = out.wrapExpression(value, statement, "this.EXCEPTION_IN_CHECKDEFAULT_EXPRESSION");
                    }
                    out.writeln("if (", varname, "===undefined) {");
                    out.increaseIndent();
                    out.writeln(varname, "=(", value, ");");
                    out.decreaseIndent();
                    out.writeln("}");
                }
            },
            "@" : {
                inMacro : true,
                container : null, /* may be a container or not depending on the control */
                process : function (out, statement) {
                    var parsename = /^@(\w+):(\w+)$/.exec(statement.name);
                    if (!parsename || parsename.length != 3) {
                        return out.logError(statement, statementsSingleton.INVALID_WIDGET_SYNTAX);
                    }
                    var libName = parsename[1];
                    var widgetName = parsename[2];
                    var libclasspath = out.templateParam.$wlibs[libName];
                    if (libclasspath === undefined) {
                        return out.logError(statement, statementsSingleton.UNDECLARED_WIDGET_LIBRARY, [libName]);
                    }
                    var wlib = out.wlibs[libName];
                    if (!wlib) {
                        wlib = Aria.getClassRef(libclasspath);
                        if (!aria.utils.Type.isInstanceOf(wlib, "aria.widgetLibs.WidgetLib")) {
                            return out.logError(statement, statementsSingleton.INVALID_WIDGET_LIBRARY, [libName,
                                    libclasspath]);
                        }
                        out.wlibs[libName] = wlib;
                    }
                    var dep = wlib.getWidgetDependencies(widgetName, out.allDependencies);
                    if (!dep) {
                        return out.logError(statement, statementsSingleton.UNKNOWN_WIDGET, [statement.name]);
                    }
                    out.addDependencies(dep);
                    var param = statement.paramBlock;
                    if (param.length === 0) {
                        param = "undefined";
                    } else {
                        // Look for use of standard binding transforms
                        // and automatically add those to dependencies
                        var transformDependencies = [];
                        var regEx = /[\'\"](aria\.widgets\.transform\.(.+))[\'\"]/g;
                        var myMatch = regEx.exec(param);
                        while (myMatch) {
                            transformDependencies.push(myMatch[1]);
                            myMatch = regEx.exec(param);
                        }
                        out.addDependencies(transformDependencies);
                    }

                    if (out.debug && param != "undefined") {
                        param = out.wrapExpression(param, statement, "this.EXCEPTION_IN_CONTROL_PARAMETERS");
                    }

                    if (statement.content) {
                        // container widget
                        out.writeln("if (this.__$beginContainerWidget(", out.stringify(libclasspath), ",", out.stringify(widgetName), ",(", param, "),", statement.lineNumber, ")) {");
                        out.increaseIndent();
                        out.processContent(statement.content);
                        out.writeln("this.__$endContainerWidget();");
                        out.decreaseIndent();
                        out.writeln("}");
                    } else {
                        // simple widget
                        out.writeln("this.__$processWidgetMarkup(", out.stringify(libclasspath), ",", out.stringify(widgetName), ",(", param, "),", statement.lineNumber, ");");
                    }
                }
            }
        };
    }
});
