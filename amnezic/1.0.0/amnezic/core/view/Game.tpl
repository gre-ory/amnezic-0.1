{Template {
    $classpath: 'amnezic.core.view.Game',
    $hasScript: true,
    $css: [ 'amnezic.core.view.GameStyle' ]
}}
	
    {var data = { game: null, number: null } /}
		
	{macro main()}
		
        {section {
	       id: "game_section",
	       bindRefreshTo: [ { inside: data, to: "game", recursive: false }, { inside: data, to: "number", recursive: false } ]
	    }}
		    
	    	{call game(data.game)/}
	
	    {/section}
	    
	{/macro}

	{macro game(game)}
        
        <div id="question" class="question">
        </div>
        
        <div id="players" class="players row-fluid">
            {if game}
                {call players(game.players)/}
            {/if}
        </div>
        
        <div class="row-fluid">
            <div class="btn pull-right" {on click { fn : next_question } /}>
                <i class="icon-play"></i>
            </div>
        </div>
        
	{/macro}

	{macro players(players)}
    
		{if players && players.length > 0}
			
            {var index = 0 /}
            {foreach player inArray players}
            
                <div class="player btn span1">
				    {call player(index+1, player)/}
                </div>
            
                {set index = index + 1 /}
	        {/foreach}
            
	    {/if}
        
	{/macro}

	{macro player(number, player)}
    
        {if number}
        
    		${number}
        
        {/if}
    
	{/macro}

{/Template}

