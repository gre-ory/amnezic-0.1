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
                
                <div class="span1">
                    <a href="#users" class="btn pull-left" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="well span10">
                    <table class="themes table table-condensed">
                        
                        <thead>
                            
                            <th class="title">Title</th>
                            <th class="active">Active</th>
                            <th class="nb_musics">Nb. musics</th>
                            <th class="actions"></th>
                            
                        </head>
                        
                        <tbody>
                            
                            {var count = 0/}
                            {if data.themes}
                                {foreach theme inArray data.themes}
                                    {if !theme.deleted}
                                        <tr>
                                            
                                            <td class="title">
                                                ${theme.title}
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
                                            
                                            <td class="nb_musics">
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
                
                <div class="span1">
                    <a href="#settings" class="btn pull-right" title="Next">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            
            </div>
        
        {/section}
    
    {/macro}

{/Template}
