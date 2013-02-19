{Template {
    $classpath: 'amnezic.core.view.Confetti',
    $css : [ 'amnezic.core.view.ConfettiStyle' ]
}}

    {macro main()}
        
        {var debug = false/}
        {var gold = '#D4AF37'/}
        {var silver = '#E6E8FA'/}
        {var copper = '#B87333'/}
        {var nb_leaves = debug ? 10 : 300/}
        
        <div class="confetti">
        
            {for var i = 0; i < nb_leaves; i++}
                
                {set duration = ( 4 + Math.random() * ( 10 - 4 ) ) + 's'/}
                {set delay = ( Math.random() * ( 8 ) ) + 's'/}
                {set depth = Math.floor( Math.random() * ( 10 ) )/}
                
                {if debug}
                    {var style = ''/}
                    {set style = style + 'position: fixed;'/}
                    {set style = style + 'top: 50px;'/}
                    {set style = style + 'left: ' + ( i * 10 ) + '%;'/}
                    {set style = style + 'z-index: 1;'/}
                    {set style = style + '-webkit-animation-duration: 10s, 10s;'/}
                    {set style = style + '-webkit-animation-delay: 0s, 0s;'/}
                {else/}
                    {var style = ''/}
                    {set style = style + 'position: fixed;'/}
                    {set style = style + 'top: -20px;'/}
                    {set style = style + 'left: ' + ( Math.random() * 100 ) + '%;'/}
                    {set style = style + 'z-index: ' + depth + ';'/}
                    {set style = style + '-webkit-animation-duration: ' + duration + ', ' + duration + ';'/}
                    {set style = style + '-webkit-animation-delay: ' + delay + ', ' + delay + ';'/}
                {/if}
                
                <div class="confetto_container" style="${style}">
                    
                    {if debug}
                        {var color = 'silver'/}
                        {var percent = ( 100 )/}
                        {var css_class = 'clockwise'/}
                    {else/}
                        
                        {var color = '#' + Math.floor( Math.random() * 16777215 ).toString( 16 )/}
                        // { // var color = Math.random() < 0.7 ? gold : silver/}
                        {var percent = ( 100 - ( 2 * depth ) )/}
                        {var css_class = Math.random() < 0.5 ? 'clockwise' : 'counterclockwise'/}
                    {/if}
                    
                    {set style = ''/}
                    {set style = style + 'width: ' + percent + '%;'/}
                    {set style = style + 'height: ' + percent + '%;'/}
                    {set style = style + 'background-color: ' + color + ';'/}
                    {set style = style + 'border-radius: ' + ( 1 + Math.random() * ( 2 - 1 ) ) + 'px;'/}
                    {set style = style + '-webkit-animation-duration: ' + ( 2 + Math.random() * ( 4 - 2 ) ) + 's;'/}
                    {set style = style + '-webkit-animation-delay: ' + ( Math.random() * delay ) + 's;'/}
                    
                    <div class="confetto ${css_class}" style="${style}"></div>
                    
                </div>
                
            {/for}
        
        </div>
        
    {/macro}

{/Template}
