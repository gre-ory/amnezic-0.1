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
                <div class="well offset1 span10">Title</div>
            </div>
            
            <div class="row-fluid">
                
                <div class="search well offset1 span5">
                    [search]
                    
                    [${data.length}]
                    {if data.theme && data.theme.musics}
                        [${data.theme.musics.length}]
                    {/if}
                    
                </div>
            
                <div class="search well span5">
                    <table class="theme table table-condensed">
                        
                        <thead>
                            
                            <th class="album">Album</th>
                            <th class="title">Title</th>
                            <th class="hint">Hint</th>
                            <th class="music">Music</th>
                            
                        </head>
                        
                        <tbody>
                            
                            {if data.theme && data.theme.musics}
                                {foreach music inArray data.theme.musics}
                                    <tr>
                                        
                                        <td class="album">
                                            {if music.img}
                                                <!-- <img src="${music.img}"/> -->
                                            {/if}
                                        </td>
                                        
                                        <td class="title">
                                            ${music.title}
                                        </td>
                                            
                                        <td class="hint">
                                            ${music.hint}
                                        </td>
                                        
                                        <td class="nb_musics">
                                        </td>
                                        
                                        <td class="actions">
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
                        ${tab}musics: ${left_square_bracket}${eol}
                        
                        {if data.theme && data.theme.musics}
                            {foreach music inArray data.theme.musics}
                                
                                ${tab}${tab}${left_curly_bracket}${eol}
                                
                                {if music.title}
                                    ${tab}${tab}${tab}title: '${music.title}',${eol}
                                {/if}
                                {if music.hint}
                                    ${tab}${tab}${tab}hint: '${music.hint}',${eol}
                                {/if}
                                {if music.img}
                                    ${tab}${tab}${tab}img: '${music.img}',${eol}
                                {/if}
                                {if music.mp3}
                                    ${tab}${tab}${tab}mp3: '${music.mp3}',${eol}
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
        
        {/section}
    
    {/macro}

{/Template}
// JavaScript Document
