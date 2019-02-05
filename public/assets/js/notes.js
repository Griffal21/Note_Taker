//onload 
//function to diplay data




$(document).ready(function () {
$.ajax({
  url:"/api/notes",
  method:"GET"
}).then(data=>{
  console.log("here");
  console.log(data);
//call function in here



});


})//document ready function