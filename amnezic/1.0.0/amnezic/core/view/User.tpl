{Template {
    $classpath: 'amnezic.core.view.User',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'user',
	       bindRefreshTo: [ { inside: data, to: "args", recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                <div class="form-horizontal offset3 span6">
                    <div class="control-group">
                        <label class="control-label" for="user_name">Name</label>
                        <div class="controls">
                            <input type="text" id="user_name" placeholder="Name" value="Player ${data.args[0]}">
                        </div>
                    </div>
                    <div class="control-group">
                        <label class="control-label" for="user_active">Active</label>
                        <div class="controls">
                            <input type="checkbox" id="user_active">
                        </div>
                    </div>
                    <div class="control-group">
                        <div class="controls">
                            <button type="submit" class="btn">Modify</button>
                        </div>
                    </div>
                </div>
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}