/*jshint esversion: 6 */
angular.module('notes', ['core.note']);


angular.
module('notes').
component('notes', {
    templateUrl:'views/notes/notes.html',
    require: {
        appCtrl: '^app'
    },
    controller:['$uibModal', 'DataModel',
        function NotesController($uibModal, DataModel) {

            const self = this;

            const promise = DataModel.loadData();

            promise.$promise.then(function (data) {

                DataModel.setNote(data);
                self.items = DataModel.getNote();

                if(data.length > 0)
                {
                    self.appCtrl.setNotesView('all-notes');
                }

            });

            self.openModal = function (){

                let strType = self.appCtrl.activeTab;
                if (self.appCtrl.activeTab === 'all-notes')
                {
                    strType = 'notes';
                }

                const modalData = {id: '', type: strType, title: '', note: '', strFunction: 'add'};
                setModal(modalData);
            };

            self.editModal = function (intNoteID){

                const oneNoteData = DataModel.getOne(intNoteID);
                const modalData = {id: intNoteID, type: oneNoteData.type, title: oneNoteData.title, note: oneNoteData.note, strFunction: 'update'};
                setModal(modalData);
            };

            self.updateStatus = function(intNoteID, status){

                DataModel.updateStatus(intNoteID, status);
            };

            self.emptyTrash = function(){

                DataModel.removeAll();
            };

            self.removeNote = function(noteID){

                DataModel.remove(noteID);
            };

            self.popoverContent = {templateUrl: 'views/notes/colorpicker.html'};

            self.changeColor = function(id, color) {

                DataModel.updateColor(id, color);
            };

            function setModal(modalData) {

                $uibModal.open({
                    ariaLabelledBy: 'modal-title-bottom',
                    ariaDescribedBy: 'modal-body-bottom',
                    templateUrl: 'views/notes/modal.html',
                    size: 'sm',
                    backdrop: 'static',
                    controller: function ($uibModalInstance) {

                        this.noteType = modalData.type;
                        this.title = modalData.title;
                        this.note = modalData.note;
                        this.navigation = DataModel.getNavigation();

                        this.getType = function(strType){
                            this.noteType = strType;
                        };

                        this.closeModal = $uibModalInstance.close;
                        this.regex = '(https?:\\/\\/.*\\.(?:png|jpg|jpeg))';
                        this.setNote = function (form){

                            if (form.$valid)
                            {
                                const objNote = {
                                    id: modalData.id,
                                    type: this.noteType,
                                    title: this.title,
                                    note: this.note,
                                    status: 'regular'
                                };
                                DataModel[modalData.strFunction](objNote);
                                $uibModalInstance.close();
                                self.appCtrl.setNotesView(self.appCtrl.activeTab);
                            }
                        };

                        this.isDisabled = function(item) {

                            if (self.appCtrl.activeTab === item || self.appCtrl.activeTab === 'all-notes')
                            {
                                return false;
                            }

                            return true;
                        };

                        this.isActive = function(item){

                            if (this.noteType === item)
                            {
                                return true;
                            }

                            return false;
                        };
                    },
                    controllerAs: '$ctrl'
                });
            }
        },
    ]
});