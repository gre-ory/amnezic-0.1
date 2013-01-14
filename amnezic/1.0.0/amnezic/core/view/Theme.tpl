{Template {
    $classpath: 'amnezic.core.view.Theme',
    $hasScript: true
}}
    
    {macro main()}

        {section {
            id: 'theme_section',
            bindRefreshTo: [ 
                { to: 'theme', inside: data, recursive: true }
            ]
	    }}
            
            <div class="row-fluid pagination-centered">
                <div class="well offset1 span10">
                    <span>
                        Title
                    </span>
                    {if data.theme}
                        {@aria:TextField {
                            sclass: 'simple',
                            bind: { value: { to: 'title', inside: data.theme } }
                        }/}
                    {/if}
                </div>
            </div>
            
            <div class="row-fluid">
            
                <div class="search well offset1 span5">
                    <table class="theme table table-condensed">
                        
                        <thead>
                            
                            <th colspan="4">
                                Questions
                                
                                <span class="btn" title="Add" {on click { fn: add_questions, args: data.theme }/}>
                                    <i class="icon-plus"></i>
                                </span>
                                
                            </th>
                            
                        </head>
                        
                        <tbody>
                            
                            {if data.theme && data.theme.questions}
                                {foreach question inArray data.theme.questions}
                                    
                                    <tr>
                                        
                                        <td class="album" rowspan="3">
                                            {if question.img}
                                                <img src="${question.img}" width="50px"/>
                                            {/if}
                                        </td>
                                        
                                        <td>
                                            Answer
                                        </td>
                                            
                                        <td>
                                            {@aria:TextField {
                                                sclass: 'simple',
                                                bind: { value: { to: 'answer', inside: question } }
                                            }/}
                                        </td>
                                        
                                    </tr>
                                    
                                    <tr>
                                        
                                        <td>
                                            Hint
                                        </td>
                                            
                                        <td>
                                            {@aria:TextField {
                                                sclass: 'simple',
                                                bind: { value: { to: 'hint', inside: question } }
                                            }/}
                                        </td>
                                        
                                    </tr>
                                    
                                    <tr>
                                        
                                        <td colspan="2">
                                            
                                            <span class="btn" title="Switch answer and hint" {on click { fn: switch_answer_and_hint, args: question }/}>
                                                <i class="icon-refresh"></i>
                                            </span>
                                            
                                        </td>
                                        
                                    </tr>
                                    
                                {/foreach}
                            {/if}
                    
                        </tbody>
                    </table>
                </div>
                
            </div>
            
            {var eol = '<br/>' /}
            {var tab = '&nbsp;&nbsp;&nbsp;&nbsp;' /}
            {var left_square_bracket = '&#91;' /}
            {var right_square_bracket = '&#93;' /}
            {var left_curly_bracket = '&#123;' /}
            {var right_curly_bracket = '&#125;' /}
            
            <div class="row-fluid">
                <div class="raw offset1 span10">
                    <pre>
                        ${left_curly_bracket}${eol}
                        {if data.theme}
                            ${tab}title: '${data.theme.title}',${eol}
                            ${tab}active: ${data.theme.active},${eol}
                        {/if}
                        ${tab}questions: ${left_square_bracket}${eol}
                        
                        {if data.theme && data.theme.questions}
                            {foreach question inArray data.theme.questions}
                                
                                ${tab}${tab}${left_curly_bracket}${eol}
                                
                                {if question.answer}
                                    ${tab}${tab}${tab}answer: '${question.answer}',${eol}
                                {/if}
                                {if question.hint}
                                    ${tab}${tab}${tab}hint: '${question.hint}',${eol}
                                {/if}
                                {if question.img}
                                    ${tab}${tab}${tab}img: '${question.img}',${eol}
                                {/if}
                                {if question.mp3}
                                    ${tab}${tab}${tab}mp3: '${question.mp3}',${eol}
                                {/if}                                                                                                
                                
                                ${tab}${tab}${right_curly_bracket},${eol}
                                
                            {/foreach}
                        {/if}
     
                        ${tab}${right_square_bracket}${eol}
                        ${right_curly_bracket}
                    </pre>
                </div>
            </div>
            
            <div class="row-fluid">
                <a href="#users" class="btn pull-left" title="Previous">
                    <i class="icon-chevron-left"></i>
                </a>
                <a href="#settings" class="btn pull-right" title="Next">
                    <i class="icon-chevron-right"></i>
                </a>
            </div>
            
            <!-- ************************************************** -->
            <!-- modal search                                       -->
            <!-- ************************************************** -->
            
            <div id="search" class="search modal hide fade in" style="display: none;">
            </div>
        
        {/section}
    
    {/macro}

{/Template}
// JavaScript Document
