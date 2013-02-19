{Template {
    $classpath: 'amnezic.core.view.End',
    $hasScript: true
}}
        
    {macro main()}
    
        {section {
            id: 'end_section',
            bindRefreshTo: [ 
                { to: 'end', inside: data, recursive: true }
            ]
	    }}
        
            <div class="row-fluid">
                
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    <a href="#score" class="btn" title="Previous">
                        <i class="icon-chevron-left"></i>
                    </a>
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                <div class="span10 pagination-centered">
                    <a href="#" class="btn">New game</a>
                </div>
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <!-- none -->
            
            </div>
        
        {/section}
            
        <div id="confetti"></div>
    
    {/macro}

{/Template}
