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
                { to: 'menu', inside: data, recursive: true },
                { to: 'section', inside: data, recursive: true }
            ]
	    }}
    
            <div class="navbar">
                <div class="navbar-inner">
                    <a class="brand" href="#start">Amnezic</a>
                    {call menu( data.menu, true )/}
                </div>
            </div>
        
        {/section}
        
    {/macro}
    
    {macro menu( menu, main )}
        
        {if menu && menu.items && menu.items.length > 0}
    		
            {if main}
                <ul class="nav">
            {else/}
                <ul class="dropdown-menu">
            {/if}
    	    	{var index = 0 /}
                {foreach item inArray menu.items}
                    {var active = item.hash === data.section.hash /}
                    {if item.items}
                        {if active}
                            <li class="dropdown active">
                        {else/}
                            <li class="dropdown">
                        {/if}
                            <a href="#" class="dropdown-toggle" data-toggle="dropdown">${item.title} <b class="caret"></b></a>
                            {call menu( item, false )/}
                        </li>
                    {else/}
                        {if active}
                            <li class="active">
                        {else/}
                            <li>
                        {/if}
                            {if item.hash}
                                <a href="#${item.hash}">${item.title}</a>
                            {else/}
                                <span>${item.title}</span>
                            {/if}
                        </li>
                    {/if}
                    {set index = index + 1 /}
    	        {/foreach}
            </ul>
        
        {/if}
	    
	{/macro}
    
    {macro section()}
    
        <div class="row-fluid">
            <div id="section" class="span12">
                ...
            </div>
        </div>
        
    {/macro}

{/Template}
