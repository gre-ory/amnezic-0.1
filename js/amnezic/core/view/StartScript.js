Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.StartScript',

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
            // if ( !this.data.questions ) {
                this.load_questions();
            // }
		},
        
        // //////////////////////////////////////////////////
		// load_questions
		
		load_questions : function () {
			this.$logDebug( 'load_questions>' );
            
            var callback = {
                    fn: this.questions_loaded,
                    scope: this
                };
            
            this.moduleCtrl.question_prepare_all( this.data.themes, this.data.settings, callback );
		},
		
		questions_loaded : function ( questions ) {
			this.$logDebug( 'questions_loaded>' );
            aria.utils.Json.setValue( this.data, 'questions', questions );
		}
		
	}
});
