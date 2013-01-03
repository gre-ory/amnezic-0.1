{Template {
    $classpath: 'amnezic.core.view.Start',
    $hasScript: true
}}

    {macro main()}
        
        {section {
            id: 'start',
            bindRefreshTo: [ { to: 'initialized', inside: data, recursive: false } ]
	    }}
            
            <div class="row-fluid pagination-centered">
                {if data.initialized}
                    <a href="#setting" class="btn">Start</a>
                {else/}
                    <span class="btn disabled">Loading game...</span>
                {/if}
            </div>

        {/section}

    {/macro}

{/Template}
