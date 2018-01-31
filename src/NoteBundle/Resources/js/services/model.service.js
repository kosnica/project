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
        //serviceData.filters = {};

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

            const oneItemData = getRecord(id);
            return oneItemData;
        };

        serviceData.setNavigation = function(data)
        {
            serviceData.navigation = data;
        };

        serviceData.getNavigation = function()
        {
            return serviceData.navigation;
        };

        serviceData.add = function(data)
        {
            NoteService.save(data).$promise.then(function(responseData) {

                const dataObj = responseData.data;
                if(Object.keys(dataObj).length > 0)
                {
                    serviceData.noteData.push(dataObj);
                    originalData.push(dataObj);
                }
            });

        };

        serviceData.update = function(data)
        {
            NoteService.update({id:data.id}, data).$promise.then(function(responseData) {

                const dataObj = responseData.data;
                if(Object.keys(dataObj).length > 0)
                {
                    updateRecords(dataObj.id, dataObj);
                }
            });
        };

        serviceData.updateColor = function(id, color) {

            NoteService.updateColor({id:id}, {color: color}).$promise.then(function(responseData) {

                if (responseData.success)
                {
                    updateRecords(id, {color: color});
                }

            });
        };

        serviceData.updateStatus = function(id, status) {

            NoteService.updateStatus({id:id}, {status: status}).$promise.then(function(responseData) {

                if (responseData.success)
                {
                    updateRecords(id, {status: status}, true);
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

        serviceData.remove = function(id){

            NoteService.remove({id: id}).$promise.then(function(responseData) {

                removeData(id);
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


        function getRecord(id){

            const oneItemData =  serviceData.noteData.find(item => item.id === id);

            return oneItemData;
        }

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