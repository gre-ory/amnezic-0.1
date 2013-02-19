Aria.tplScriptDefinition({
	$classpath : 'amnezic.core.view.ThemeScript',

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
            this.load_theme();
		},
        
        // //////////////////////////////////////////////////
		// load_theme
        
		load_theme : function () {
			this.$logDebug( 'load_theme>' );
            
            var id = this.data.section.args.id,
                callback = {
                    fn: this.theme_loaded,
                    scope: this
                };
            
            this.moduleCtrl.theme_retrieve( id, callback );
		},
		
		theme_loaded : function ( theme ) {
			this.$logDebug( 'theme_loaded>' );
            aria.utils.Json.setValue( this.data, 'theme', theme );
		},
        
        // //////////////////////////////////////////////////
		// show_raw
		
		show_raw : function ( event ) {
			this.$logDebug( 'show_raw>' );
            var options = {
                indent : '    ',
                maxDepth : 10,
                keepMetadata: false
            };
            aria.utils.Json.setValue( this.data.theme, 'raw', aria.utils.Json.convertToJsonString( this.data.theme, options ) );
		},
        
        // //////////////////////////////////////////////////
		// hide_raw
		
		hide_raw : function ( event ) {
			this.$logDebug( 'hide_raw>' );
            aria.utils.Json.deleteKey( this.data.theme, 'raw' );
		},

        // //////////////////////////////////////////////////
		// add_items
                
        add_items : function ( event ) {
            this.$logDebug( 'add_items>' );
            
            Aria.loadTemplate( { 
				classpath: 'amnezic.core.view.Search',
				div: 'search',
				moduleCtrl: this.moduleCtrl,
				data : {
                    container_id: 'search',
                    theme: this.data.theme,
                    search: {
                        request: undefined,
                        response: undefined
                    }
                }
			} );
        },

        // //////////////////////////////////////////////////
		// remove_item_at
                
        remove_item_at : function ( event, index ) {
            this.$logDebug( 'remove_item_at>' );
            
            aria.utils.Json.removeAt( this.data.theme.items, index );
        },
        
        // //////////////////////////////////////////////////
		// switch_answer_and_hint
		
		switch_answer_and_hint : function ( event, item ) {
			this.$logDebug( 'switch_answer_and_hint> ' + item );
            
            var answer = item.answer,
                hint = item.hint;
                
            aria.utils.Json.setValue( item, 'answer', hint );
            aria.utils.Json.setValue( item, 'hint', answer );
		},
        
        // //////////////////////////////////////////////////
		// play_mp3
		
		play_mp3 : function ( event, item ) {
			this.$logDebug( 'play_mp3>' );
		}
		
	}
});
