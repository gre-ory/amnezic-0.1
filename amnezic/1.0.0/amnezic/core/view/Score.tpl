{Template {
    $classpath: 'amnezic.core.view.Score',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
	       id: 'score',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: false } ]
	    }}
        
            <div class="row-fluid pagination-centered">
                <span class="btn disabled">Loading score...</span>
            </div>
            
            <div class="row-fluid">
                <a href="#question" class="btn pull-left" title="Previous">
                    <i class="icon-chevron-left"></i>
                </a>
                <a href="#end" class="btn pull-right" title="Next">
                    <i class="icon-chevron-right"></i>
                </a>
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
