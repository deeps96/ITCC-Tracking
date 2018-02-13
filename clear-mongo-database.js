db.getCollectionNames().forEach(
	function(collection) { 
		if (!collection.contains('system.')) {
			db[collection].remove( { } );
		}
	}
);

