//import { getEnabledCategories } from "trace_events";

//onload 
$(document).ready(function () {
getNotes();
});//document ready function



function getNotes() {
$.ajax({
  url:"/api/notes",
  method:"GET"
}).then(function (data) {
 // console.log("here");
  console.log(data);
//render notes

var blockArr = [];
for (var i = 0; i < data.length; i++){
  //console.log(i + " " + data.length);
  var noteData = data[i];
 // console.log(data[i].title);
  //var block= "";
  //block = "<br/><br/>" + data[i].title + "<br/>" + data[i].body;

  //right, so behind this I was working so long trying to get this thing to display.  I took our hacky code from our project and changed variables
  //I didn't think it would work but it does!  Doesn't look pretty but it's gonna have to do, I'm running out of time.
  var taskCard = `<div id = 'task${data[i].id}'class='card task-inner'><div class='card-header cardHeadInner'>${data[i].title}<button type='button' index = '${data[i].id}'class='btn btn-outline-success btn-sm clearTask'> <i class='fas fa-clipboard-check'></i></button></div><div class='card-body'>${data[i].body}</div></div>`
  blockArr.push(taskCard);
  $("#notes").append(taskCard);
}
// console.log(blockArr);
//     var vPool="";
//     jQuery.each(blockArr, function(i, val) {
//         vPool += val;
//     });
//     //We add vPool HTML content to #myDIV
//     $('#notes').html(vPool);
});
};//getNotes


//function for adding note
var noteTitle = $("#title");
var noteBody = $("#text");
$("#submit").click(function () {
  event.preventDefault();
  $("#notes").empty();
  var note = {
    title: noteTitle.val().trim(),
    body: noteBody.val().trim()
  };

  if (!note.title || !note.body) {
    alert("Please fill out all the required fields!");
    return;
  }

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: note
  })
    .then(function() {
      getNotes();
      noteTitle.val("");
      noteBody.val("");
    });

});//submit button

//function to remove notes


//I know this function doesn't work, I ran out of time.

$("#notes").on("click", ".clearTask", function () {
  event.preventDefault();
  var note = $(this).parents("#notes").data();
  var index = $(this).attr("index");
  //database.ref(taskRefrence[index]).remove();
  $(`#notes${index}`).remove();

  $.ajax({
    url: `/api/notes/${index}`,
    method: "DELETE",
    data: note
  })
    .then(function() {
      getNotes();
      noteTitle.val("");
      noteBody.val("");
    });
});