{Template {
    $classpath: 'amnezic.core.view.Users',
    $hasScript: true
}}
    
    {macro main()}

        {section {
            id: 'users_section',
            bindRefreshTo: [ 
                { to: 'users', inside: data, recursive: true }
            ]
	    }}
            <div class="row-fluid">
                <table class="users table table-condensed offset2 span8">
                    
                    <thead>
                        
                        <th class="name">Name</th>
                        <th class="active">Active</th>
                        <th class="score">Score</th>
                        <th class="actions"></th>
                        
                    </head>
                    
                    <tbody>
                
                        {foreach user inArray data.users}
                            {if !user.deleted}
                                <tr>
                                    
                                    <td class="name">
                                        {@aria:TextField {
                                            sclass: 'simple',
                                            bind: { value: { to: 'name', inside: user } }
                                        }/}
                                    </td>
                                        
                                    <td class="active">
                                        {if user.active}
                                            <span class="btn" title="Playing" {on click { fn:deactivate, args: user }/}>
                                                <i class="icon-play"></i>
                                            </span>
                                        {else/}
                                            <span class="btn" title="Not playing" {on click { fn:activate, args: user }/}>
                                                <i class="icon-pause"></i>
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
                
                    </tbody>
                </table>
            
            </div>
            
            <div class="row-fluid">
                
                <span class="btn offset2" title="Add" {on click { fn : add } /}>
                    <i class="icon-plus"></i>
                </span>
                
            </div>
        
        {/section}
    
    {/macro}

{/Template}
