const addBox = document.querySelector(".add-box"),
  popupBox = document.querySelector(".popup-box"),
  popupTitle = popupBox.querySelector("header p"),
  closeIcon = popupBox.querySelector("header i"),
  addBtn = popupBox.querySelector("button"),
  titleTag = popupBox.getElementsByTagName("input")[0],
  dateTimeTag = popupBox.getElementsByTagName("input")[1],
  descTag = popupBox.getElementsByTagName("textarea")[0],
  tagTag = popupBox.getElementsByTagName("textarea")[1];

const notes = JSON.parse(localStorage.getItem("notes") || "[]");
let isUpdate = false, updateId;

addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  titleTag.value = "";
  descTag.value = "";
  tagTag.value = "";
  dateTimeTag.value = "";
  addBtn.innerText = "Add Note";
  popupTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});

// Showing notes

function showNotes() {
  document.querySelectorAll(".note").forEach(note => note.remove());

  notes.forEach((note, index) => {
    let tagsString = "";
    for (let index = 0; index < note.tags.length; index++)
      tagsString += "#" + note.tags[index] + " ";

    let liTag = `
    <li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span>${note.description}</span>
        <div class="tags">${tagsString}</div>
      </div>
      <div class="bottom-content">
        <span>${note.dateString}</span>
        <div class="settings">
          <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
          <ul class="menu">
            <li onclick="editNote(${index},'${note.title}','${note.description}','${tagsString}','${note.date}')"><i class="uil uil-pen"></i>Edit</li>
            <li onclick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
          </ul>
        </div>
      </div>
    </li>
    `;

    addBox.insertAdjacentHTML("afterend", liTag);
  });
}

showNotes();

function showMenu(elem){
  elem.parentElement.classList.add("show");
  document.addEventListener("click", e=>{
    if(e.target.tagName != "I" || e.target != elem){
      elem.parentElement.classList.remove("show");
    }
  })
}

// Operations on existing notes

function deleteNote(noteId){
  let confirmDel = confirm("Are you sure you want to delete this note?");
  if(!confirmDel) return;
  notes.splice(noteId, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  showNotes();
}

function editNote(noteId, title, description, tags, date){
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  titleTag.value = title;
  descTag.value = description;
  tagTag.value = tags;
  dateTimeTag.value = date.substring(0, 16);
  console.log(date);
  addBtn.innerText = "Update Note";
  popupTitle.innerText = "Update Note";
}

//Adding note

addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value,
    noteDesc = descTag.value,
    noteTags = tagTag.value.split("#"),
    noteDateTime = dateTimeTag.value;

  if(noteDateTime === ""|| noteTitle.trim().length === 0) return;

  const noteTagsArray = noteTags.map((element) => {
    return element.trim();
  });

  noteTagsArray.shift();

  let dateObj = new Date(noteDateTime),
    month = dateObj.getMonth() + 1,
    day = dateObj.getDate(),
    year = dateObj.getUTCFullYear(),
    hour = dateObj.getHours(),
    minute = dateObj.getMinutes();
  if (minute < 10) minute = "0" + minute;

  let date = `${day}/${month}/${year}, ${hour}:${minute}`;

  let Note = {
    title: noteTitle,
    description: noteDesc,
    tags: noteTagsArray,
    dateString: date,
    date: dateObj
  };

  if(!isUpdate)
    notes.push(Note);
  else
  {
    isUpdate = false;
    notes[updateId] = Note;
  }

  localStorage.setItem("notes", JSON.stringify(notes));
  closeIcon.click();
  showNotes();
});
