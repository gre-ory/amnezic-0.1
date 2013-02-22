{Template {
    $classpath: 'amnezic.core.view.Cards',
    $hasScript: true,
    $css : [ 'amnezic.core.view.CardStyle' ]
}}
    
    {macro main()}
        
        <div class="cards">
        
            <!-- ************************************************** -->
            <!-- modal-header                                       -->
            <!-- ************************************************** -->
            
            <div class="modal-header">
                  
                <a class="close" data-dismiss="modal">x</a>  
                
                <span>
                    Cards
                </span>
                  
            </div>
            
            <!-- ************************************************** -->
            <!-- modal-body                                         -->
            <!-- ************************************************** -->
            
            <div class="modal-body">
                
                <div class="card spade selectable" {on click { fn: update_card, args: 'spade' }/}></div>
                <div class="card heart selectable" {on click { fn: update_card, args: 'heart' }/}></div>
                <div class="card club selectable" {on click { fn: update_card, args: 'club' }/}></div>
                <div class="card diamond selectable" {on click { fn: update_card, args: 'diamond' }/}></div>
                            
            </div>
            
        </div>
    
    {/macro}

{/Template}
