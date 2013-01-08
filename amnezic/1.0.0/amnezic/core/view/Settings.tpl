{Template {
    $classpath: 'amnezic.core.view.Settings',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'setting',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: false } ]
	    }}
        
            <div class="row-fluid pagination-centered">
                <span class="btn disabled">Loading setting...</span>
            </div>
            
            <div class="row-fluid">
                <a href="#themes" class="btn pull-left" title="Previous">
                    <i class="icon-chevron-left"></i>
                </a>
                <a href="#start" class="btn pull-right" title="Next">
                    <i class="icon-chevron-right"></i>
                </a>
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
