{Template {
    $classpath: 'amnezic.core.view.Themes',
    $hasScript: true
}}
    
    {macro main()}

        {section {
            id: 'themes_section',
            bindRefreshTo: [ 
                { to: 'themes', inside: data, recursive: true },
                { to: 'nb_themes_loaded', inside: data, recursive: true }
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
                    
                    {var percent = 0 /}
                    {if data.themes && data.themes.length != 0 && data.nb_themes_loaded}
                        {set percent = ( 100 * data.nb_themes_loaded ) / data.themes.length /}
                    {/if}
                    
                    {if percent != 100}
                        
                        <div class="row-fluid">
                            <div class="offset3 span6">
                                <div class="progress progress-striped active">
                                    <div class="bar" style="width: ${percent}%;"></div>
                                </div>
                            </div>
                        </div>
                    
                    {else/}
                    
                        <table class="table themes">
                            
                            <thead>
                                
                                <th class="title">Title</th>
                                <th class="active">Active</th>
                                <th class="nb">Nb.</th>
                                <th class="actions"></th>
                                
                            </head>
                            
                            <tbody>
                                
                                {var count = 0/}
                                {if data.themes}
                                    {foreach theme inArray data.themes}
                                        {if !theme.deleted}
                                        
                                            {if theme.active === true && theme.items}
                                                {set count = count + theme.items.length/}
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
                                                
                                                <td class="nb">
                                                    {if theme.items}
                                                        ${theme.items.length}
                                                    {/if}
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
                                
                                <tr class="total">
                                    
                                    <td class="title">
                                        Total
                                    </td>
                                    
                                    <td class="active">
                                    </td>
                                    
                                    <td class="nb">
                                        ${count}
                                    </td>
                                    
                                    <td class="actions">
                                    </td>
                                    
                                </tr>
                        
                            </tbody>
                        </table>
                    
                    {/if}
                    
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
