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
            this.initialize();
		},     
        
		// //////////////////////////////////////////////////
		// initialize
		
		initialize : function () {
			this.$logDebug( 'initialize>' );
            this.prepare_game();
            this.moduleCtrl.build_menu();
            this.$json.setValue( this.data, 'initialized', true );
		},     
        
		// //////////////////////////////////////////////////
		// prepare_game
		
		prepare_game : function () {
			this.$logDebug( 'prepare_game>' );
            var game = { users: [] },
                index = 0;
            while ( index < 2 ) {
                var number = index + 1,
                    user = {
                        number: number,
                        name: 'User ' + number,
                        active: true,
                        score: 0
                    };
                
                game.users.push( user );
                index = index + 1;
            }
            
            this.$json.setValue( this.data, 'game', game );
		}
		
	}
});
