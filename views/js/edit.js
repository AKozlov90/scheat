 
  var draggedNote
  var dropHere
/* Events fired on the drag target */

document.addEventListener("dragstart", function(event) {
    // The dataTransfer.setData() method sets the data type and the value of the dragged data
   draggedNote = event.target;
  event.target.classList.add('dragggedthingig')
  console.log('draggedNote set to ='+ event.target);
    
  //  event.dataTransfer.setData("Text", event.target.id);
    // Output some text when starting to drag the p element
    //document.getElementById("demo").innerHTML = "Started to drag the p element.";
    
    // Change the opacity of the draggable element
    event.target.style.opacity = "0.4";
  
  event.dataTransfer.effectAllowed = 'move';
  
  //dragover(event.target);
});

// While dragging the p element, change the color of the output text
document.addEventListener("drag", function(event) {
   // document.getElementById("demo").style.color = "red";
});

// Output some text when finished dragging the p element and reset the opacity
document.addEventListener("dragend", function(event) {
   // document.getElementById("demo").innerHTML = "Finished dragging the p element.";
    event.target.style.opacity = "1";
});


/* Events fired on the drop target */
/*
// When the draggable p element enters the droptarget, change the DIVS's border style
document.addEventListener("dragenter", function(todo, event) {
  //var dropHere = event.target; 
  //  if ( event.target.classList.contains == "drop-target" ) {
  //       event.target.style.border = "3px dotted green";
  console.log(todo._id);
    });
*/
// By default, data/elements cannot be dropped in other elements. To allow a drop, we must prevent the default handling of the element
document.addEventListener("dragover", function(event) {
    event.preventDefault();
  event.target.classList.add('drop-target');

});

// When the draggable p element leaves the droptarget, reset the DIVS's border style
document.addEventListener("dragleave", function(event) {
    if ( event.target.className == "drop-target" ) {
        event.target.classList.remove('drop-target') ;
    }
});

/* On drop - Prevent the browser default handling of the data (default is open as link on drop)
   Reset the color of the output text and DIV's border color
   Get the dragged data with the dataTransfer.getData() method
   The dragged data is the id of the dragged element ("drag1")
   Append the dragged element into the drop element
*/
document.addEventListener("drop", function(event) {
    event.preventDefault();
  //  if ( event.target.className == "drop-target" ) {
        //document.getElementById("demo").style.color = "";
        //event.target.style.border = "";
        var data = event.dataTransfer.getData("Text");
           var dropTarget = event.target;
  
  if (dropTarget.ClassList.contains('content-family') === true){
                dropHere = event.target.closest('ul.sublist');
             // var draggedNoteNode = draggedNote.dataTransfer.getData();
        console.log('draggedNote = '+draggedNote);
          console.log('dropHere = '+dropHere);

        draggedNote.parentNode.insertBefore(draggedNote, dropHere);
   event.dataTransfer.dropEffect = "move"
    
    
  }else{
            dropHere = event.target.closest('li.note-Container');
             // var draggedNoteNode = draggedNote.dataTransfer.getData();
        console.log('draggedNote = '+draggedNote);
          console.log('dropHere = '+dropHere);
  }
        draggedNote.parentNode.insertBefore(draggedNote, dropHere);
   event.dataTransfer.dropEffect = "move"

    }
);
  