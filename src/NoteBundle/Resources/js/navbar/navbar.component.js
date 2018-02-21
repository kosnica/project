/*jshint esversion: 6 */

angular.module('navbar', ['core.note']);


angular.
    module('navbar').
    component('navbar', {
        templateUrl:'views/navbar/navbar.html',
        bindings: {
            key: '<'
        },
        controller:['DataModel',
            function NavbarController(DataModel) {

                const self = this;

                self.activeTab = 'all-notes';
                const promise = DataModel.loadTypeData();
                promise.$promise.then(function (data) {

                    if (data)
                    {
                        DataModel.setNavigation(data);
                        self.items = DataModel.getNavigation();
                    }
                });

                self.setFilter =  function(type, status) {

                    const data = {status: status, type: type};
                    DataModel.setFilter(data);

                    if (DataModel.filter() || (type === 'trash'))
                    {
                        self.key.setNotesView(type);
                    }
                    else
                    {
                        self.key.setNotesView('none');
                    }

                    self.activeTab = type;

                    self.key.setActiveTab(type);
                };
            }
        ]
    });