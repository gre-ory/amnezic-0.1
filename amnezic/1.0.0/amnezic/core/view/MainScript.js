Aria.tplScriptDefinition({
    $classpath : "amnezic.core.view.MainScript",

    $prototype : {
                
        // //////////////////////////////////////////////////
        // view ready
        
        $viewReady: function() {
            this.$logDebug( '$viewReady>' );
            this.moduleCtrl.load_current_section();
        }
        
    }
});
