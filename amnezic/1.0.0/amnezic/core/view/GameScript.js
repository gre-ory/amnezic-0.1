Aria.tplScriptDefinition({
	$classpath : "amnezic.core.view.GameScript",
	$dependencies: [ "aria.utils.Json" ],
	$prototype : {
		
		// //////////////////////////////////////////////////
		// display ready
		
		$displayReady: function() {
            this.$logDebug( "[$displayReady] Start..." );
            this.load_question_template();
		},

		// //////////////////////////////////////////////////
		// view ready
		
		$viewReady: function() {
            this.$logDebug( "[$viewReady] Start..." );
            this.bind();
            this.load_game();
		},
		
		// //////////////////////////////////////////////////
		// bind
		
		bind: function() {
            this.$logDebug( "[bind] Start..." );
            this.moduleCtrl.$on( { "game_loaded": this.game_loaded, scope: this } );
		},        
        
		// //////////////////////////////////////////////////
		// load game
		
		load_game: function() {
			this.$logDebug( "[load_game] Start..." );
            this.moduleCtrl.load_game();
		},
        
        game_loaded: function( event ) {
            this.$logDebug( "[game_loaded] Start..." );
            var game = event ? event.game : null;
            this.$logInfo( "[game_loaded] Game " + ( game ? game.title : "" ) + " loaded." );
            this.$json.setValue( this.data, "game", game );
            this.$json.setValue( this.data, "number", 1 );
            this.load_question_template();
		},
        		
		// //////////////////////////////////////////////////
		// load question template
		
		load_question_template: function( div ) {
			this.$logDebug( "[load_question_template] Start..." );
            var number = this.data && this.data.number ? this.data.number : 1,
                game = this.data ? this.data.game : null,
                questions = game && game.questions ? game.questions : [],
                question = number && number <= game.questions.length ? game.questions[number-1] : null,
                players = game && game.players ? game.players : [];
            
            Aria.loadTemplate({
				classpath: "amnezic.core.view.Question",
				div: div || "question",
                moduleCtrl: this.moduleCtrl,
                data: {
                    number: number,
                    question: question,
                    players: players,
                    audio: {
                        mp3: null,
                        play: false,
                        volume: 50
                    },
                    progress_bar: null
                }
			});
		},        
        
		// //////////////////////////////////////////////////
		// next question
		
		next_question : function () {
			this.$logDebug( "[next_question] Start..." );
            this.$json.setValue(this.data, "number", this.data.number + 1);
		}
		
	}
});
