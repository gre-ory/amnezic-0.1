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
            if ( this.data.section.args.id ) {
                this.moduleCtrl.load_theme( this.data.section.args.id );
            } else {
                var theme = {
                    title: '',
                    active: false,
                    questions: []
                };
                this.$json.setValue( this.data, 'theme', theme );
            }
		},
        
        // //////////////////////////////////////////////////
		// show_raw
		
		show_raw : function ( event ) {
			this.$logDebug( 'show_raw>' );
            if ( this.data.theme ) {
                this.$json.setValue( this.data.theme, 'raw', true );
            } 
		},
        
        // //////////////////////////////////////////////////
		// hide_raw
		
		hide_raw : function ( event ) {
			this.$logDebug( 'hide_raw>' );
            if ( this.data.theme ) {
                this.$json.setValue( this.data.theme, 'raw', false );
            } 
		},

        // //////////////////////////////////////////////////
		// add_questions
                
        add_questions : function ( event ) {
            this.$logDebug( 'add_questions>' );
            
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
		// remove_question_at
                
        remove_question_at : function ( event, index ) {
            this.$logDebug( 'remove_question_at>' );
            
            if ( this.data.theme && this.data.theme.questions ) {
                this.$json.removeAt( this.data.theme.questions, index );
            }
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
