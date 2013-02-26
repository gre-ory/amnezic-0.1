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
            <div id="section"></div>
        </div>
        
    {/macro}
    
    {macro footer()}
    
        <footer class="footer">
        	<section class="content">
    			<section class="documentation links">
    				<h5><a href="/documentation">Documentation</a></h5>
    				<ul>
    					<li><a href="javascript:void(0);">User Manual</a></li>
    					<li><a href="javascript:void(0);">FAQ</a></li>
    				</ul>
    			</section>
    			<section class="discuss links">
    				<h5><a href="/discuss">Discuss</a></h5>
    				<ul>
    					<li><a href="javascript:void(0);">Blog</a></li>
    					<li><a href="javascript:void(0);">Forum</a></li>
    					<li><a href="javascript:void(0);">Latest News</a></li>
    				</ul>
    			</section>
    			<section class="contribute links">
    				<h5><a href="/contribute">Contribute</a></h5>
    				<ul>
    					<li><a href="http://github.com/gre-ory/amnezic">Source code</a></li>
    					<li><a href="http://github.com/gre-ory/amnezic/issues">Bugs tracking</a></li>
    					<li><a href="javascript:void(0);">Documentation</a></li>
    				</ul>
    			</section>
    			<section class="contact links">
    				<h5><a href="/about">About</a></h5>
    				<ul>
    					<li><a href="javascript:void(0);">Contact</a></li>
    				</ul>
    			</section>
        	</section>
        	<section class="content legal">
        		&#169; 2013 Amnezic is licensed under Creative Commons.
        	</section>
        </footer>        
        
    {/macro}    

{/Template}
