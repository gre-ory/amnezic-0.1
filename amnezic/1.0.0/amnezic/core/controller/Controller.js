Aria.interfaceDefinition({
    $classpath : 'amnezic.core.controller.Controller',
    $extends : 'aria.templates.IModuleCtrl',
    $events: {
        'game_loaded': { description: "Game has been loaded" }
    },
    $interface : {
    
        load_current_section : "Function",
        
        store_data : "Function",
        clear_data : "Function",
        
        add_user : "Function",
        remove_user : "Function",
        activate_user : "Function",
        deactivate_user : "Function",
        
        activate_theme : "Function",
        deactivate_theme : "Function"

    }
});
