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
		},
        
        // //////////////////////////////////////////////////
		// viewReady
		
		$viewReady : function () {
			this.$logDebug( '$viewReady>' );
            if ( !this.is_loaded() ) {
                this.load();
            }
		},
        
        // //////////////////////////////////////////////////
		// load
		
        is_loaded : function () {
            this.$logDebug( 'is_loaded>' );
            return this.data.section.args.id && this.data.theme && this.data.section.args.id == this.data.theme.id;
        },
        
		load : function ( id ) {
			this.$logDebug( 'load>' );
            
            var id = this.data.section.args.id,
                callback = {
                    fn: this.theme_loaded,
                    scope: this
                };
            
            this.moduleCtrl.theme_retrieve( id, callback );
		},
		
		loaded : function ( theme ) {
			this.$logDebug( 'loaded>' );
            this.$json.setValue( this.data, 'theme', theme );
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
            
            this.$json.removeAt( this.data.theme.questions, index );
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
		// play_mp3
		
		play_mp3 : function ( event, question ) {
			this.$logDebug( 'play_mp3>' );
		}
		
	}
});
