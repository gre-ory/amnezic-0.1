{Template {
    $classpath: 'amnezic.core.view.End',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'end',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                <div class="row-fluid pagination-centered">
                    <span class="btn disabled">Loading end...</span>
                </div>
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
