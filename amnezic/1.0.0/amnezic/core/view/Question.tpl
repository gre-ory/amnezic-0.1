{Template {
    $classpath: 'amnezic.core.view.Question',
    $hasScript: true,
    $css : [ 'amnezic.core.view.QuestionStyle' ]
}}
	
	{var answer_css = [ 'one', 'two', 'three', 'four', 'five', 'six' ] /}

    {macro main()}
        
        {section {
            id: 'question_section',
            bindRefreshTo: [ 
                { to: 'question', inside: data, recursive: true }
            ]
	    }}
        
            <div class="row-fluid">
                
                <!-- ************************************************** -->
                <!--  previous                                          -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    {if data.question && data.question.previous}
                        <a href="#question-${data.question.previous}" class="btn" title="Question ${data.question.previous}">
                            <i class="icon-chevron-left"></i>
                        </a>
                    {else/}
                        <a href="#start" class="btn" title="Start">
                            <i class="icon-chevron-left"></i>
                        </a>
                    {/if}
                </div>
                
                <!-- ************************************************** -->
                <!--  content                                           -->
                <!-- ************************************************** -->
                
                {if data.question}
                    <div class="question span10">
                        
                        {if data.question.title}
                            <div class="title row-fluid">
                                <div class="offset1 span10 pagination-centered">
                                    ${data.question.title}
                                </div>
                            </div>
                        {/if}
                        
                        {if data.question.items}
                            {var solution = data.question.solution /}
                            {foreach item inArray data.question.items}
                                <div class="item item${item.number} row-fluid">
                                    
                                    <div class="number span1">
                                        ${item.number}
                                    </div>
                                    
                                    <div class="span10">
                                        
                                        <div class="answer">
                                            ${item.answer}
                                        </div>
                                        
                                        <div class="hint">
                                            ${item.hint}
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                            {/foreach}
                        {/if}
                    </div>
                {else/}
                    <div class="span10 pagination-centered">
                        <span class="btn disabled">Loading question...</span>
                    </div>
                {/if}
                
                <!-- ************************************************** -->
                <!--  next                                              -->
                <!-- ************************************************** -->
                
                <div class="span1 pagination-centered">
                    {if data.question && data.question.next}
                        <a href="#question-${data.question.next}" class="btn" title="Question ${data.question.next}">
                            <i class="icon-chevron-right"></i>
                        </a>
                    {else/}
                        <a href="#end" class="btn" title="End">
                            <i class="icon-chevron-right"></i>
                        </a>
                    {/if}
                </div>
            
            </div>
        
        {/section}

    {/macro}
		
	{macro main_old()}
		
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

