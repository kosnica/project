
angular.module('core.modal', []);

angular.
module('core.model').
factory('Modal', ['$uibModal', 'DataModel',
    function($uibModal, DataModel) {

    const serviceData = {};

    serviceData.openModal = function(modalData) {

        $uibModal.open({
            ariaLabelledBy: 'modal-title-bottom',
            ariaDescribedBy: 'modal-body-bottom',
            templateUrl: 'views/notes/modal.html',
            size: 'sm',
            backdrop: 'static',
            controller: function ($uibModalInstance) {

                const recordData = modalData.data;
                this.noteType = recordData.type;
                this.title = recordData.title;
                this.note = recordData.note;
                this.navigation = DataModel.getNavigation();

                this.getType = function(strType){

                    this.noteType = strType;
                    recordData.type = strType;
                };

                this.closeModal = $uibModalInstance.close;
                this.regex = '(https?:\\/\\/.*\\.(?:png|jpg|jpeg))';
                this.setNote = function (form){

                    if (form.$valid)
                    {
                        recordData.title = this.title;
                        recordData.note = this.note;

                        DataModel[modalData.strFunction](recordData, modalData.id);
                        $uibModalInstance.close();
                    }
                };

                this.isDisabled = function(item) {

                    if (modalData.active_tab === item || modalData.active_tab === 'all-notes')
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
    };


    return serviceData;

    }]
);