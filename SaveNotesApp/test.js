const noteInput = document.getElementById("noteInput");
const addBtn = document.getElementById("addBtn");
const notesContainer = document.getElementById("notesContainer");

// load the notes when the page opens.
let notes = JSON.parse(localStorage.getItem("notes")) || [];

renderNotes();

addBtn.addEventListener("click", () => {
    const text = noteInput.value.trim();
    if (text === "") return;

    notes.push(text);
    noteInput.value = "";

    saveNotes();
    renderNotes();

});

function saveNotes() {
    localStorage.setItem("notes",JSON.stringify(notes));
}

function renderNotes() {
    notesContainer.innerHTML = "";

    notes.forEach((note,index)=> {
        
    
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
        ${note}
        <br><br>
        <button onclick="deleteNote(${index})">Delete</button>
        `;
    notesContainer.appendChild(div);
    });
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}