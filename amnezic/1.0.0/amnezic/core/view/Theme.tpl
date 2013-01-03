{Template {
    $classpath: 'amnezic.core.view.Theme',
    $hasScript: false
}}
        
    {macro main()}
        
        {var theme = data.section.args.length > 0 ? data.section.args[0] : undefined /}
        
        {section {
	       id: 'theme',
	       bindRefreshTo: [ { to: 'section', inside: data, recursive: true } ]
	    }}
        
            <div class="row-fluid">
	
                <div class="row-fluid pagination-centered">
                    <span class="btn disabled">Loading theme ${theme}...</span>
                </div>
            
            </div>
	
	    {/section}
    
    {/macro}

{/Template}
