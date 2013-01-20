{Template {
    $classpath: 'amnezic.core.view.Settings',
    $hasScript: true
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
                    
                    <div class="row-fluid">
                        
                        <div class="span1">
                            {section {
                                id: 'nb_section',
                                bindRefreshTo: [
                                    { to: 'nb', inside: this.data, recursive: true }
                                ]
                    	    }}
                                {if data && data.nb}
                                    ${data.nb}
                                {/if}    
                            {/section}
                        </div>
                        
                        <div class="span1">
                            {@html:element {
                                tag: 'span',
                                class: 'btn',
                                title: 'Increment',
                                on: {
                                    click: {
                                        fn: increment
                                    }
                                }
                            }}
                                <i class="icon-plus"></i>
                            {/@html:element}
                        </div>
                        
                        <div class="span1">
                            {@html:element {
                                tag: 'span',
                                class: 'btn',
                                title: 'Decrement',
                                on: {
                                    click: {
                                        fn: decrement
                                    }
                                }
                            }}
                                <i class="icon-minus"></i>
                            {/@html:element}
                        </div>
                        
                        <div class="span4">
                            {@html:input {
                                bind: {
                                    value: {
                                        to: 'nb',
                                        inside: this.data,
                                        transform: {
                                            from_widget: parseInt
                                        }
                                    }
                                }
                            }/}
                        </div>
                        
                        <div class="span4">
                            {@html:element {
                                tag: 'input',
                                type: 'range',
                                min: '2',
                                max: '20',
                                step: '1',
                                bind: {
                                    value: {
                                        to: 'nb',
                                        inside: this.data,
                                        transform: {
                                            from_widget: parseInt
                                        }
                                    }
                                }
                            }/}
                        </div>
                    
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
