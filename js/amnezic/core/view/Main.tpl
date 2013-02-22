{Template {
    $classpath: 'amnezic.core.view.Main',
    $hasScript: true
}}
        
    {macro main()}
    
        {call header()/}
        {call body()/}
        {call footer()/}
        
    {/macro}
    
    {macro header()}
    
        <span class="tag">
            amnezic
        </span>
    
        <div class="header">
        
            {section {
                id: 'header',
                bindRefreshTo: [
                    { to: 'section', inside: data, recursive: true },
                    { to: 'admin', inside: data, recursive: true }
                ]
    	    }}
        
                {call menu( 'Users', 'users' )/}
                {call menu( 'Themes', 'themes' )/}
                {call menu( 'Settings', 'settings' )/}
                {call menu( 'Start', 'start' )/}
                {call menu( 'Question', 'question' )/}
                {call menu( 'Score', 'score' )/}
                {call menu( 'End', 'end' )/}                        
            
                {var hash = data.section && data.section.hash ? '#' + data.section.hash : ''/} 
                {if data.admin}
                    <a href="/index.html?admin" {on click { fn:reset }/} title="Reset" class="menu">
                        Reset
                    </a>   
                    <a href="/${hash}" title="Admin" class="menu active">
                        Admin
                    </a>
                {else/}
                    <a href="/" {on click { fn:reset }/} title="Reset" class="menu">
                        Reset
                    </a>   
                    <a href="/index.html?admin${hash}" title="Admin" class="menu">
                        Admin
                    </a>
                {/if}
            
            {/section}

        </div>
        
    {/macro}
    
    {macro menu( title, hash )}
        
        {var active = data.section && ( hash === data.section.hash ) /}
        
        {if hash}
            {if active}
                <a href="#${hash}" class="menu active">${title}</a>
            {else/}
                <a href="#${hash}" class="menu">${title}</a>
            {/if}
            
        {else/}
            <a class="menu inactive">${title}</a>
        {/if}
	    
	{/macro}
    
    {macro body()}
    
        <div class="body">
            <div class="container">
    
                <div class="row-fluid">
                    <div id="section" class="span12"></div>
                </div>
            
            </div>
        </div>
        
    {/macro}
    
    {macro footer()}
    
        <div class="footer">
            <div class="container">
    
                <div class="row-fluid">
                    <div id="section" class="span12"></div>
                </div>
            
            </div>
        </div>
        
    {/macro}    

{/Template}
