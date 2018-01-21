angular.module('core.note', ['ngResource']);

angular.
module('core.note').
factory('NoteService', ['$resource',
    function($resource) {
        return $resource('/project/app_dev.php/:collection/:id/:action', {

            collection: "@collection",
            id: "@id",
            action: "@action"
        }, {
            query: {
                method: 'GET',
                isArray:true,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            get: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            save: {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            update: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            remove: {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            removeAll: {
                method: 'DELETE',
                isArray:true,
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes"
                }
            },
            updateStatus: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes",
                    action: "updatestatus"
                }
            },
            updateColor: {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "notes",
                    action: "updatecolor"
                }

            },
            getTypes: {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {
                    collection: "types"
                }

            },
        });
    }
]);