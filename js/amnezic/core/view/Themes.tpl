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
                            
                            <th class="oid">Id</th>
                            <th class="title">Title</th>
                            <th class="active">Active</th>
                            <th class="nb">Nb.</th>
                            
                        </head>
                        
                        <tbody>
                            
                            {var nb = 0/}
                            {if data.themes}
                                {foreach theme inArray data.themes}
                                    {if !theme.deleted}
                                    
                                        {if theme.active === true}
                                            {set nb = nb + theme.nb/}
                                        {/if}
                                        
                                        <tr>
                                            
                                            <td class="oid">
                                                ${theme.oid|empty:''}
                                            </td>
                                            
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
                                                ${theme.nb}
                                            </td>
                                            
                                        </tr>
                                    {/if}
                                {/foreach}
                            {/if}
                            
                            <tr class="total">
                                
                                <td class="oid">
                                </td>
                                
                                <td class="title">
                                    Total
                                </td>
                                
                                <td class="active">
                                </td>
                                
                                <td class="nb">
                                    ${nb}
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
