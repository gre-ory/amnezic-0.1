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
            
             {if data && data.theme && data.theme.raw}
                {call raw()/}
             {else/}
                {call display()/}
             {/if}
            
        {/section}
        
    {/macro}
    
    {macro display()}

        <div class="row-fluid">
            
            <!-- ************************************************** -->
            <!--  previous                                          -->
            <!-- ************************************************** -->
            
            <div class="span1 pagination-centered">
                <a href="#themes" class="btn" title="Back">
                    <i class="icon-chevron-left"></i>
                </a>
            </div>
            
            <!-- ************************************************** -->
            <!--  content                                           -->
            <!-- ************************************************** -->
            
            <div class="span10 pagination-centered">
        
                <!-- 
                <div class="row-fluid pagination-centered">
                    <div class="well offset1 span10">
                        <span>
                            Title
                        </span>
                        {if data && data.theme && data.theme.title}
                            {@aria:TextField {
                                sclass: 'simple',
                                bind: { value: { to: 'title', inside: data.theme } }
                            }/}
                        {/if}
                    </div>
                </div>
                -->
                
                {var index = 0 /}
                
                <table class="table questions">
                    
                    <thead>
                        
                        <th colspan="4">
                            Questions
                        </th>
                        
                    </head>
                    
                    <tbody>
                        
                        {if data.theme && data.theme.questions}
                            {foreach question inArray data.theme.questions}
                                
                                <tr>
                                    
                                    <td class="album" rowspan="2" style="vertical-align: middle; text-align: center;">
                                        {if question.img}
                                            <img src="${question.img}" style="width: 75px;"/>
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
                                    
                                    <td class="actions" rowspan="2" style="vertical-align: middle;">
                                        
                                        <span class="btn" title="Play">
                                            <i class="icon-play"></i>
                                        </span>
                                        
                                        <span class="btn" title="Switch answer and hint" {on click { fn: switch_answer_and_hint, args: question }/}>
                                            <i class="icon-refresh"></i>
                                        </span>
                                        
                                        <span class="btn" title="Delete" {on click { fn: remove_question_at, args: index }/}>
                                            <i class="icon-trash"></i>
                                        </span>
                                        
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
                                
                                {set index = index + 1 /}
                                
                            {/foreach}
                        {/if}
                        
                        <tr>
                            <td class="toolbar" colspan="4">
                                
                                <span class="btn" title="Add" {on click { fn: add_questions }/}>
                                    <i class="icon-plus"></i>
                                </span>

                                <span class="btn" title="Raw" {on click { fn: show_raw }/}>
                                    <i class="icon-file"></i>
                                </span>
                                
                            </td>
                        </tr>
                
                    </tbody>
                </table>
            </div>
            
        </div>
        
        <!-- ************************************************** -->
        <!-- modal search                                       -->
        <!-- ************************************************** -->
        
        <div id="search" class="search modal hide fade in" style="display: none;">
        </div>
        
    {/macro}
        
    {macro raw()}
        
        {var eol = '<br/>' /}
        {var tab = '&nbsp;&nbsp;&nbsp;&nbsp;' /}
        {var left_square_bracket = '&#91;' /}
        {var right_square_bracket = '&#93;' /}
        {var left_curly_bracket = '&#123;' /}
        {var right_curly_bracket = '&#125;' /}        
        
        <div class="row-fluid">
        
            <!-- ************************************************** -->
            <!--  previous                                          -->
            <!-- ************************************************** -->
            
            <div class="span1 pagination-centered">
                <span class="btn" title="Back" {on click { fn: hide_raw }/}>
                    <i class="icon-chevron-left"></i>
                </span>
            </div>        
            
            <!-- ************************************************** -->
            <!--  content                                           -->
            <!-- ************************************************** -->

            <div class="raw span10">
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
            
    {/macro}

{/Template}
