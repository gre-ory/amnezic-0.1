Aria.classDefinition({
	$classpath : 'amnezic.core.service.JsonUrlLoader',
    $extends : 'aria.core.JsObject',
    $dependencies: [ 'aria.core.IO.asyncRequest' ],
	$prototype : {

		// //////////////////////////////////////////////////
		// json

        load_json_url : function ( json_url, adapter, callback ) {
            this.$logDebug( 'load_json> ' + json_url );

            // jquery
            
            jQuery.ajax( {
                type: 'GET',
                url: json_url,
                contentType: 'application/json; charset=utf-8',
                dataType: 'jsonp',
                error: function () {
                    this.json_url_loaded( undefined, adapter, callback );
                }.bind(this),
                success: function ( response ) {
                    this.json_url_loaded( response, adapter, callback );
                }.bind(this)
            } );
            
            // aria
            
            // aria.core.IO.asyncRequest({
            //     url: json_file,
            //     callback: {
            //         fn: this.json_url_loaded,
            //         onerror: this.json_url_loaded,
            //         scope: this,
            //         args: {
            //             adapter: adapter,
            //             callback: callback
            //         }
            //     }
            // });
            
		},

		// //////////////////////////////////////////////////
		// json_url_loaded
                
        json_url_loaded : function ( json, adapter, callback ) {
            this.$logDebug( 'json_url_loaded' );

            // var json = response.responseJson ? response.responseJson : response.responseText ? aria.utils.Json.load(response.responseText, this) : null;
            
            // adapt
            if ( adapter ) {
                json = adapter( json );
            }
            // if ( args.adapter ) {
            //     json = args.adapter( json );
            // }

            // callback
            this.$callback( callback, json );
            // if ( args.callback ) {
            //     this.$callback( args.callback, json );
            // }

		}
        
	}
	
});
