Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.SearchScript',

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
            jQuery( '#' + this.data.container_id ).modal();
		},
        
        // //////////////////////////////////////////////////
		// search
		
		search : function () {
			this.$logDebug( 'search>' );
            var callback = {
                fn: this.found,
                scope: this
            };
            this.moduleCtrl.search( this.data.search.request, callback );
		},
        
        found : function( json ) {
            this.$logDebug( 'found>' );
            aria.utils.Json.setValue( this.data.search, 'response', json );
        },
        
        // //////////////////////////////////////////////////
		// select
		
		select : function ( event, question ) {
			this.$logDebug( 'select>' );
            aria.utils.Json.setValue( question, 'selected', true );
		},
        
        // //////////////////////////////////////////////////
		// unselect
		
		unselect : function ( event, question ) {
			this.$logDebug( 'select>' );
            aria.utils.Json.setValue( question, 'selected', false );
		},
        
        // //////////////////////////////////////////////////
		// play
		
		play : function ( event, question ) {
			this.$logDebug( 'play>' );
		},
        
        // //////////////////////////////////////////////////
		// add_selected
		
		add_selected : function ( event ) {
			this.$logDebug( 'add_selected>' );
            
            jQuery( '#' + this.data.container_id ).modal( 'hide' );
            
            var data = this.data,
                theme = data ? data.theme : undefined,
                search = data ? data.search : undefined,
                response = search ? search.response : undefined,
                questions = response ? response.questions : undefined;
                
            if ( theme && questions ) {
                if ( !theme.questions ) {
                    aria.utils.Json.setValue( theme, 'questions', [] );
                }
                for ( var i = 0 ; i < questions.length ; i++ ) {
                    var question = questions[i];
                    if ( question && question.selected ) {
                        // this.moduleCtrl.theme_add_question( theme, question );
                        aria.utils.Json.add( theme.questions, question );
                    }
                }
            }
            
		}
		
	}
});
