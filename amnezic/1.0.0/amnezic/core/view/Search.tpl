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
        
            <table class="theme table table-condensed">
                
                <tbody>
                    
                    {if data.search && data.search.response && data.search.response.questions}
                        {foreach question inArray data.search.response.questions}
                            
                            <tr>
                                
                                <td class="album" rowspan="3" style="vertical-align: middle;">
                                    {if question.selected}
                                        <span class="btn btn-success" title="Unselect" {on click { fn: unselect, args: question }/}>
                                            <i class="icon-ok"></i>
                                        </span>
                                    {else/}
                                        <span class="btn" title="Select" {on click { fn: select, args: question }/}>
                                            <i class="icon-ban-circle"></i>
                                        </span>
                                    {/if}
                                </td>
                                
                                <td class="album" rowspan="3">
                                    {if question.img}
                                        <img src="${question.img}"/>
                                    {/if}
                                </td>
                                
                                <td>
                                    Answer
                                </td>
                                    
                                <td>
                                    ${question.answer|empty:''}
                                </td>
                                
                                <td rowspan="2">
                                </td>
                                
                            </tr>
                            
                            <tr>
                                
                                <td>
                                    Hint
                                </td>
                                    
                                <td>
                                    ${question.hint|empty:''}
                                </td>
                                
                            </tr>
                            
                            <tr>
                                
                                <td colspan="2">
                                    
                                    <span class="btn" title="Play" {on click { fn: play, args: question }/}>
                                        <i class="icon-play"></i>
                                    </span>
                                    
                                </td>
                                
                            </tr>
                            
                        {/foreach}
                    {/if}
            
                </tbody>
            </table>
            
            {/section}
        
        </div>
        
        <div class="modal-footer">  
            <span href="#" class="btn btn-success" {on click { fn: add_selected }/}>Add selected</span>  
            <span href="#" class="btn" data-dismiss="modal">Cancel</span>  
        </div>
    
    {/macro}

{/Template}
// JavaScript Document
