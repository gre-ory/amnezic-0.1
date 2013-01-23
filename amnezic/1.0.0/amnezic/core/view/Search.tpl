{Template {
    $classpath: 'amnezic.core.view.Search',
    $hasScript: true
}}
    
    {macro main()}
        
        <div class="search">
        
            <!-- ************************************************** -->
            <!-- modal-header                                       -->
            <!-- ************************************************** -->
            
            <div class="request modal-header">
                  
                <a class="close" data-dismiss="modal">x</a>  
                
                <span class="input-append">
                
                    {@aria:TextField {
                        sclass: 'simple',
                        bind: { value: { to: 'request', inside: data.search } }
                    }/}
                    
                    <span class="add-on btn" title="Search" {on click { fn: search }/}>
                        <i class="icon-search"></i>
                    </span>
                
                </span>
                  
            </div>
        
            <!-- ************************************************** -->
            <!-- modal-body                                         -->
            <!-- ************************************************** -->
        
            <div class="response modal-body">
            
                {section {
                    id: 'results_section',
                    bindRefreshTo: [ 
                        { to: 'search', inside: data, recursive: true }
                    ]
        	    }}            
            
                    {if data.search && data.search.response && data.search.response.questions}
                        {foreach question inArray data.search.response.questions}
                            
                            <div class="result row-fluid">
                                
                                <div class="action span2">
                                    {if question.selected}
                                        <span class="btn selected btn-success" title="Unselect" {on click { fn: unselect, args: question }/}>
                                            <i class="icon-ok"></i>
                                        </span>
                                    {else/}
                                        <span class="btn unselected" title="Select" {on click { fn: select, args: question }/}>
                                            <i class="icon-ban-circle"></i>
                                        </span>
                                    {/if}
                                </div>
                                
                                <div class="cover span2">
                                    {if question.img}
                                        <img src="${question.img}"/>
                                    {/if}
                                </div>
                                
                                <div class="music span6">
                                    
                                    <div class="row-fluid">
                                        
                                        <div class="artist span12">
                                            ${question.answer|empty:''}
                                        </div>
                                        
                                        <div class="title offset1 span11">
                                            <i>${question.hint|empty:''}</i>
                                        </div>
                                        
                                    </div>
                                
                                </div>
                                
                                <div class="action span2">
                                    
                                    <span class="btn play" title="Play" {on click { fn: play, args: question }/}>
                                        <i class="icon-play"></i>
                                    </span>
                                    
                                </div>
                                
                            </div>
                            
                        {/foreach}
                    {/if}
                
                {/section}
            
            </div>

            <!-- ************************************************** -->
            <!-- modal-footer                                       -->
            <!-- ************************************************** -->
        
            <div class="modal-footer">  
                <span href="#" class="btn btn-success" {on click { fn: add_selected }/}>Add selected</span>  
                <span href="#" class="btn" data-dismiss="modal">Cancel</span>  
            </div>
    
        </div>
    
    {/macro}

{/Template}
