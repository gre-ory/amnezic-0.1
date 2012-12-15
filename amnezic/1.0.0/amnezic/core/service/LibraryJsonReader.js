Aria.classDefinition({
	$classpath : 'amnezic.service.LibraryJsonReader',
	$extends : 'aria.core.IOFilter',
	
	// //////////////////////////////////////////////////
	// Constructor
	
	$constructor : function ( library ) {
		this.library = library;
		this.$IOFilter.constructor.call(this);		
	},
	
	$prototype : {
		
		// //////////////////////////////////////////////////
		// On request
		
		onRequest : function ( request ) {
			this.redirectToFile( request, 'library/' + this.library_file + '.json' );
		}
	
	}
	
});
