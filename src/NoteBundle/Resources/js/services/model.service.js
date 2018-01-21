/*jshint esversion: 6 */

angular.module('core.model', []);

angular.
module('core.model').
factory('DataModel', ['NoteService', '$filter',
    function(NoteService, $filter) {

        var serviceData = {};
        var filterType = 'all-notes';
        var filterStatus = 'regular';
        var originalData = [];

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

            var oneItemData = getRecord(id);
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

                serviceData.noteData.push(data);
                originalData.push(data);
            });

        };

        serviceData.update = function(data)
        {
            NoteService.update({id:data.id}, data).$promise.then(function(responseData) {

                updateRecords(data.id, data);
                //filterData();
            });

        };

        serviceData.updateColor = function(id, color) {

            NoteService.updateColor({id:id}, {color: color}).$promise.then(function(data) {

                updateRecords(id, {color: color});
                filterData();
            });
        };

        serviceData.updateStatus = function(id, status) {

            NoteService.updateStatus({id:id}, {status: status}).$promise.then(function(data) {

                updateRecords(id, {status: status});
                return filterData();
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

            NoteService.remove({id: id}).$promise.then(function(data) {

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

            var oneItemData =  serviceData.noteData.find(function(item){

                return item.id === id;
            });

            return oneItemData;
        }

        function updateRecords(id, data)
        {
            var index = originalData.findIndex(function(note) {

                return  note.id === id;
            });

            for (let alias in data)
            {
                originalData[index][alias] = data[alias];
            }
        }

        function removeData(id)
        {
            var index = serviceData.noteData.findIndex(function(note) {
                return  note.id === id;
            });

            serviceData.noteData.splice(index, 1);
            originalData.splice(index, 1);
        }

        function filterData()
        {
            var filteredData = [];

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