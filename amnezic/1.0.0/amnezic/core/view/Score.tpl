{Template {
    $classpath: 'amnezic.core.view.Score',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'score',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                <div class="row-fluid pagination-centered">
                    <span class="btn disabled">Loading score...</span>
                </div>
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
