{Template {
    $classpath: 'amnezic.core.view.Settings',
    $hasScript: true
}}
        
    {macro main()}
        
        {section {
            id: 'settings_section',
            bindRefreshTo: [ 
                { to: 'settings', inside: data, recursive: false }
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
                
                <div class="span10">
                    
                    {if data.settings}
                    
                        <div class="form-horizontal">
                            
                            <div class="control-group">
                                <label class="control-label" for="inputEmail">Nb questions</label>
                                <div class="controls">
                                    
                                    {@html:element {
                                        tag: 'input',
                                        type: 'range',
                                        min: '10',
                                        max: '200',
                                        step: '10',
                                        bind: {
                                            value: {
                                                to: 'nb_questions',
                                                inside: this.data.settings,
                                                transform: {
                                                    from_widget: parseInt
                                                }
                                            }
                                        }
                                    }/}
                                    
                                    {section {
                                        id: 'nb_questions_section',
                                        bindRefreshTo: [ 
                                            { to: 'nb_questions', inside: data.settings }
                                        ]
                            	    }}
                                    
                                        {if data.settings.nb_questions}
                                            ${data.settings.nb_questions}
                                        {/if}
                                    
                                    {/section}
                                    
                                </div>
                            </div>
                        
                        </div>
                    
                    {/if}
                    
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
    
    {/macro}

{/Template}
