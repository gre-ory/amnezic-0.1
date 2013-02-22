Aria.interfaceDefinition({
    $classpath : 'amnezic.core.controller.Controller',
    $extends : 'aria.templates.IModuleCtrl',
    $events: {
        'game_loaded': { description: 'Game has been loaded' }
    },
    $interface : {
        
        load_current_section: 'Function',
        search: 'Function',
        get_service:  'Function',
        // question_prepare_all: 'Function'

    }
});
