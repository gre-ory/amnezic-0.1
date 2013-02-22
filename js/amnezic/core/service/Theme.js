Aria.classDefinition({
	$classpath : 'amnezic.core.service.Theme',
    $extends : 'amnezic.core.service.Lite',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$Lite.constructor.call( this, controller );
        this.tb = 'theme';
    },
    
	$prototype : {
        
        // //////////////////////////////////////////////////
        // retrieve_all

        retrieve_all : function( on_success ) {
            this.$logDebug( 'retrieve_all>' );
            this.load( this.tb, 'select.all', {}, { fn: this.adapt_all, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // retrieve_all_actives

        retrieve_all_actives : function( on_success ) {
            this.$logDebug( 'retrieve_all_actives>' );
            this.load( this.tb, 'select.all.actives', {}, { fn: this.adapt_all, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // retrieve
        
        retrieve : function( oid, on_success ) {
            this.$logDebug( 'retrieve> oid: ' + oid );
            this.load( this.tb, 'select', { oid: oid }, { fn: this.adapt, scope: this }, on_success );
        },

        // //////////////////////////////////////////////////
        // add

        add : function( title, on_success ) {
            this.$logDebug( 'add> title: ' + title );
            this.load( this.tb, 'insert', { title: title }, { fn: this.adapt_oid, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // activate

        activate : function( oid, on_success ) {
            this.$logDebug( 'activate> oid: ' + oid );
            this.load( this.tb, 'activate', { oid: oid }, { fn: this.adapt_single, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // deactivate

        deactivate : function( oid, on_success ) {
            this.$logDebug( 'deactivate> oid: ' + oid );
            this.load( this.tb, 'deactivate', { oid: oid }, { fn: this.adapt_single, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // adapters

        adapt_all : function ( json ) {
            // this.$logDebug( 'adapt_all>' );
            var items = this.adapt_rows( json );
            for ( var i = 0 ; i < items.length ; i++ ) {
                items[i] = this.normalize( items[i] );
            }
            return items;
        },
        
        adapt : function ( json ) {
            // this.$logDebug( 'adapt>' );
            var item = this.adapt_row( json ),
            item = this.normalize( item );
            return item;
        },
        
        normalize : function ( item ) {
            // this.$logDebug( 'normalize>' );
            if ( item ) {
                item.active = item.active && ( item.active === 1 );
            }
            return item;
        }
        
	}
	
});
