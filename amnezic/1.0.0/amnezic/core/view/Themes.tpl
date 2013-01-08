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
                        
                    </head>
                    
                    <tbody>
                
                        {foreach theme inArray data.themes}
                            {if !theme.deleted}
                                <tr>
                                    
                                    <td class="name">
                                        ${theme.name}
                                    </td>
                                        
                                    <td class="active">
                                        {if theme.active}
                                            <span class="btn" title="Active" {on click { fn:deactivate, args: theme }/}>
                                                <i class="icon-ok"></i>
                                            </span>
                                        {else/}
                                            <span class="btn" title="Inactive" {on click { fn:activate, args: theme }/}>
                                                <i class="icon-remove"></i>
                                            </span>
                                        {/if}
                                    </td>
                                    
                                    <td class="nb_questions">
                                        ${theme.questions.length}
                                    </td>
                                    
                                </tr>
                            {/if}
                        {/foreach}
                
                    </tbody>
                </table>
            
            </div>
        
        {/section}
    
    {/macro}

{/Template}
