{Template {
    $classpath: 'amnezic.core.view.Users',
    $hasScript: true
}}
    
    {macro main()}

        {section {
            id: 'users',
            bindRefreshTo: [ 
                { to: 'users', inside: data, recursive: true }
            ]
	    }}
            <div class="row-fluid">
                <table class="table offset2 span8 table-condensed">
                    
                    <thead>
                        
                        <th>Name</th>
                        <th>Active</th>
                        <th>Score</th>
                        <th></th>
                        
                    </head>
                    
                    <tbody>
                
                        {foreach user inArray data.users}
                            {if !user.deleted}
                                <tr>
                                    
                                    <td>
                                        ${user.name}
                                    </td>
                                    
                                    <td class="pagination-centered">
                                        {if user.active}
                                            <span class="btn btn-success" title="Active" {on click { fn:deactivate, args: [ user ] }/}>
                                                <i class="icon-ok"></i>
                                            </span>
                                        {else/}
                                            <span class="btn btn-danger" title="Inactive" {on click { fn:activate, args: [ user ] }/}>
                                                <i class="icon-remove"></i>
                                            </span>
                                        {/if}
                                    </td>
                                    
                                    <td>
                                        ${user.score}
                                    </td>
                                    
                                    <td class="pagination-centered">
                                        <span class="btn-group">
                                            <a class="btn" href="#user-${user.number}" title="Edit">
                                                <i class="icon-pencil"></i>
                                            </a>
                                            <span class="btn" title="Delete" {on click { fn:remove, args: [ user ] }/}>
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
                
                <!-- a href="#user-${data.users.length+1}" -->
                <span class="btn offset2" title="Add" {on click { fn : add } /}>
                    <i class="icon-plus"></i>
                </span>
                
            </div>
        
        {/section}
    
    {/macro}

{/Template}
