Aria.classDefinition({
	$classpath : 'amnezic.core.controller.ControllerImpl',
	$extends : 'aria.templates.ModuleCtrl',
	$implements : [ 'amnezic.core.controller.Controller' ],
	$dependencies: [ 'amnezic.mock.service.GameLoader' ],
    
	// //////////////////////////////////////////////////
	// constructor
	
	$constructor : function () {
		this.$logDebug("[constructor] Start...");
		this._enableMethodEvents = true;
		this.$ModuleCtrl.constructor.call(this);
	},
	
	// //////////////////////////////////////////////////
	// destructor
	
	$destructor : function () {
		this.$logDebug("[destructor] Start...");
		this.$ModuleCtrl.$destructor.call(this);
	},

	$prototype : {
		
		$publicInterfaceName : 'amnezic.core.controller.Controller',

		// //////////////////////////////////////////////////
		// load

		load_game : function() {
            this.$logDebug("[load_game] Start...");
            var service = new amnezic.mock.service.GameLoader();
            service.load_game( 'amnezic/mock/service/game.json', { fn: this.game_loaded, scope: this } );
		},
        
        game_loaded : function( game ) {
            this.$logDebug("[game_loaded] Start...");
            this.$raiseEvent( { name: 'game_loaded', game: game } );
		}
		
	}
	
});
