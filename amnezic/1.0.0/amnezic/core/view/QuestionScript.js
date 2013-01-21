Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.QuestionScript',
	$dependencies: ['aria.utils.Json'],

	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function () {
		this.$logDebug( "[constructor] Start..." );
	},
	
	$prototype : {
		
		// //////////////////////////////////////////////////
		// display ready
		
		$displayReady: function() {
            this.$logDebug( "[$displayReady] Start..." );
		},        
        
		// //////////////////////////////////////////////////
		// view ready
		
		$viewReady : function () {
			this.$logDebug( "[$viewReady] Start..." );
            this.load_question();
            // this.$logInfo( "[$viewReady] Load mp3 : " + this.data.question.mp3 );
            /*
            this.data.audio.volume = 50;
            if ( this.data.audio.mp3 ) {
                this.data.audio.mp3.unload();
                this.data.audio.mp3 = null;
            }
            this.data.audio.mp3 = soundManager.createSound({
                id: 'mp3_' + this.data.number,
                url: this.data.question.mp3,
                autoLoad: true,
                autoPlay: false,
                onload: this.musicReady.bind(this),
                volume: this.data.audio.volume,
                whileplaying: this.musicPlaying.bind(this)
            });
            this.data.audio.play = false;
            this.data.audio.loaded = false;
            */
		},   

		// //////////////////////////////////////////////////
		// load_question
        
        load_question : function () {
            this.$logDebug( 'load_question>' + this.data.section.args.number );
            var number = this.data.section.args.number ? parseInt( this.data.section.args.number ) : undefined,
                index = number ? number - 1 : undefined,
                questions = this.data.questions,
                question = questions && number && ( index < questions.length ) ? questions[ index ] : undefined,
                previous = number && index > 0 ? number - 1 : undefined, 
                next = number && index < ( questions.length - 1 ) ? ( number + 1 ) : undefined;
            
            if ( question ) {
                question.number = number;
                question.previous = previous;
                question.next = next;
                aria.utils.Json.setValue( this.data, 'question', question );
            } else {
                aria.utils.Json.deleteKey( this.data, 'question' );
            }
        },
        
		// //////////////////////////////////////////////////
		// music ready
		
		musicReady : function () {
			this.$logDebug( "[musicReady] Start..." );
            aria.utils.Json.setValue(this.data.audio, "loaded", true);    
            // this.play();
		},        
        
		// //////////////////////////////////////////////////
		// music playing
		
		musicPlaying : function () {
			this.$logDebug( "[musicPlaying] Start..." );
            var percent = ( this.data.audio.mp3.position * 100 ) / this.data.audio.mp3.duration;
            this.$logDebug( "[musicPlaying] percent : " + percent );
            aria.utils.Json.setValue(this.data.audio, "progress", percent);    
		},        
        
		// //////////////////////////////////////////////////
		// pause
		
		pause : function () {
			this.$logDebug( "[pause] Start..." );
            aria.utils.Json.setValue(this.data.audio, "play", false);
            this.data.audio.mp3.pause();
		},        
        
		// //////////////////////////////////////////////////
		// play
		
		play : function () {
			this.$logDebug( "[play] Start..." );
            aria.utils.Json.setValue(this.data.audio, "play", true);
            this.data.audio.mp3.play();
		},        
        
		// //////////////////////////////////////////////////
		// decrease volume
		
		decrease_volume : function () {
			this.$logDebug( "[decrease_volume] Start..." );
            if ( this.data.audio.volume > 20 ) {
                aria.utils.Json.setValue(this.data.audio, "volume", this.data.audio.volume - 10);
            } else {
                aria.utils.Json.setValue(this.data.audio, "volume", 10);
            }
            this.data.audio.mp3.setVolume(this.data.audio.volume);
		},        
        
		// //////////////////////////////////////////////////
		// increase volume
		
		increase_volume : function () {
			this.$logDebug( "[increase_volume] Start..." );
            if ( this.data.audio.volume < 90 ) {
                aria.utils.Json.setValue(this.data.audio, "volume", this.data.audio.volume + 10);
            } else {
                aria.utils.Json.setValue(this.data.audio, "volume", 100);
            }
            this.data.audio.mp3.setVolume(this.data.audio.volume);
		},        
        
		// //////////////////////////////////////////////////
		// full volume
		
		full_volume : function () {
			this.$logDebug( "[full_volume] Start..." );
            aria.utils.Json.setValue(this.data.audio, "volume", 100);
            this.data.audio.mp3.volume = this.data.audio.volume;
		}
		
	}
});
