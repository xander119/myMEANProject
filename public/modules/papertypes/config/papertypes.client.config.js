'use strict';

// Configuring the Articles module
angular.module('papertypes').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Papertypes', 'papertypes', 'dropdown', '/papertypes(/create)?');
		Menus.addSubMenuItem('topbar', 'papertypes', 'List Papertypes', 'papertypes');
		Menus.addSubMenuItem('topbar', 'papertypes', 'New Papertype', 'papertypes/create');
	}
]);