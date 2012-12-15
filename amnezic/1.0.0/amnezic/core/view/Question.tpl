{Template {
    $classpath: 'amnezic.core.view.Question',
    $hasScript: true,
    $css: [ 'amnezic.core.view.QuestionStyle' ]
}}
	
	{var answer_css = [ 'one', 'two', 'three', 'four', 'five', 'six' ] /}
		
	{macro main()}
		
        {section {
	       id: "question_" + data.number + "_section",
	       bindRefreshTo: [ { inside: data, to: "question", recursive: false } ]
	    }}
		    
	    	{call question(data.number, data.question, data.players, data.audio)/}
	
	    {/section}
	    
	{/macro}

	{macro question( number, question, players, audio )}
        
        {if question}
        
            {call title(number, question.title, question.img)/}
            {call answers(question.answers, players)/}
            {call audio(audio)/}
        
        {/if}
	    
	{/macro}

	{macro title( number, title, img )}
        
        {if title}
            
            <div class="row-fluid">
    			<div class="span12 box">
                    
                    <div class="row-fluid">
                		<!-- <div class="number span1">${number}</div> -->
                        <div class="title span11" title="${title}">${title}</div>
                    </div>
                        
                </div>
            </div>
            
        {/if}
	    
	{/macro}

    {macro answers( answers, players )}
    
        {if answers && answers.length > 0}
        
            <div class="answers">
    		
    			{var index = 0 /}
                {foreach answer inArray answers}
                    
                    <div class="answer">
    				    {call answer( index+1, answer )/}
                    </div>
                    
                    {set index = index + 1 /}
    	        {/foreach}
            
            </div>
        
        {/if}
	    
	{/macro}
    
    {macro answer(number, answer)}
		
        {if answer}
        
            <div class="answer row-fluid">
        		
                <div class="number span1 box">
                    ${number}
                </div>
                
                <div class="answer span11 box">
                    ${answer.answer}
                </div>
                
            </div>

	    {/if}
        
	{/macro}
    
    {macro audio(audio)}
		
        {if audio}
        
            <div class="audio row-fluid">
        
                {section {
                    id: "audio_play",
                    type: "div",
                    attributes : {  classList : [ "span1" ] },
                    bindRefreshTo: [ { inside: audio, to: "play", recursive: false } ]
        	    }}
                    
                    {if audio.play}
                        <div class="pause btn" {on click { fn : pause } /}>
                            <i class="icon-pause"></i>
                        </div>
                    {else/}
                        <div class="play btn" {on click { fn : play } /}>
                            <i class="icon-play"></i>
                        </div>
                    {/if}
                
                {/section}
                
                {section {
                    id: "audio_progress",
                    type: "div",
                    attributes : {  classList : [ "span8" ] },
                    bindRefreshTo: [ { inside: audio, to: "progress", recursive: false } ]
        	    }}
                
                    <div class="progress progress-striped">
                      <div id="progress_bar" class="bar" style="width: ${audio.progress}%;"></div>
                    </div>
                    
                {/section}
                
                {section {
                    id: "audio",
                    type: "div",
                    attributes : {  classList : [ "span3" ] },
                    bindRefreshTo: [ { inside: audio, to: "volume", recursive: false } ]
        	    }}                
                    
                    <div class="btn-toolbar">
                        <div class="btn-group">
                    
                            {if audio.volume > 10}
                                <div class="volume  btn" {on click { fn : decrease_volume } /}>
                                    <i class="icon-minus"></i>
                                </div>
                            {else/}
                                <div class="volume btn disabled">
                                    <i class="icon-minus"></i>
                                </div>
                            {/if}
                            
                            <div class="volume btn" {on click { fn : full_volume } /}>
                                ${audio.volume} %
                            </div>
                            
                            {if audio.volume < 100}
                                <div class="volume btn" {on click { fn : increase_volume } /}>
                                    <i class="icon-plus"></i>
                                </div>
                            {else/}
                                <div class="volume btn disabled">
                                    <i class="icon-plus"></i>
                                </div>
                            {/if}
                            
                        </div>
                    </div>
                    
        		{/section}
                
            </div>

	    {/if}
        
	{/macro}	

{/Template}

