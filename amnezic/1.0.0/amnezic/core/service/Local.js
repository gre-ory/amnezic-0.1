Aria.classDefinition({
	$classpath : 'amnezic.service.Local',
	$extends : 'aria.templates.ModuleCtrl',
	$implements : [ 'amnezic.service.Fetcher' ],
	
	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function () {
		this.$logInfo("[constructor] Start...");
        aria.core.IOFiltersMgr.addFilter( 'amnezic.service.LibraryJsonReader' );        
	},
	
	// //////////////////////////////////////////////////
	// Destructor
	
	$destructor : function () {
		this.$logInfo("[destructor] Start...");
	},
	
	$prototype : {
		
		$publicInterfaceName : 'amnezic.service.Fetcher',

		// //////////////////////////////////////////////////
		// fetch

		fetch : function ( request, callback ) {
			this.submitJsonRequest("retrieve.action", parameters, {
				fn : "_loadData",
				scope : this,
				args : [ request, callback ]
			});
		}
        
        _fetch : function ( response, args ) {
			this.submitJsonRequest("retrieve.action", parameters, {
				fn : "_loadData",
				scope : this,
				args : callback
			});
		}
		
	}
	
});
