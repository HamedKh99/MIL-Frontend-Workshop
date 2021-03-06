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

var notesSidebarItem = sidebarItems[0];
var archiveSidebarItem = sidebarItems[1];


notesSidebarItem.addEventListener('click', (e) => {
  notesSidebarItem.classList.add('active')
  archiveSidebarItem.classList.remove('active')
  getNotes()
})

archiveSidebarItem.addEventListener('click', (e) => {
  archiveSidebarItem.classList.add('active')
  notesSidebarItem.classList.remove('active')
  document.getElementsByClassName('noteForm')[0].style.display = 'none'
  getArchive()
})


var notesToShow = [];

var notesContainer = document.getElementsByClassName("notes")[0];

function addNote(title, body, color, id) {
  var noteCard = document.createElement("div");
  noteCard.style.backgroundColor = color;

  var titleText = document.createTextNode(title);
  var noteTitle = document.createElement("h4");
  noteTitle.appendChild(titleText);
  noteTitle.style.marginTop = 0;

  var bodyText = document.createTextNode(body);
  var noteBody = document.createElement("span");
  noteBody.appendChild(bodyText);

  var noteFooter = document.createElement("div");
  noteFooter.style.display = "flex";
  noteFooter.style.flexDirection = "row";
  noteFooter.style.justifyContent = "center";
  noteFooter.style.marginLeft = 0;

  var pinButton = document.createElement("button");
  var pinIcon = document.createElement("i");
  pinButton.className = "iconButton";
  pinIcon.className = "material-icons";
  var pinText = document.createTextNode("push_pin");
  pinIcon.appendChild(pinText);
  pinButton.appendChild(pinIcon);
  noteFooter.appendChild(pinButton);

  var archiveButton = document.createElement("button");
  archiveButton.addEventListener("click", (e) => {
    postArchive(title, body, color, id);
    archiveNote(id);
  });
  var archiveIcon = document.createElement("i");
  archiveButton.className = "iconButton";
  archiveIcon.className = "material-icons";
  var archiveText = document.createTextNode("archive");
  archiveIcon.appendChild(archiveText);
  archiveButton.appendChild(archiveIcon);
  noteFooter.appendChild(archiveButton);

  noteCard.appendChild(noteTitle);
  noteCard.appendChild(noteBody);
  noteCard.appendChild(noteFooter);

  notesContainer.insertBefore(noteCard, notesContainer.firstChild);
}

var selectedColor = null;
var colorPickerButton = document.getElementsByClassName("iconButton")[1];
colorPickerButton.addEventListener("click", (e) => {
  e.preventDefault();
  var picker = new Picker(colorPickerButton);
  picker.onDone = function (color) {
    selectedColor = color.hex;
  };
});

var noteTitleInput = document.getElementById("noteTitleInput");
var noteBodyInput = document.getElementById("noteBodyInput");

function submitForm(e) {
  e.preventDefault();
  if (noteTitleInput.value !== "" || noteBodyInput !== "") {
    addNote(noteTitleInput.value, noteBodyInput.value, selectedColor);
    postNote(noteTitleInput.value, noteBodyInput.value, selectedColor);
    noteTitleInput.value = "";
    noteBodyInput.value = "";
    selectedColor = null;
  }
}

function showNotes() {
  notesContainer.innerHTML = "";
  notesToShow.forEach((note) =>
    addNote(note.title, note.text, note.color, note.id)
  );
}

var noteFormSubmitButton = document.querySelector("input[type=submit]");
noteFormSubmitButton.addEventListener("click", submitForm);

function getNotes() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      showNotes()
    }
  };
  xhttp.open("GET", "http://localhost:3000/notes", true);
  xhttp.send();
}

getNotes();

function postNote(noteTitle, noteBody, color) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/notes", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    title: noteTitle,
    text: noteBody,
    color: color,
  };
  xhttp.send(JSON.stringify(data));
}

function postArchive(noteTitle, noteBody, color, id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:3000/archive", true);
  xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
  var data = {
    id: id,
    title: noteTitle,
    text: noteBody,
    color: color,
  };
  xhttp.send(JSON.stringify(data));
}

function archiveNote(id) {
  var xhttp = new XMLHttpRequest();
  xhttp.open("DELETE", `http://localhost:3000/notes/${id}`, true);
  xhttp.send();
}

function getArchive() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      notesToShow = JSON.parse(xhttp.responseText);
      showNotes()
    }
  };
  xhttp.open("GET", "http://localhost:3000/archive", true);
  xhttp.send();
}
