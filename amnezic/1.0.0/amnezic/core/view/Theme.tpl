{Template {
    $classpath: 'amnezic.core.view.Theme',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: "theme",
	       bindRefreshTo: [ { inside: data, to: "args", recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                Loading theme ${data.args[0]}...
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}