/*jshint esversion: 6 */
angular.module('notes', ['core.note']);


angular.
module('notes').
component('notes', {
    templateUrl:'views/notes/notes_list.html',
    bindings: {
        key: '<'
    },
    controller:['Modal', 'DataModel',
        function NotesController(Modal, DataModel) {

            const self = this;

            const promise = DataModel.loadData();

            promise.$promise.then(function (data) {

                DataModel.setNote(data);
                self.items = DataModel.getNote();

                if(data.length > 0)
                {
                    self.key.setNotesView('all-notes');
                }

            });

            self.openModal = function (){

                let strType = self.key.activeTab;
                if (self.key.activeTab === 'all-notes')
                {
                    strType = 'notes';
                }

                const modalData = {id: '',
                                   type: strType,
                                   title: '',
                                   note: '',
                                   strFunction: 'add',
                                   active_tab: self.key.activeTab};

                Modal.openModal(modalData);
                self.key.setNotesView(self.key.activeTab);
            };

            self.emptyTrash = function(){

                DataModel.removeAll();
            };
        },
    ]
});