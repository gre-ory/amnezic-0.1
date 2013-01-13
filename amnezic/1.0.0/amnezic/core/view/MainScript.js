Aria.tplScriptDefinition({
    $classpath : "amnezic.core.view.MainScript",

    $prototype : {
                
        // //////////////////////////////////////////////////
        // view ready
        
        $viewReady: function() {
            this.$logDebug( '$viewReady>' );
            this.moduleCtrl.load_current_section();
        },
        
        // //////////////////////////////////////////////////
		// clear_data
		
		clear_data : function () {
			this.$logDebug( 'clear_data>' );
            this.moduleCtrl.clear_data();
		}
        
    }
});
