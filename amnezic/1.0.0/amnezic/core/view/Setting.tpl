{Template {
    $classpath: 'amnezic.core.view.Setting',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'setting',
	       bindRefreshTo: [ { inside: data, to: "setting", recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                setting...
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}