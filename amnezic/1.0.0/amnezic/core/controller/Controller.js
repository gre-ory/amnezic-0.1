Aria.interfaceDefinition({
    $classpath : 'amnezic.core.controller.Controller',
    $extends : 'aria.templates.IModuleCtrl',
    $events: {
        'game_loaded': { description: "Game has been loaded" }
    },
    $interface : {
        load_current_section : "Function",
        initialize : "Function",
        add_user : "Function"
        
        //load_game : { $type : "Function", $callbackParam: 1 }
        
    }
});
