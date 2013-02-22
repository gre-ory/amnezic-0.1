Aria.classDefinition({
	$classpath : 'amnezic.core.service.Lite',
    $extends : 'aria.core.JsObject',
    $dependencies: [
        'amnezic.core.service.JsonUrlLoader'
    ],
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$JsObject.constructor.call(this);
        this.controller = controller;
    },
    
	$prototype : {

		// //////////////////////////////////////////////////
		// load

        load : function ( table, query, parameters, adapter, on_success, on_error ) {
            // this.$logDebug( 'load>' );
            
            var service = new amnezic.core.service.JsonUrlLoader(),
                url = this.controller.config.lite_url,
                db = this.controller.config.lite_db,
                tb = table || '',
                qr = query || '',
                json_url = url + '?db=' + db + '&tb=' + tb + '&qr=' + qr;
            
            if ( parameters ) {
                for ( var key in parameters ) {
                    json_url = json_url + '&' + key + '=' + parameters[key];
                }
            }

            if ( !on_success || typeof( on_success ) == 'string' ) {
                on_success = { fn: this.on_success, scope: this, args: on_success };    
            }
            if ( !on_error || typeof( on_error ) == 'string' ) {
                on_error = { fn: this.on_error, scope: this, args: on_error };    
            }
            service.load_json_url( json_url, adapter, on_success, on_error );
		},

        // //////////////////////////////////////////////////
		// on_success
                
        on_success : function ( json, message ) {
            this.$logDebug( 'on_success> json: ' + json + ' message: ' + message );
            var service = this.controller.get_service();
            service && service.message && service.message.info( ( message ? message + ': ' : '' ) + json );
        },

        // //////////////////////////////////////////////////
		// on_error
                
        on_error : function ( error, message ) {
            this.$logDebug( 'on_error> error: ' + error + ' message: ' + message );
            var service = this.controller.get_service();
            service && service.message && service.message.warning( ( message ? message + ': ' : '' ) + error );
        },

		// //////////////////////////////////////////////////
		// adapters
                
        adapt_success : function ( json ) {
            this.$logDebug( 'adapt_nb>' );
            json = json || {};
            return json.success ? {} : { error: json.error || 'unknown error' };
        },
        
        adapt_nb : function ( json ) {
            this.$logDebug( 'adapt_nb>' );
            json = json || {};
            return json.success ? { json: json.nb } : { error: json.error || 'nb not found' };
        },
        
        adapt_single : function ( json ) {
            this.$logDebug( 'adapt_nb>' );
            json = json || {};
            json.success = ( json.success && ( json.nb == 1 ) );
            return json.success ? {} : { error: json.error || 'unknown error' };
        },
        
        adapt_multi : function ( json ) {
            this.$logDebug( 'adapt_nb>' );
            json = json || {};
            json.success = ( json.success && ( json.nb > 0 ) );
            return json ? {} : { error: json.error || 'unknown error' };
        },

        adapt_oid : function ( json ) {
            this.$logDebug( 'adapt_nb>' );
            json = json || {};
            return json.success ? { json: json.oid } : { error: json.error || 'oid not found' };
        },

        adapt_rows : function ( json ) {
            this.$logDebug( 'adapt_rows>' );
            json = json || {};
            return json.success ? { json: json.rows || [] }: { error: json.error || 'rows not found' };
        },

        adapt_row : function ( json ) {
            this.$logDebug( 'adapt_row>' );
            json = json || {};
            return json.success ? { json: json.row || {} } : { error: json.error || 'row not found' };
        }
        
	}
	
});
