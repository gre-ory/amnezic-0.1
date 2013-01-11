{Template {
    $classpath: 'amnezic.core.view.Themes',
    $hasScript: true
}}
    
    {macro main()}

        {section {
            id: 'themes_section',
            bindRefreshTo: [ 
                { to: 'themes', inside: data, recursive: true }
            ]
	    }}
            <div class="row-fluid">
                <table class="themes table table-condensed offset2 span8">
                    
                    <thead>
                        
                        <th class="name">Name</th>
                        <th class="active">Active</th>
                        <th class="nb_questions">Nb. questions</th>
                        <th class="actions"></th>
                        
                    </head>
                    
                    <tbody>
                        
                        {var count = 0/}
                        {foreach theme inArray data.themes}
                            {if !theme.deleted}
                                {if theme.active}
                                    {set count = count + theme.questions.length/}
                                {/if}
                                <tr>
                                    
                                    <td class="name">
                                        ${theme.name}
                                    </td>
                                        
                                    <td class="active">
                                        {if theme.active}
                                            <span class="btn btn-success" title="Active" {on click { fn:deactivate, args: theme }/}>
                                                <i class="icon-off"></i>
                                            </span>
                                        {else/}
                                            <span class="btn" title="Inactive" {on click { fn:activate, args: theme }/}>
                                                <i class="icon-off"></i>
                                            </span>
                                        {/if}
                                    </td>
                                    
                                    <td class="nb_questions">
                                        ${theme.questions.length}
                                    </td>
                                    
                                    <td class="actions">
                                        <span class="btn-group">
                                            {if data.admin}
                                                <a href="#theme-${theme.id}" class="btn" title="Edit">
                                                    <i class="icon-pencil"></i>
                                                </a>
                                            {/if}
                                        </span>
                                    </td>
                                    
                                </tr>
                            {/if}
                        {/foreach}
                
                        <tr class="total">
                                    
                            <td class="name">
                                Total
                            </td>
                                
                            <td class="active">
                            </td>
                            
                            <td class="nb_questions">
                                ${count}
                            </td>
                            
                            <td class="actions">
                            </td>
                            
                        </tr>
                
                    </tbody>
                </table>
            
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
