
angular.module('appComponent', []);


angular.
module('appComponent').
component('app', {
    templateUrl:'views/app.component.html',
    controller:[
        function AppController() {

            var self = this;

            self.notesView = "none";
            self.activeTab = "all-notes";
            self.buttonLabel = "Add First Note";

            self.setNotesView = function(value){

                self.notesView = value;
            };

            self.setActiveTab = function(value, tabName){

                self.buttonLabel = "Add First " + tabName + " Note";
                self.activeTab = value;
            };

        }]
});