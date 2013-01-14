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
                
        add_questions : function ( event, theme ) {
            this.$logDebug( 'add_questions> ' + theme );
            
            Aria.loadTemplate( { 
				classpath: 'amnezic.core.view.Search',
				div: 'search',
				moduleCtrl: this.moduleCtrl,
				data : {
                    container_id: 'search',
                    theme: this.data.theme,
                    search: {
                        request: '',
                        response: undefined
                    }
                }
			} );
            
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
		},
        
        // //////////////////////////////////////////////////
		// select
		
		select : function ( event, question ) {
			this.$logDebug( 'select>' );
            this.$json.setValue( question, 'selected', true );
            this.moduleCtrl.add_question( question );
		},
        
        // //////////////////////////////////////////////////
		// unselect
		
		unselect : function ( event, question ) {
			this.$logDebug( 'select>' );
            this.$json.setValue( question, 'selected', false );
            this.moduleCtrl.remove_question( question );
		},
        
        // //////////////////////////////////////////////////
		// play
		
		play : function ( event, question ) {
			this.$logDebug( 'play>' );
		}
		
	}
});
