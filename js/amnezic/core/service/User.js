Aria.classDefinition({
	$classpath : 'amnezic.core.service.User',
    $extends : 'amnezic.core.service.Lite',
    
    // //////////////////////////////////////////////////
    // constructor
    
    $constructor : function ( controller ) {
        this.$Lite.constructor.call( this, controller );
        this.tb = 'user';
    },
    
	$prototype : {

        // //////////////////////////////////////////////////
        // retrieve_all_by_game

        retrieve_all_by_game : function( game, on_success ) {
            this.$logDebug( 'retrieve_all_by_game> game: ' + game );
            this.load( this.tb, 'select.all.by.game', { game: game }, { fn: this.adapt_all, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // retrieve
        
        retrieve : function( oid, on_success ) {
            // this.$logDebug( 'retrieve> oid: ' + oid );
            this.load( this.tb, 'select', { oid: oid }, { fn: this.adapt, scope: this }, on_success );
        },

        // //////////////////////////////////////////////////
        // add

        add : function( game, name, on_success ) {
            // this.$logDebug( 'add> game: ' + game + ' name: ' + name );
            this.load( this.tb, 'insert', { game: game, name: name }, { fn: this.adapt_oid, scope: this }, on_success );
        },

        // //////////////////////////////////////////////////
        // update_name

        update_name : function( oid, name, on_success ) {
            // this.$logDebug( 'update> name: ' + name );
            this.load( this.tb, 'update.name', { oid: oid, name: name }, { fn: this.adapt_single, scope: this }, on_success );
        },

        // //////////////////////////////////////////////////
        // update_card

        update_card : function( oid, card, on_success ) {
            // this.$logDebug( 'update> card: ' + card );
            this.load( this.tb, 'update.card', { oid: oid, card: card }, { fn: this.adapt_single, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // activate

        activate : function( oid, on_success ) {
            // this.$logDebug( 'activate> oid: ' + oid );
            this.load( this.tb, 'activate', { oid: oid }, { fn: this.adapt_single, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // deactivate

        deactivate : function( oid, on_success ) {
            // this.$logDebug( 'deactivate> oid: ' + oid );
            this.load( this.tb, 'deactivate', { oid: oid }, { fn: this.adapt_single, scope: this }, on_success );
        },
        
        // //////////////////////////////////////////////////
        // remove

        remove : function( oid, on_success ) {
            // this.$logDebug( 'remove> oid: ' + oid );
            this.load( this.tb, 'delete', { oid: oid }, { fn: this.adapt_single, scope: this }, on_success );
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
