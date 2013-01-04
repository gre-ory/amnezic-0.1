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
        
            {foreach user inArray data.users}
                <div class="row-fluid">
                    
                    <span class="offset3 span2">
                        <a class="btn" href="#user-${user.number}">${user.name}</a>
                    </span>
                    
                    <span class="span1">
                        {if user.active}
                            <span class="btn btn-success" title="Active"><i class="icon-ok"></i></span>
                        {else/}
                            <span class="btn btn-danger" title="Inactive"><i class="icon-remove"></i></span>
                        {/if}
                    </span>
                    
                    <span class="span2">
                        <span class="btn-group">
                            <a class="btn" href="#user-${user.number}" title="Edit"><i class="icon-pencil"></i></a>
                            {if user.active}
                                <span class="btn" title="Deactivate"><i class="icon-off"></i></span>
                            {else/}
                                <span class="btn" title="Activate"><i class="icon-off"></i></span>
                            {/if}
                            <span class="btn" title="Delete"><i class="icon-remove"></i></span>
                        </span>
                    </span>
                    
                </div>
            {/foreach}
            <div class="row-fluid">
                <span class="btn offset3 span6" {on click { fn : add } /}><i class="icon-plus"></i> Add</span>
            </div>
        
        {/section}
    
    {/macro}

{/Template}
