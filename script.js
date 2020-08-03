function openNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "200px";
}

function closeNav() {
  document.getElementsByClassName("sidebar")[0].style.width = "0";
}

var sidebarItems = document.getElementsByClassName("sidebarItem");

for (let i = 0; i < sidebarItems.length; i++) {
  if (screen.width <= 600) {
    sidebarItems[i].addEventListener("click", (e) => {
      e.preventDefault();
      closeNav();
    });
  }
}

var notesContainer = document.getElementsByClassName("notes")[0];

function addNote(text) {
    var noteCard = document.createElement("div");
    var noteText = document.createTextNode(text);
    noteCard.appendChild(noteText);
    notesContainer.insertBefore(noteCard, notesContainer.firstChild);
}


var noteInput = document.getElementById("noteInput");


function submitForm(e) {
  e.preventDefault();
  if (noteInput.value !== "") {
    addNote(noteInput.value)
    postNote(noteInput.value)
    noteInput.value = "";
  }

}

function getNotes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var notes = JSON.parse(xhttp.responseText)
        notes.forEach((note) => addNote(note.text))
    }
  };
  xhttp.open("GET", "http://localhost:3000/notes", true);
  xhttp.send();
}

getNotes()

function postNote(noteText) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/notes", true)
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
  var data = {
    "text" : noteText
  }
  xhttp.send(JSON.stringify(data))
}