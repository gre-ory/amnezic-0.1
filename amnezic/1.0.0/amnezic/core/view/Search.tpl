{Template {
    $classpath: 'amnezic.core.view.Search',
    $hasScript: true
}}
    
    {macro main()}

        <div class="modal-header">  
            <a class="close" data-dismiss="modal">x</a>  
            
            <h3>
            
            <!-- Search -->
            
            <span class="input-append">
            
                {@aria:TextField {
                    sclass: 'simple',
                    bind: { value: { to: 'request', inside: data.search } }
                }/}
                
                <span class="add-on btn" title="Search" {on click { fn: search }/}>
                    <i class="icon-search"></i>
                </span>
            
            </span>
            
            </h3>
              
        </div>
        
        <div class="modal-body">
        
            {section {
                id: 'results_section',
                bindRefreshTo: [ 
                    { to: 'search', inside: data, recursive: true }
                ]
    	    }}            
        
                {if data.search && data.search.response && data.search.response.questions}
                    {foreach question inArray data.search.response.questions}
                        
                        <div class="row-fluid" style="margin-bottom: 5px;">
                            
                            <div class="span2 pagination-centered" rowspan="3" style="margin-top: 20px;">
                                {if question.selected}
                                    <span class="btn btn-success" title="Unselect" {on click { fn: unselect, args: question }/}>
                                        <i class="icon-ok"></i>
                                    </span>
                                {else/}
                                    <span class="btn" title="Select" {on click { fn: select, args: question }/}>
                                        <i class="icon-ban-circle"></i>
                                    </span>
                                {/if}
                            </div>
                            
                            <div class="span2">
                                {if question.img}
                                    <img src="${question.img}"/>
                                {/if}
                            </div>
                            
                            <div class="span6">
                                
                                <div class="row-fluid">
                                    
                                    <div class="span12">
                                        ${question.answer|empty:''}
                                    </div>
                                    
                                    <div class="offset1 span11">
                                        <i>${question.hint|empty:''}</i>
                                    </div>
                                    
                                </div>
                            
                            </div>
                            
                            <div class="span2 pagination-centered" style="margin-top: 20px;">
                                
                                <span class="btn" title="Play" {on click { fn: play, args: question }/}>
                                    <i class="icon-play"></i>
                                </span>
                                
                            </div>
                            
                        </div>
                        
                    {/foreach}
                {/if}
            
            {/section}
        
        </div>
        
        <div class="modal-footer">  
            <span href="#" class="btn btn-success" {on click { fn: add_selected }/}>Add selected</span>  
            <span href="#" class="btn" data-dismiss="modal">Cancel</span>  
        </div>
    
    {/macro}

{/Template}
// JavaScript Document
