
angular.module('navbar', ['core.note']);


angular.
    module('navbar').
    component('navbar', {
        templateUrl:'views/navbar/navbar.html',
        transclude: true,
        require: {
            appCtrl: '^app'
        },
        controller:['DataModel',
            function NavbarController(DataModel) {

                var self = this;
                self.activeTab = 'all-notes';
                var promise = DataModel.loadTypeData();
                promise.$promise.then(function (data) {

                    if (data)
                    {
                        DataModel.setNavigation(data);
                        self.items = DataModel.getNavigation();
                    }
                });

                self.setFilter =  function(type, status) {

                    var data = {status: status, type: type};
                    DataModel.setFilter(data);

                    if (DataModel.filter())
                    {
                        self.appCtrl.setNotesView(type);
                    }
                    else
                    {
                        self.appCtrl.setNotesView('none');
                    }

                    self.activeTab = type;

                    var tabName = "";

                    if (self.items[type])
                    {
                        tabName = self.items[type].name;
                    }

                    self.appCtrl.setActiveTab(type, tabName);
                };
            }
        ]
    });