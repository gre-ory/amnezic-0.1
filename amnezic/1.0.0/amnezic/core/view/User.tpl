{Template {
    $classpath: 'amnezic.core.view.User',
    $hasScript: true
}}
        
    {macro main()}
        
        {var number = data.section.args.length > 0 ? data.section.args[0] : undefined /}
        {var user = number && data.users && number <= data.users.length ? data.users[ number - 1 ] : undefined /}

        {if user}
        
            {section {
                id: 'user',
                bindRefreshTo: [ 
                    { to: 'active', inside: user, recursive: true }
                ]
    	    }}
        
                <div class="row-fluid">
        	
                    <div class="form-horizontal offset3 span6">
                        <div class="control-group">
                            <label class="control-label" for="user_name">Name</label>
                            <div class="controls">
                                {@aria:TextField { sclass: 'simple', bind: { value: { to: 'name', inside: user } } }/}
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="user_active">Active</label>
                            <div class="controls">
                                {if user.active}
                                    <span class="btn btn-success" title="Yes" {on click { fn:deactivate, args: [ user ] }/}>
                                        <i class="icon-ok"></i>
                                    </span>
                                {else/}
                                    <span class="btn btn-danger" title="No" {on click { fn:activate, args: [ user ] }/}>
                                        <i class="icon-remove"></i>
                                    </span>
                                {/if}
                            </div>
                        </div>
                        <div class="control-group">
                            <label class="control-label" for="user_active">Score</label>
                            <div class="controls">
                                ${user.score}
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="controls">
                                <a href="#users" class="btn">Back</a>
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            {/section}
        
        {else/}
            
            <div class="row-fluid pagination-centered">
                <div class="alert">
                    <strong>Warning!</strong> Undefined user.
                </div>
                <a href="#users" class="btn">Back</a>
            </div>
            
        
        {/if}
        
    {/macro}

{/Template}
