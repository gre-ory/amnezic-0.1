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
                            <th class="nb_musics">Nb. questions</th>
                            <th class="actions"></th>
                            
                        </head>
                        
                        <tbody>
                            
                            {var count = 0/}
                            {if data.themes}
                                {foreach theme inArray data.themes}
                                    {if !theme.deleted}
                                        <tr>
                                            
                                            <td class="title">
                                                ${theme.title|empty:''}
                                            </td>
                                                
                                            <td class="active">
                                                {if theme.active}
                                                    <span class="btn btn-success" title="Used" {on click { fn:deactivate, args: theme }/}>
                                                        <i class="icon-ok"></i>
                                                    </span>
                                                {else/}
                                                    <span class="btn" title="Not used" {on click { fn:activate, args: theme }/}>
                                                        <i class="icon-ban-circle"></i>
                                                    </span>
                                                {/if}
                                            </td>
                                            
                                            <td class="nb_questions">
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
                            {/if}
                    
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
