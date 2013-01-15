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
                
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#users" class="btn" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="span10 pagination-centered">
                    
                    <table class="table themes">
                        
                        <thead>
                            
                            <th class="title">Title</th>
                            <th class="active">Active</th>
                            <th class="nb_questions">Nb. questions</th>
                            <th class="actions"></th>
                            
                        </head>
                        
                        <tbody>
                            
                            {var count = 0/}
                            {if data.themes}
                                {foreach theme inArray data.themes}
                                    {if !theme.deleted}
                                    
                                        {if theme.active === true && theme.questions}
                                            {set count = count + theme.questions.length/}
                                        {/if}
                                        
                                        <tr>
                                            
                                            <td class="title">
                                                ${theme.title|empty:''}
                                            </td>
                                                
                                            <td class="active">
                                                {if theme.active === true}
                                                    <span class="btn btn-success" title="Used" {on click { fn:deactivate, args: theme }/}>
                                                        <i class="icon-ok"></i>
                                                    </span>
                                                {elseif theme.active === false/}
                                                    <span class="btn" title="Not used" {on click { fn:activate, args: theme }/}>
                                                        <i class="icon-ban-circle"></i>
                                                    </span>
                                                {/if}
                                            </td>
                                            
                                            <td class="nb_questions">
                                                {if theme.questions}
                                                    ${theme.questions.length}
                                                {/if}
                                            </td>
                                            
                                            <td class="actions">
                                                <span class="btn-group">
                                                    {if data.admin}
                                                        <a href="#theme-${theme.id}" class="btn" title="Edit" {on click { fn:store_theme, args: theme }/}>
                                                            <i class="icon-pencil"></i>
                                                        </a>
                                                    {/if}
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    {/if}
                                {/foreach}
                            {/if}
                            
                            <tr class="total">
                                
                                <td class="title">
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
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#settings" class="btn" title="Next">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            
            </div>
        
        {/section}
    
    {/macro}

{/Template}
