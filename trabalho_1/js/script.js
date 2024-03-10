/**
 * ===================== PRINCIPAIS OBJETOS  =======================
 */

let addNote = document.querySelector('#add-note'); //Botão de para adicionar nota
let closeModal = document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelectorAll('.item-note'); //Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseNote = document.querySelector("#btn-close-note"); //icone para fechar modal de edição de nota.

/**
 * Buscar as anotações existentes
 */
const loadNotes = () => {
    let resp = localStorage.getItem('notes');
    resp = JSON.parse(resp);
    return resp;
};

/**
 * Criar função para adicionar uma nova anotação
 * Evento para clicar no botão e abrir o formulário.
 */
addNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    modal.style.display = 'block';
    document.querySelector('#notes').style.display = 'none';
    document.querySelector('#controls').style.display = 'none';
});

/**
 * Evento para clicar no botão de salvar chamando a função responsável por salvar no local storage
 */
btnSaveNote.addEventListener('click', (evt) => {
    evt.preventDefault();
    saveNote({
        id: document.querySelector("#input-id").value,
        title: document.querySelector("#input-title").value,
        content: document.querySelector("#input-content").value,
    });
});

/**
 * Função para limpar os campos do formulário de anotação
 */
const clearFormNote = () => {
    document.querySelector("#input-id").value = '';
    document.querySelector("#input-title").value = '';
    document.querySelector("#input-content").value = '';
}

/**
 * Evento para fechar o modal
 */
closeModal.addEventListener(
    'click',
    (evt) => {
        evt.preventDefault();
        clearFormNote();
        modal.style.display = 'none';
        document.querySelector('#notes').style.display = 'flex';
        document.querySelector('#controls').style.display = 'block';
    },
    false
);

/**
 * Criar função para exibir as anotações existentes
 */
const listNotes = (notes) => {
    if (notes) {
        let divNotes = document.querySelector('#notes');
        divNotes.innerHTML = '';
        notes.forEach((note) => {
            let divCard = document.createElement('div');
            divCard.className = 'card';
            divCard.style = "width: 18rem; margin:1rem";
            let linkCard = document.createElement('a');
            linkCard.id = note.id;
            linkCard.className = 'item-note';
            linkCard.addEventListener('click', function (evt) {
                evt.preventDefault();
                showNote(this.id);
            }, false);
            let divCardBody = document.createElement('div');
            divCardBody.className = 'card-body';
            let h5 = document.createElement('h5');
            h5.className = 'card-title';
            h5.innerHTML = note.title;
            divCardBody.appendChild(h5);
            let pContent = document.createElement('p');
            pContent.className = 'card-text';
            pContent.innerHTML = note.content;
            divCardBody.appendChild(pContent);
            let pDate = document.createElement('p');
            let time = new Date(note.lastTime); // converte para data
            time = time.toLocaleDateString("pt-BR");
            pDate.innerHTML = "Última alteração : " + time;
            divCardBody.appendChild(pDate);
            linkCard.appendChild(divCardBody);
            divCard.appendChild(linkCard);
            divNotes.appendChild(divCard);
        });
    }
    document.querySelector("#notes").style.display = "flex";
    document.querySelector("#controls").style.display = "flex";
}

/**
 * Criar evento ao clicar sobre uma nota para exibir o conteúdo completo
 */
const showNote = (id) => {
    const notes = loadNotes();
    notes.forEach((noteItem) => {
        if (id == noteItem.id) {
            let titleNote = document.querySelector("#title-note");
            let h2 = document.createElement('h2');
            h2.innerHTML = noteItem.title;
            titleNote.appendChild(h2);
            let pContent = document.createElement("p");
            pContent.innerHTML = noteItem.content;
            modalView.querySelector("#content-note").appendChild(pContent);
            let pLastTime = document.createElement("p");
            let time = new Date(noteItem.lastTime); // converte para data
            time = time.toLocaleDateString("pt-BR");
            pLastTime.innerHTML = "Última alteração : " + time;
            modalView.querySelector("#content-note").appendChild(pLastTime);

            //Adiciona controles de edição e exclusão do item
            divControls = document.querySelector("#controls-note");
            divControls.innerHTML = "";

            divDel = document.createElement("div");
            linkDel = document.createElement("a");
            linkDel.setAttribute("id", noteItem.id);
            iconDel = document.createElement("i");
            iconDel.className = "bi bi-trash";
            iconDel.style.color = "#F00";
            linkDel.appendChild(iconDel);
            divDel.appendChild(linkDel);
            divControls.appendChild(divDel);

            divEdit = document.createElement("div");
            linkEdit = document.createElement("a");
            linkEdit.setAttribute("id", noteItem.id);
            iconEdit = document.createElement("i");
            iconEdit.className = "bi bi-pencil";
            iconEdit.style.color = "#00F";
            linkEdit.appendChild(iconEdit);
            divEdit.appendChild(linkEdit);
            divControls.appendChild(divEdit);

            linkDel.addEventListener("click", () => {
                if (confirm("Confirmar")) {
                    deleteNote(linkDel.id);
                }
            });
            linkEdit.addEventListener("click", () => {
                editNote(linkEdit.id);
            });
        }
    })
}

/**
 * Função para salvar uma nota no localStorage
 */
const saveNote = (note) => {
    note.lastTime = new Date().getTime();
    let notes = loadNotes();
    if (!notes) {
        notes = [];
    }
    if (note.id.length == 0) {
        note.id = new Date().getTime();
        document.querySelector("#input-id").value = note.id;
        notes.push(note);
    } else {
        for (i = 0; i < notes.length; i++) {
            if (notes[i].id == note.id) {
                notes[i] = note;
            }
        }
    }
    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);
    clearFormNote();
    modal.style.display = 'none';
    listNotes(loadNotes());
}

/**
 * Função para excluir uma nota
 */
const deleteNote = (id) => {
    let notes = loadNotes();
    notes = notes.filter((note) => note.id != id);
    notes = JSON.stringify(notes);
    localStorage.setItem('notes', notes);
    listNotes(loadNotes());
}

/**
 * Função para editar uma nota
 */
const editNote = (id) => {
    let notes = loadNotes();
    notes.forEach((note) => {
        if (note.id == id) {
            document.querySelector("#input-id").value = note.id;
            document.querySelector("#input-title").value = note.title;
            document.querySelector("#input-content").value = note.content;
            modal.style.display = 'block';
            document.querySelector('#notes').style.display = 'none';
            document.querySelector('#controls').style.display = 'none';
        }
    });
}

// Carregar notas ao carregar a página
window.onload = () => {
    listNotes(loadNotes());
}
