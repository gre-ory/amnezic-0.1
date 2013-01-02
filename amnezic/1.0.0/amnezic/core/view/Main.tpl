{Template {
    $classpath: 'amnezic.core.view.Main',
    $hasScript: true
}}
		
	{macro main()}
    
        <div class="container">
	
			<!-- ************************************************** -->
			<!-- header												-->
			<!-- ************************************************** -->
		    
			<div class="row-fluid box">
				<div id="header" class="header span12 box-inner">
			    	<a href="#config">config</a>
			        <a href="#game">game</a>
			        <a href="#question">question</a>
			        <a href="#question-1">question 1</a>
			        <a href="#question-2-results">results 2</a>
				</div>
		    </div>

			<!-- ************************************************** -->
			<!-- messages										    -->
			<!-- ************************************************** -->

			<!-- 
            <div class="row-fluid">
                <div id="messages" class="messages span12">
                </div>
            </div>
            -->

			<!-- ************************************************** -->
			<!-- game   										    -->
			<!-- ************************************************** -->
            
            <div class="row-fluid">
                <div id="game" class="game span12">
                </div>
			</div>

			<!-- ************************************************** -->
			<!-- footer											    -->
			<!-- ************************************************** -->

            <!-- 
			<div class="row-fluid box">
				<div id="footer" class="footer span12 box-inner">
					...
				</div>
			</div>
            -->
        
	{/macro}

{/Template}

