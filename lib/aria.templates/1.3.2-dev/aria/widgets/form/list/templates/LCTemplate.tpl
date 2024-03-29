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
// Default template LCResourceHandler
{Template {
    $classpath : 'aria.widgets.form.list.templates.LCTemplate',
    $extends : 'aria.widgets.form.list.templates.ListTemplate'
}}
    
    {macro renderItem(item, itemIdx)}
        {var className = _getClassForItem(item)/}
        {var entry = item.object.entry/}
    
        <a href="#" class="${className}" _itemIdx="${itemIdx}" onclick="return false;">
            {if ! item.label}
                &nbsp;
            {elseif item.value.multiWordMatch/}
                ${item.label|escape|highlightfromnewword:entry}
            {else/}
                ${item.label|escape|starthighlight:entry}
            {/if}
        </a>
    {/macro}
    
{/Template}
