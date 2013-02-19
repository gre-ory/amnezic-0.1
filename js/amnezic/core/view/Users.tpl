{Template {
    $classpath: 'amnezic.core.view.Users',
    $hasScript: true,
    $css : [ 'amnezic.core.view.CardStyle' ]
}}
    
    {macro main()}

        {section {
            id: 'users_section',
            bindRefreshTo: [ 
                { to: 'users', inside: data, recursive: true }
            ]
	    }}
        
            <div class="row-fluid">
            
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <!-- none -->
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="offset1 span10 pagination-centered">
                
                    <table class="table users">
                        
                        <thead>
                            
                            <th>Card</th>
                            <th class="name">Name</th>
                            <th class="active">Active</th>
                            <th class="score">Score</th>
                            <th class="actions"></th>
                            
                        </head>
                        
                        <tbody>
                    
                            {if data.users}
                                {foreach user inArray data.users}
                                    {if !user.deleted}
                                        <tr>
                                            
                                            <td>
                                                <div class="card mini ${user.card}" {on click { fn: select_card, args: user }/}></div>
                                            </td>
                                            
                                            <td class="name">
                                                {@aria:TextField {
                                                    sclass: 'simple',
                                                    bind: { value: { to: 'name', inside: user } }
                                                }/}
                                            </td>
                                            
                                            <td class="active">
                                                {if user.active}
                                                    <span class="btn btn-success" title="Playing" {on click { fn:deactivate, args: user }/}>
                                                        <i class="icon-ok"></i>
                                                    </span>
                                                {else/}
                                                    <span class="btn" title="Not playing" {on click { fn:activate, args: user }/}>
                                                        <i class="icon-ban-circle"></i>
                                                    </span>
                                                {/if}
                                            </td>
                                            
                                            <td class="score">
                                                ${user.score}
                                            </td>
                                            
                                            <td class="actions">
                                                <span class="btn-group">
                                                    <span class="btn" title="Delete" {on click { fn:remove, args: user }/}>
                                                        <i class="icon-trash"></i>
                                                    </span>
                                                </span>
                                            </td>
                                            
                                        </tr>
                                    {/if}
                                {/foreach}
                            {/if}
                            
                            <tr>
                                <td class="toolbar" colspan="4">
                                    <span class="btn" title="Add" {on click { fn : add } /}>
                                        <i class="icon-plus"></i>
                                    </span>
                                </td>
                            </tr>
                            
                        </tbody>
                    </table>
                    
                </div>
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#themes" class="btn" title="Next">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            
            </div>
        
        {/section}
        
        <!-- ************************************************** -->
        <!-- modal select_card                                  -->
        <!-- ************************************************** -->
        
        <div id="select_card" class="select_card modal hide fade in" style="display: none;">
        </div>
    
    {/macro}

{/Template}
