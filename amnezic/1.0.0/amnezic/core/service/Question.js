Aria.classDefinition({
	$classpath : 'amnezic.core.service.Question',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'aria.utils.Json'
    ],
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$JsObject.constructor.call(this);
        // this.$logDebug( 'constructor>' );
        this.controller = controller;
    },
    
	$prototype : {
        
        // //////////////////////////////////////////////////
        // prepare_all

        prepare_all : function( themes, settings, callback ) {
            this.$logDebug( 'prepare_all>' );
            
            var questions = [],
                nb_questions = settings ? settings.nb_questions : 0;
                
            if ( themes && themes.length > 0 && nb_questions > 0 ) {
                for( var i = 0 ; i < nb_questions ; i++ ) {
                    var theme = themes[ Math.floor( Math.random() * themes.length ) ],
                        items = aria.utils.Json.copy( theme.items ),
                        question = {
                            title: theme.title,
                            solution: undefined,
                            answers: []
                        };
                    
                    while ( items.length > 0 && question.answers.length < 6 ) {
                        question.answers.push( aria.utils.Json.removeAt( items, Math.floor( Math.random() * items.length ) ) );
                    }
                    
                    if ( question.answers.length > 0 ) {
                        question.solution = Math.floor( Math.random() * question.answers.length );
                    }        
                    questions.push( question );
                }
            }
            
            // callback
            if ( callback ) {
                this.$callback( callback, questions );
            }
        }
        
	}
	
});
