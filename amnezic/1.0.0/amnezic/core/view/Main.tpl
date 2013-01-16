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
                { to: 'section', inside: data, recursive: true },
                { to: 'admin', inside: data, recursive: true }
            ]
	    }}
    
            <div class="navbar">
                <div class="navbar-inner">
                    
                    {var hash = data.section && data.section.hash ? '#' + data.section.hash : ''/}
                    <span class="brand">Amnezic</span>
                    
                    <span>
                        <ul class="nav">
                        
                            {call menu( 'Users', 'users' )/}
                            {call menu( 'Themes', 'themes' )/}
                            {call menu( 'Settings', 'settings' )/}
                            {call menu( 'Start', 'start' )/}
                            {call menu( 'Question', 'question' )/}
                            {call menu( 'Score', 'score' )/}
                            {call menu( 'End', 'end' )/}                        
                            
                        </ul>
                    </span>
                
                    <span class="btn-group pull-right">
                        {if data.admin}
                            <span href="/index.html?admin" class="btn" {on click { fn:reset }/} title="Reset">
                                <i class="icon-remove"></i>
                            </span>   
                            <a href="/${hash}" class="btn btn-success" title="Admin">
                                <i class="icon-off"></i>
                            </a>
                        {else/}
                            <span href="/" class="btn" {on click { fn:reset }/} title="Reset">
                                <i class="icon-remove"></i>
                            </span>   
                            <a href="/index.html?admin${hash}" class="btn" title="Admin">
                                <i class="icon-off"></i>
                            </a>
                        {/if}
                    </span>
                    
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
