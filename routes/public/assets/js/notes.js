$("#submit-btn").on("click", submitFunc);

var submitFunc = function(event) {
  event.preventDefault();

  var note = {
    title: noteTitle.val().trim(),
    text: noteText.val().trim()
  };

  if (!note.noteTitle || !note.noteText) {
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
      $noteAuthor.val("");
      $noteText.val("");
    });
};

function getNotes () {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(data) {
    var $listItems = [];

    // Loop through and build a list item for each quote returned from the db
    for (var i = 0; i < data.length; i++) {
      var quote = data[i];

      // Using the jQuery `data` method, we can attach data to an element for later use
      var $li = $("<li class='list-group-item'>").data(quote);
      var $row = $("<div class='row'>");
      var $col11 = $("<div class='col-11'>");
      var $quoteP = $("<p>").text('"' + quote.noteText + '"');
      var $authorP = $("<p class='float-right'>").text("- " + quote.noteTitle);
      var $clearFix = $("<div class='clearfix'>");
      var $ratingP = $("<p class='float-right'>").text(quote.rating);
      var $col1 = $("<div class='col-1'>");
      var $upIcon = $("<i class='fas fa-angle-up'>");
      var $downIcon = $("<i class='fas fa-angle-down'>");

      $li.append(
        $row.append(
          $col11.append($quoteP, $authorP, $clearFix, $ratingP),
          $col1.append($upIcon, $downIcon)
        )
      );

      $listItems.push($li);
    }

    $quotesList.empty();

    $quotesList.append($listItems);
  });
};