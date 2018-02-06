/*jshint esversion: 6 */

angular.module('noteComponent', ['core.note']);

angular.
module('noteComponent').
component('note', {
    templateUrl: 'views/notes/note.component.html',
    bindings: {
        key: '<'
    },
    controller:['DataModel', 'Modal',
     function noteController(DataModel, Modal) {

         const self = this;

         self.popoverContent = {templateUrl: 'views/notes/colorpicker.html'};

         self.changeColor = function(id, color) {

             DataModel.updateColor(id, color);
         };

         self.removeNote = function(noteID){

             DataModel.remove(noteID);
         };

         self.updateStatus = function(intNoteID, status){

             DataModel.updateStatus(intNoteID, status);
         };

         self.editModal = function (intNoteID){

             const oneNoteData = DataModel.getOne(intNoteID);
             const modalData = {id: intNoteID,
                                type: oneNoteData.type,
                                title: oneNoteData.title,
                                note: oneNoteData.note,
                                strFunction: 'update',
                                active_tab: self.key.active_tab};
             Modal.openModal(modalData);
         };

     }],
    controllerAs: '$ctrl'
});