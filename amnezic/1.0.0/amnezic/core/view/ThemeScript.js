Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemeScript',

	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function () {
		this.$logDebug( 'constructor>' );
	},

	$prototype : {
		
		// //////////////////////////////////////////////////
		// displayReady
		
		$displayReady : function () {
			this.$logDebug( '$displayReady>' );
            this.moduleCtrl.store_data();
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            this.moduleCtrl.load_theme( this.data.section.args.id );
		},
        
        // //////////////////////////////////////////////////
		// switch_answer_and_hint
		
		switch_answer_and_hint : function ( event, question ) {
			this.$logDebug( 'switch_answer_and_hint> ' + question );
            var answer = question.answer,
                hint = question.hint;
            this.$json.setValue( question, 'answer', hint );
            this.$json.setValue( question, 'hint', answer );
		},
        
        // //////////////////////////////////////////////////
		// search
		
		search : function () {
			this.$logDebug( 'search>' );
            this.moduleCtrl.search();
		}
		
	}
});
