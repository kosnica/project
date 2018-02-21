/*jshint esversion: 6 */

angular.module('core.model', []);

angular.
module('core.model').
factory('DataModel', ['NoteService', '$filter',
    function(NoteService, $filter) {

        const serviceData = {};
        let filterType = 'all-notes';
        let filterStatus = 'regular';
        let originalData = [];

        serviceData.noteData = [];
        serviceData.navigation = [];

        serviceData.loadData = function(){

            return NoteService.query();
        };

        serviceData.loadTypeData = function(){

            return NoteService.getTypes();
        };

        serviceData.setNote = function(data)
        {
            originalData = data;
            filterData();
        };

        serviceData.getNote = function()
        {
            return serviceData.noteData;
        };

        serviceData.getOne = function(id){

            return serviceData.noteData.find(item => item.id === id);
        };

        serviceData.setNavigation = function(data)
        {
            serviceData.navigation = data;
        };

        serviceData.getNavigation = function()
        {
            return serviceData.navigation;
        };

        serviceData.add = function(data, id)
        {
            NoteService.save(data).$promise.then(function(responseData) {

                if(Object.keys(responseData).length > 0)
                {
                    serviceData.noteData.push(responseData);
                    originalData.push(responseData);
                }
            });

        };

        serviceData.update = function(data, id)
        {
            NoteService.update({id:id}, data).$promise.then(function(responseData) {

                if(Object.keys(responseData).length > 0)
                {
                    updateRecords(id, responseData);
                }
            });
        };

        serviceData.partialUpdate = function(id, record) {

            NoteService.partialUpdate({id:id}, record).$promise.then(function(responseData) {

                if (responseData)
                {
                    updateRecords(id, record, true);
                }

            });
        };

        serviceData.remove = function(id){

            NoteService.partialUpdate({id:id}, {status: 'removed'}).$promise.then(function(responseData) {

                if (responseData)
                {
                    removeData(id);
                }

            });
        };

        serviceData.removeAll = function(){

            NoteService.removeAll().$promise.then(function(data) {

                for (let id of data)
                {
                   removeData(id);
                }
            });
        };

        serviceData.setFilter = function(data)
        {
            filterType = data.type;
            filterStatus = data.status;
        };

        serviceData.filter = function()
        {
            return filterData();
        };

        function updateRecords(id, data, boolFilter = false)
        {
            const index = originalData.findIndex(note => note.id === id);

            for (const alias in data)
            {
                originalData[index][alias] = data[alias];
            }

            if (boolFilter)
            {
                filterData();
            }
            else
            {
                const arrayIndex = serviceData.noteData.findIndex(note => note.id === id);

                for (const alias in data)
                {
                    serviceData.noteData[arrayIndex][alias] = data[alias];
                }
            }
        }

        function removeData(id)
        {
            const index = serviceData.noteData.findIndex(note => note.id === id);
            serviceData.noteData.splice(index, 1);
            const arrayIndex = originalData.findIndex(note => note.id === id);
            originalData.splice(arrayIndex, 1);
        }

        function filterData()
        {
            let filteredData = [];

            if (filterType === 'all-notes' ||  filterType === 'trash')
            {
                filteredData = $filter('filter')(originalData, {status: filterStatus});
            }
            else
            {
                filteredData = $filter('filter')(originalData, {status: filterStatus, type : filterType });
            }

            serviceData.noteData.length = 0;

            if (filteredData.length > 0)
            {
                filteredData.map(function(obj){

                    serviceData.noteData.push(obj);
                });

                return true;
            }

            return false;
        }

        return serviceData;
    }
]);