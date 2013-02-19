{Template {
    $classpath: 'amnezic.core.view.Score',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
            id: 'score_section',
            bindRefreshTo: [ 
                { to: 'score', inside: data, recursive: true }
            ]
	    }}
        
            <div class="row-fluid">
                
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#question" class="btn" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="span10 pagination-centered">
                    <span class="btn disabled">Loading score...</span>
                </div>
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#end" class="btn" title="Next">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            
            </div>
        
        {/section}
    
    {/macro}

{/Template}
