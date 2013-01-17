{Template {
    $classpath: 'amnezic.core.view.Start',
    $hasScript: false
}}

    {macro main()}
        
        {section {
            id: 'start_section',
            bindRefreshTo: [ 
                { to: 'start', inside: data, recursive: true }
            ]
	    }}
        
            <div class="row-fluid">
                
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#themes" class="btn" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="span10 pagination-centered">
                    <span class="btn disabled">Loading setting...</span>
                </div>
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#start" class="btn" title="Next">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            
            </div>
        
        {/section}
        
        
        <div class="row-fluid pagination-centered">
            <a href="#question" class="btn">Start</a>
        </div>
            
        <div class="row-fluid">
            <a href="#settings" class="btn pull-left" title="Previous">
                <i class="icon-chevron-left"></i>
            </a>
            <a href="#question" class="btn pull-right" title="Next">
                <i class="icon-chevron-right"></i>
            </a>
        </div>

    {/macro}

{/Template}
