let addNote = document.querySelector('#add-note'); // Botão para adicionar nota
let closeModalView = document.querySelector('#close-modal'); // Botão para fechar janela modal com os detalhes da nota
let modal = document.querySelector('#modal'); // Modal para edição das notas
let modalView = document.querySelector('#modal-view'); // Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes'); // Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); // Ícone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note"); // Ícone para fechar modal de edição de nota

addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'block';
    addNote.style.display = 'none';
    notes.style.display = 'none';
    document.querySelector("#input-id").value = "";
    document.querySelector("#input-title").value = "";
    document.querySelector("#input-content").value = "";
});

btnCloseModal.addEventListener('click', (evt) => {
    evt.preventDefault();
    listNotes();
    modal.style.display = 'none';
    addNote.style.display = 'block';
    notes.style.display = 'flex';
});

btnSaveNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    let objNote = {
        id: document.querySelector("#input-id").value.trim(),
        title: document.querySelector("#input-title").value.trim(),
        content: document.querySelector("#input-content").value.trim()
    };
    saveNote(objNote);
});

closeModalView.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalView.style.display = 'none';
    addNote.style.display = 'block';
    notes.style.display = 'flex';
});

const saveNote = (note) => {
    let listNotes = loadNotes();
    note.lastTime = new Date().getTime();
    if (note.id.length < 1) {
        note.id = new Date().getTime();
        document.querySelector('#input-id').value = note.id;
        listNotes.push(note);
    } else {
        listNotes.forEach((item, i) => {
            if (item.id == note.id) {
                listNotes[i] = note;
            }
        });
    }
    listNotes = JSON.stringify(listNotes);
    localStorage.setItem('notes', listNotes);
    listNotes(); 
    modal.style.display = 'none'; 
    addNote.style.display = 'block'; 
    notes.style.display = 'flex'; 
};

const loadNotes = () => {
    let listNotes = localStorage.getItem('notes');
    if (!listNotes) {
        listNotes = [];
    } else {
        listNotes = JSON.parse(listNotes);
    }
    return listNotes;
};

const listNotes = () => {
    notes.innerHTML = "";
    let listNotes = loadNotes();
    listNotes.forEach((item) => {
        let divcard = document.createElement('div');
        divcard.className = 'card';
        divcard.style.width = '18rem';
        notes.appendChild(divcard);
        let divcardBody = document.createElement('div');
        divcardBody.className = 'card-body';
        divcard.appendChild(divcardBody);
        let h1 = document.createElement('h1');
        h1.innerText = item.title;
        divcardBody.appendChild(h1);
        let pContent = document.createElement('p');
        pContent.innerHTML = item.content;
        divcardBody.appendChild(pContent);
        let pLastTime = document.createElement('p');
        pLastTime.innerText = "Atualizado em:" + new Date(item.lastTime).toLocaleDateString();
        divcardBody.appendChild(pLastTime);
        divcard.addEventListener('click', (evt) => {
            evt.preventDefault();
            showNote(item);
        });
    });
};

const showNote = (note) => {
    notes.style.display = 'none';
    modalView.style.display = 'block';
    addNote.style.display = 'none';
    let titleModalView = document.querySelector('#title-note');
    titleModalView.innerHTML = "";
    let h1ModalView = document.createElement('h1');
    h1ModalView.innerText = note.title;
    titleModalView.appendChild(h1ModalView);
    let contentModalView = document.querySelector('#content-note');
    contentModalView.innerHTML = "";
    let pModalView = document.createElement('p');
    pModalView.innerText = note.content;
    contentModalView.appendChild(pModalView);
    let dateModalView = document.createElement('p');
    dateModalView.innerText = new Date(note.lastTime).toLocaleDateString();
    contentModalView.appendChild(dateModalView);
    document.querySelector("#controls-note").innerHTML = "";
    let aDelete = document.createElement('a');
    let i = document.createElement('i');
    i.innerHTML = 'Remover';
    i.style.color = 'red';
    aDelete.appendChild(i);
    document.querySelector("#controls-note").appendChild(aDelete);
    let aEdit = document.createElement('a');
    let iEdit = document.createElement('i');
    iEdit.innerHTML = 'Editar';
    iEdit.style.color = 'red';
    aEdit.appendChild(iEdit);
    document.querySelector("#controls-note").appendChild(aEdit);
    aDelete.addEventListener('click', (evt) => {
        evt.preventDefault();
        deleteNote(note.id);
    });
    aEdit.addEventListener('click', () => {
        document.querySelector("#input-id").value = note.id;
        document.querySelector("#input-title").value = note.title;
        document.querySelector("#input-content").value = note.content;
        modal.style.display = 'block';
        addNote.style.display = 'none';
        notes.style.display = 'none';
        modalView.style.display = 'none';
    });
};

const deleteNote = (id) => {
    let noteDel = loadNotes();
    noteDel = noteDel.filter(note => note.id !== id);
    localStorage.setItem('notes', JSON.stringify(noteDel));
    listNotes(); 
    if (modalView.style.display === 'block') {
        modalView.style.display = 'none'; 
        addNote.style.display = 'block'; 
        notes.style.display = 'flex'; 
    }
};
listNotes();
