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
            
            // TODO : fix this > should be handled by the controller itself
            this.moduleCtrl.store_data();
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            
            this.load_theme();
		},
        
        // //////////////////////////////////////////////////
		// load_theme
		
		load_theme : function () {
			this.$logDebug( 'load_theme>' );
            
            var id = this.data.section.args.id,
                callback = {
                    fn: this.theme_loaded,
                    scope: this
                };
            
            this.moduleCtrl.load_theme( id, callback );
		},
        
        // //////////////////////////////////////////////////
		// theme_loaded
		
		theme_loaded : function ( theme ) {
			this.$logDebug( 'theme_loaded>' );
            
            this.$json.setValue( this.data, 'theme', theme || {} );
		},
        
        // //////////////////////////////////////////////////
		// show_raw
		
		show_raw : function ( event ) {
			this.$logDebug( 'show_raw>' );
            
            this.$json.setValue( this.data.theme, 'raw', true );
		},
        
        // //////////////////////////////////////////////////
		// hide_raw
		
		hide_raw : function ( event ) {
			this.$logDebug( 'hide_raw>' );
            
            this.$json.setValue( this.data.theme, 'raw', false );
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
                        request: undefined,
                        response: undefined
                    }
                }
			} );
        },

        // //////////////////////////////////////////////////
		// remove_question_at
                
        remove_question_at : function ( event, index ) {
            this.$logDebug( 'remove_question_at>' );
            
            if ( this.data.theme.questions ) {
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
		// play
		
		play : function ( event, question ) {
			this.$logDebug( 'play>' );
		}
		
	}
});
