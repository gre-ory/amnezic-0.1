{Template {
    $classpath: 'amnezic.core.view.Main',
    $hasScript: true
}}
        
    {macro main()}
    
        <div class="container">
            {call header()/}
            {call section()/}
        </div>
        
    {/macro}
    
    {macro header()}
    
        {section {
            id: 'header',
            bindRefreshTo: [
                { to: 'section', inside: data, recursive: true }
            ]
	    }}
    
            <div class="navbar">
                <div class="navbar-inner">
                    <span class="brand">Amnezic</span>
                    <ul class="nav">
                    
                        {call menu( 'Users', 'users' )/}
                        {call menu( 'Themes', 'themes' )/}
                        {call menu( 'Settings', 'settings' )/}
                        {call menu( 'Start', 'start' )/}
                        {call menu( 'Question', 'question' )/}
                        {call menu( 'Score', 'score' )/}
                        {call menu( 'End', 'end' )/}                        
                        
                    </ul>
                </div>
            </div>
        
        {/section}
        
    {/macro}
    
    {macro menu( title, hash )}
        
        {var active = data.section && ( hash === data.section.hash ) /}
        
        {if active}
            <li class="active">
        {else/}
            <li>
        {/if}
        
            {if hash}
                <a href="#${hash}">${title}</a>
            {else/}
                <a>${title}</a>
            {/if}
        
        </li>
	    
	{/macro}
    
    {macro section()}
    
        <div class="row-fluid">
            <div id="section" class="span12"></div>
        </div>
        
    {/macro}    

{/Template}
