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

             DataModel.partialUpdate(id, {color: color});
         };

         self.removeNote = function(noteID){

             DataModel.remove(noteID);
         };

         self.updateStatus = function(intNoteID, status){

             DataModel.partialUpdate(intNoteID, {status: status});
         };

         self.show = false;

         self.hover = function(boolShow)
         {
             self.show = boolShow;
         };

         self.editModal = function (intNoteID){

             const oneNoteData = DataModel.getOne(intNoteID);
             const data = {  type: oneNoteData.type,
                             title: oneNoteData.title,
                             note: oneNoteData.note,
                             status: oneNoteData.status,
                             color: oneNoteData.color};

             const modalData = { data: data,
                                 id: intNoteID,
                                 strFunction: 'update',
                                 active_tab: self.key.active_tab};

             Modal.openModal(modalData);
         };

     }],
    controllerAs: '$ctrl'
});