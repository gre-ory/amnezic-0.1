{Template {
    $classpath: 'amnezic.core.view.End',
    $hasScript: true
}}
        
    {macro main()}
    
        <div class="row-fluid pagination-centered">
            <a href="#users" class="btn">New game</a>
            <a href="#users" class="btn" {on click { fn:clear_data }/}>Reset game</a>
        </div>
            
        <div class="row-fluid">
            <a href="#score" class="btn pull-left" title="Previous">
                <i class="icon-chevron-left"></i>
            </a>
            <span class="btn disabled pull-right" title="Next">
                <i class="icon-chevron-right"></i>
            </span>
        </div>
    
    {/macro}

{/Template}
