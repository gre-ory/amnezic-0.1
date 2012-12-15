Aria.interfaceDefinition({
	$classpath : 'amnezic.core.controller.Controller',
	$extends : 'aria.templates.IModuleCtrl',
	$events: {
        'game_loaded': { description: "Game has been loaded" }
    },
	$interface : {
		load_game : { $type : "Function", $callbackParam: 1 }
	}
});
