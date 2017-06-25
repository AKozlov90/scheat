(function() {

  'use strict';

  var ENTER_KEY = 13;
  var newTodoDom = document.getElementById('new-todo');
  var newContent = document.getElementById('new-content');
  var syncDom = document.getElementById('sync-wrapper');
  var editBtn = document.getElementById('editBtn');
  var db = new PouchDB('todos');
  var remoteCouch = false;
  var draggableState = false;
  var allNotes = document.getElementsByClassName('note-Container');
  var lastDragTargetId
  

db.changes({
  since: 'now',
  live: true
}).on('change', showTodos);





  // Create DB doc
  function addTodo(title, content) {
  var todo = {
    _id: new Date().toISOString(),
    title: title, 
    content: content,
  };

  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a scheat!');
    }
  });
}


  // Show all current
  function showTodos() {
  db.allDocs({include_docs: true, descending: true}, function(err, doc) {
    redrawTodosUI(doc.rows);
 

  });
  }



  // User pressed the delete button
  function deleteButtonPressed(todo) {
  db.remove(todo);
}



  // The input box when editing a todo has blurred, we should save
  // the new title or delete the todo if the title is empty
   function todoBlurred(todo, event) {
      var trimmedText = event.target.value.trim();
 //     if (!trimmedText) {
 //       db.remove(todo);
 //     } else {
        todo.content = trimmedText;
        db.put(todo);
      }
    

  // Initialise a sync with the remote server
  function sync() {
  }


  // There was some form or error syncing
  function syncError() {
    syncDom.setAttribute('data-sync-state', 'error');
  }

  // Client input double click on note
  function todoDblClicked(todo) {
    var submitcontent = document.getElementById('label_' + todo._id);
    var submittitle = document.getElementById('title_' + todo._id);
    var submittitlebtn = document.getElementById('btnacc_' + todo._id);
    submitcontent.contentEditable = 'true';
    submittitle.contentEditable = 'true';
    submittitlebtn.classList.toggle('editing');
    submitcontent.focus();
    
  }

  // If they press enter while editing an entry, blur it to trigger save
  // (or delete)
  function SaveBtnPressed(todo, event) {
       var inputEditTodo = document.getElementById('label_' + todo._id);
       var submitTitle = document.getElementById('title_' + todo._id);
       inputEditTodo.blur();
       inputEditTodo.contentEditable = 'false';
       submitTitle.contentEditable = 'false';
       todo.content = inputEditTodo.innerHTML;
       todo.title = submitTitle.innerHTML;
       db.put(todo);
    console.log('Saved!')
       
 }
  
// ACCORDION

function foldAccordion(todo, event) {
var foldArea = document.getElementById('panel_' + todo._id);
  console.log('event = ' + event + 'And todo =' + todo + 'ID =' + todo.id);
        if (event.target.classList.contains('drop-target') === true){
                            if (foldArea.style.display === "block" ) {
                                        foldArea.style.display = "none";
        }else {
                      foldArea.style.display = "block";
        }} else if (draggableState === true ) {
          console.log('You are in edit mode, no accordion')
        }else if (foldArea.style.display === "block" ) {
            foldArea.style.display = "none";
        }else {
                      foldArea.style.display = "block";

        }
    
}
 

  
  
  
  
  
  
  
// DRAG ACTIVATION
  function initMoveMode(event) {
  var allNotes = document.getElementsByClassName('note-Container');
  var allTitles = document.getElementsByClassName('btnacc');
  var i;
    
  //decide if drag off or on
    if (draggableState === true){
       draggableState = false;
     } else {
       draggableState = true;
     }
    
    // Make Draggable On or Off
for (i = 0; i < allNotes.length; i++) {
         console.log('Status = ' + draggableState)
    allNotes[i].setAttribute('draggable', draggableState);
       }
for (i = 0; i< allTitles.length; i++) {
  allTitles.classList
}
    
    
  }
  //drag activation is on Edit Button
      editBtn.addEventListener('click', initMoveMode.bind(this, event));
  // 
  
  
  
      
                          
  function dropTargetAccordion(event, todo) {

  //var dropHere = event.target; 
  //  if ( event.target.classList.contains == "drop-target" ) {
  //       event.target.style.border = "3px dotted green";
    }
  
  // By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
                          
 function draggedOnNote(todo, event) {
  console.log(todo._id);
 if ( todo._id != lastDragTargetId){
   console.log('timer started 3000')
   lastDragTargetId = todo._id;
   setTimeout(foldAccordion(todo, event), 3000)
 }
    
//  this.insertbefore(draggedNote, dropHere);
}

  
  // building a note
  function createTodoListItem(todo) {
    
    //Button Label && Title
    var title = document.createElement('div');
    title.appendChild(document.createTextNode(todo.title));
    title.id = 'title_' + todo._id;
    title.className = 'noteTitle, appendNoteOver';
    title.innerHTML = todo.title;
    
    //Accordion Button
    var btnacc = document.createElement('BUTTON');
    //btnacc.appendChild( document.createTextNode(todo.title));
    btnacc.className = 'btnacc, btn-primary, accordion, appendNoteOver';
    btnacc.type = 'button';
    btnacc.appendChild(title);
    btnacc.id = 'btnacc_' + todo._id;
    btnacc.addEventListener('click', foldAccordion.bind(this, todo));

    //save Icon
    var SaveIcn = document.createElement('span');
    SaveIcn.className = 'glyphicon glyphicon-save-file' ;

    //save Button
    var SaveBtn = document.createElement('button');
    SaveBtn.className = 'save';
    SaveBtn.appendChild(SaveIcn);
    SaveBtn.addEventListener('click', SaveBtnPressed.bind(this, todo));
    
    //Delete Icon
    var deleteIcn = document.createElement('span');
    deleteIcn.className = 'glyphicon glyphicon-remove-sign' ;
    
    // Delete Button
    var deleteBtn = document.createElement('button');
    deleteBtn.className = 'destroy';
    deleteBtn.addEventListener( 'click', deleteButtonPressed.bind(this, todo));
    deleteBtn.appendChild(deleteIcn);
    
    //Note Content div  edit by dblclick
    var label = document.createElement('div');
    label.addEventListener('dblclick', todoDblClicked.bind(this, todo)); // Edit trigger
    label.id = 'label_' + todo._id;
    label.className = 'col-sm-11';
    label.innerHTML = todo.content;
    
    // controlBar viewed when in edit mode
    var controlNote = document.createElement('div');
    controlNote.className = 'controlNote col-sm-1';
    controlNote.appendChild(SaveBtn);
    controlNote.appendChild(deleteBtn);
    
    
    // Notes unfolded Area
    var panel = document.createElement('div');
    panel.className = 'panel row';
    panel.id = 'panel_' + todo._id;
    panel.appendChild(label);
    panel.appendChild(controlNote);
    panel.style.display = 'none'

    // outer wrapper of first Note Child of this List Item
    var divDisplay = document.createElement('li');
    divDisplay.id = 'view_' + todo._id;
    divDisplay.id = 'sublist';
    divDisplay.appendChild(btnacc);
    divDisplay.appendChild(panel);
    
    // SubList to order childs
    var subList = document.createElement('ul')
    subList.id = 'sublist_' + todo._id;
    subList.className = 'sublist'
    subList.appendChild(divDisplay);
    
    // The List Item    ! Note Master Parent
    var li = document.createElement('li');
    li.id = 'li_' + todo._id;
    li.className = 'note-Container';
    li.appendChild(subList);
    li.addEventListener("dragover", draggedOnNote.bind(this, todo));
    
    
    
    // Master Parent becomes object
    return li;
  }

    // Create List of Notes 

  //  building the Lists Items
  function redrawTodosUI(todos) {
    var ul = document.getElementById('todo-list');
    ul.innerHTML = '';
    todos.forEach(function(todo) {
      ul.appendChild(createTodoListItem(todo.doc));
    });
  }

  // Handling the enter Key in the Quick creation form
  function newTodoKeyPressHandler( event ) {
    if (event.keyCode === ENTER_KEY) {
      addTodo(newTodoDom.value, newContent.value);
      newTodoDom.value = '';
      newContent.value = '';
    }
  }

  //Applying the Key handling to the form
  function addEventListeners() {
    newTodoDom.addEventListener('keypress', newTodoKeyPressHandler, false);
    newContent.addEventListener('keypress', newTodoKeyPressHandler, false);
    editBtn.addEventListener('keypress', initMoveMode, false);
    
  }

  addEventListeners();
  showTodos();

  if (remoteCouch) {
    sync();
  }

})();










