{Template {
    $classpath: 'amnezic.core.view.Settings',
    $hasScript: false
}}
        
    {macro main()}
    
        {section {
            id: 'settings_section',
            bindRefreshTo: [ 
                { to: 'settings', inside: data, recursive: true }
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
                    
                    <div>
                    
                        {@html:Element {
                            tagName: 'input',
                            attributes: {
                                type: 'range',
                                value: '50',
                                min: '10',
                                max: '100',
                                step: '10'
                            },
                            bind: { value: { to: 'nb_questions', inside: data.settings } }
                        }/}
                    
                    </div>
                    
                    <div>
                    
                        {@html:Element {
                            tagName: 'input',
                            attributes: {
                                type: 'range',
                                value: '50',
                                min: '10',
                                max: '100',
                                step: '10'
                            },
                            bind: { value: { to: 'nb_questions', inside: data.settings } }
                        }}
                            [inside]
                        {/@html:Element}
                    
                    </div>
                    
                    <div>
                    
                        {@html:Input {
                            bind: { value: { to: 'nb_questions', inside: data.settings } }
                        }/}
                    
                    </div>
                    
                    <div>
                    
                        {@html:Input {
                            attributes: {
                                class: 'input-xxlarge'
                            },
                            bind: { value: { to: 'nb_questions', inside: data.settings } }
                        }/}
                    
                    </div>
                    
                    <div>
                    
                        {@html:Input {
                            attributes: {
                                class_list: [ 'input-xxlarge', 'toto' ]
                            },
                            bind: { value: { to: 'nb_questions', inside: data.settings } }
                        }/}
                    
                    </div>
                    
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
