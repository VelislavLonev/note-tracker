'use strict';
const app = document.querySelector('.app');
const inputText = document.querySelector('.text-area');
const list = document.querySelector('.note-list');
const noteFiles = document.querySelector('.note-files');
const listItem = document.querySelectorAll('.list-item');
const modul = document.querySelector('.modul');
const saveNoteBtn = document.querySelector('.btn-save');
const deleteNote = document.querySelector('.delete-icon');
const closeNote = document.querySelector('.btn-close');
const nodeFiles = document.querySelector('.note-files');
const deleteAllNotes = document.querySelector('.delete-all-notes');
const alertModul = document.querySelector('.alert-modul');
let text = '';
let numberNote = 1;
function localNotes() {
  let notes;
  if (localStorage.getItem('Notes') === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('Notes'));
  }
  return notes;
}

const notes = localNotes();
function saveNotes(note) {
  notes.push(note);
  localStorage.setItem('Notes', JSON.stringify(notes));
}

function shortenedNote(note) {
  let arr = note.split('');
  let newNote = arr.slice(0, 10).join('');
  return newNote + '...';
}
function addedClass() {
  listItem.classList.add('added');
}
function renderNoteElements(notes) {
  list.textContent = '';
  notes.forEach((note, i) => {
    const html = ` <li data-text = '${note}'class="list-item ">
        <span><ion-icon  class='pen'  name="pencil"></ion-icon>${i + 1}:</span
        ><span class="list-item-text ">${shortenedNote(note)}</span>
        <button class='delete-icon'><ion-icon  class='ex-icon' name="close-circle-outline"></ion-icon></button>
      </li>`;

    list.insertAdjacentHTML('beforeend', html);
    numberNote++;
  });
}
function removeHidden() {
  document.querySelectorAll('.list-item').forEach(el => {
    el.classList.remove('slide');
  });
}
function addNote(note) {
  const html = ` <li data-text = '${note}' class="list-item slide">
        <span><ion-icon  class='pen'  name="pencil"></ion-icon></ion-icon>${numberNote}:</span
        ><span class="list-item-text">${shortenedNote(note)}</span>
        <button class='delete-icon'><ion-icon  class='ex-icon' name="close-circle-outline"></ion-icon></button>
      </li>`;

  list.insertAdjacentHTML('beforeend', html);
  numberNote++;
}

saveNoteBtn.addEventListener('click', function (e) {
  e.preventDefault;
  if (inputText.value.length > 0) {
    let note = inputText.value;
    saveNotes(note);
    addNote(note);
    setTimeout(removeHidden, 10);
  }
  inputText.value = '';
});

nodeFiles.addEventListener('click', function (e) {
  const btn = e.target;

  if (btn.classList.contains('list-item')) {
    modul.classList.remove('hidden');
    text = document.createTextNode(btn.dataset.text);
    modul.appendChild(text);
    app.classList.add('blur');
    app.classList.add('off-events');
  }
  if (btn.classList.contains('ex-icon')) {
    const element = btn.parentElement.parentElement;
    notes.forEach(el => {
      if (el === element.dataset.text) {
        let index = notes.indexOf(el);
        notes.splice(index, 1);
        renderNoteElements(notes);
        localStorage.setItem('Notes', JSON.stringify(notes));
      }
    });
  }
});

closeNote.addEventListener('click', function (e) {
  e.preventDefault();
  modul.classList.add('hidden');
  app.classList.remove('blur');
  text.textContent = '';
  app.classList.remove('off-events');
});

deleteAllNotes.addEventListener('click', function (e) {
  e.preventDefault();
  alertModul.classList.remove('hidden');
  app.classList.add('blur');
  app.classList.add('off-events');
  alertModul.addEventListener('click', function (e) {
    let btn = e.target;
    if (btn.classList.contains('warning-btn--cancel')) {
      alertModul.classList.add('hidden');
      app.classList.remove('blur');
      app.classList.remove('off-events');
      app.classList.add('on-events');
    }
    if (btn.classList.contains('warning-btn--delete')) {
      alertModul.classList.add('hidden');
      app.classList.remove('blur');
      app.classList.remove('off-events');
      localStorage.clear();
      window.location = './index.html';
    }
  });
});

window.addEventListener('keydown', function (e) {
  if (e.key === 'r') {
    this.localStorage.clear();
  }

  if (e.key === 'Escape') {
    modul.classList.add('hidden');
    alertModul.classList.add('hidden');
    app.classList.remove('blur');
    app.classList.remove('off-events');
    app.classList.add('on-events');
  }
});
document.addEventListener(
  'DOMContentLoaded',
  function () {
    renderNoteElements(notes);
  },
  false
);

// renderNoteElements(notes);
