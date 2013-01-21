Aria.interfaceDefinition({
    $classpath : 'amnezic.core.controller.Controller',
    $extends : 'aria.templates.IModuleCtrl',
    $events: {
        'game_loaded': { description: 'Game has been loaded' }
    },
    $interface : {
        
        load_current_section: 'Function',
        search: 'Function',

        // service.storage
        
        storage_clear:  'Function',
        
        // service.section
        
        // service.user
        
        user_add: 'Function',
        user_activate: 'Function',
        user_deactivate: 'Function',
        user_remove: 'Function',
        
        // service.theme

        theme_retrieve_all: 'Function',
        theme_retrieve: 'Function',
        
        // service.question
        
        question_prepare_all: 'Function'

    }
});
