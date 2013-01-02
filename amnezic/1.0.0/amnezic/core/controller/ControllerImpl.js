Aria.classDefinition({
	$classpath : 'amnezic.core.controller.ControllerImpl',
	$extends : 'aria.templates.ModuleCtrl',
	$implements : [ 'amnezic.core.controller.Controller' ],
	$dependencies: [ 'aria.utils.History', 'amnezic.mock.service.GameLoader' ],
    
	// //////////////////////////////////////////////////
	// constructor
	
	$constructor : function () {
		this.$logDebug("[constructor] Start...");
		this._enableMethodEvents = true;
		this.$ModuleCtrl.constructor.call(this);
		this.$logDebug("[constructor] aria.utils.History : " + aria.utils.History);
		this.$logDebug("[constructor] aria.utils.History.Adapter : " + aria.utils.History.Adapter);
		this.$logDebug("[constructor] Aria.$window : " + Aria.$window);
		this.$logDebug("[constructor] Aria.$window.History : " + Aria.$window.History);
		this.$logDebug("[constructor] Aria.$window.History.Adapter : " + Aria.$window.History.Adapter);
		// aria.utils.History.Adapter.bind( window, 'statechange', this.on_state_change.bind(this) );
		
		aria.utils.History.$on( { "onpopstate": this.on_state_change, scope: this } );
		this.on_state_change();
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
		// on state change
		
		on_state_change : function() {
			this.$logDebug("[on_state_change] Start...");
			var state = aria.utils.History.getState();
			this.$logDebug("[on_state_change] title : " + state.title);
			this.$logDebug("[on_state_change] url : " + state.url);
			this.$logDebug("[on_state_change] data : " + state.data);
		},

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
