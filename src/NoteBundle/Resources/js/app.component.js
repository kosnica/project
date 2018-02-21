/*jshint esversion: 6 */

angular.module('appComponent', []);


angular.
module('appComponent').
component('app', {
    templateUrl:'views/app.component.html',
    controller:[
        function AppController() {

            const self = this;

            self.notesView = "none";
            self.activeTab = "all-notes";

            self.setNotesView = function(value){

                self.notesView = value;
            };

            self.setActiveTab = function(value){

                self.activeTab = value;
            };

        }],
    controllerAs: "$ctrl"
});