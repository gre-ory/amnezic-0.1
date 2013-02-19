{Template {
    $classpath: 'amnezic.core.view.Start',
    $hasScript: true
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
                    <a href="#settings" class="btn" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="span10 pagination-centered">
                    <a href="#question-1" class="btn">Start</a>
                </div>
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <!-- none -->
            
            </div>
        
        {/section}

    {/macro}

{/Template}
