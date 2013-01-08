{Template {
    $classpath: 'amnezic.core.view.Settings',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'setting',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: false } ]
	    }}
        
            <div class="row-fluid">
	
                <div class="row-fluid pagination-centered">
                    <span class="btn disabled">Loading setting...</span>
                </div>
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
