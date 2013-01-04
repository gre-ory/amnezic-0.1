{Template {
    $classpath: 'amnezic.core.view.User',
    $hasScript: true
}}
        
    {macro main()}
        
        {var number = data.section.args.length > 0 ? data.section.args[0] : undefined /}
        {var user = number && data.users && number <= data.users.length ? data.users[ number - 1 ] : undefined /}

        {if user}
        
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
                            {@aria:CheckBox { sclass: 'simple', bind: { value: { to: 'active', inside: user } } }/}
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
                            <a href="#users" class="btn">Update</a>
                            <a href="#users" class="btn">Cancel</a>
                        </div>
                    </div>
                </div>
                
            </div>
        
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
