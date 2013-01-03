{Template {
    $classpath: 'amnezic.core.view.User',
    $hasScript: true
}}
        
    {macro main()}
        
        {var users = data.game && data.game.users ? data.game.users : [] /}
        {var number = data.section.args.length > 0 ? data.section.args[0] : undefined /}
        {var user = number && number <= users.length ? users[ number - 1 ] : undefined /}

        {if user}
            {call user( user )/}
        {/if}
    
    {/macro}
    
    {macro user( user )}
        
        {section {
            id: 'user',
            bindRefreshTo: [ 
                { to: 'name', inside: user, recursive: false },
                { to: 'active', inside: user, recursive: false },
                { to: 'score', inside: user, recursive: false }
            ]
	    }}
        
            <div class="row-fluid">
    	
                <div class="form-horizontal offset3 span6">
                    <div class="control-group">
                        <label class="control-label" for="user_name">Name</label>
                        <div class="controls">
                            {@aria:TextField { bind : { value : { to : 'name', inside : user } } }/}
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="user_active">Active</label>
                        <div class="controls">
                            {@aria:CheckBox { bind : { value : { to : 'active', inside : user } } }/}
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
                            <a href="#setting" class="btn" {on click { fn : update_user } /}>Modify</a>
                        </div>
                    </div>
                </div>
                
            </div>
        
        {/section}
        
    {/macro}

{/Template}
