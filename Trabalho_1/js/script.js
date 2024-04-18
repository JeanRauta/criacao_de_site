let addNote = document.querySelector('#add-note');//Botão de para adicionar nota
let closeModalView =  document.querySelector('#close-modal'); //fechar janela modal com os detalhes da nota.
let modal = document.querySelector('#modal'); //Modal para edição das notas
let modalView = document.querySelector('#modal-view'); //Modal para exibição dos detalhes da nota
let notes = document.querySelector('#notes');//Lista divs com dados das notas
let btnSaveNote = document.querySelector("#btn-save-note"); //icone para salvar nota
let btnCloseModal = document.querySelector("#btn-close-note");//icone para fechar modal de edição de nota.

//+++++++++++++++++++++++++++++++ EVENTOS +++++++++++++++++++++++++++

addNote.addEventListener('click', (evt) => {
  evt.preventDefault();
  modal.style.display='block';
  notes.style.display='none';
  addNote.style.display='none';
})

btnCloseModal.addEventListener('click', (evt) =>{
  evt.preventDefault();
  listNotes();
  modal.style.display='none';
  notes.style.display='flex';
  addNote.style.display='block';
})

btnSaveNote.addEventListener('click', (evt) =>{ 
  evt.preventDefault();
  let objNote = {
    id: document.querySelector("#input-id").value.trim(), 
    title: document.querySelector("#input-title").value.trim(), 
    content: document.querySelector("#input-content").value.trim()
  };
  saveNote(objNote);
});




//+++++++++++++++++++++++++++++++ FUNÇÕES +++++++++++++++++++++++++++

function remove_note(idnote){

  listNotes = loadNotes()

  listNotes.forEach((teste, i) => {
    if (teste.id == idnote) {
      teste.splice(i);
    }
  });

}

const loadNotes = () => {
  let listNotes = localStorage.getItem('notes');
  if(!listNotes){
    listNotes = [];
  } else {
    listNotes = JSON.parse(listNotes);
  }
  return listNotes;
};  

const saveNote = (note) => {
  let listNotes = loadNotes();

  if(note.id.length < 1){
    note.id = new Date().getTime();
    document.querySelector('#input-id').value = note.id;
    listNotes.push(note);
  } else {
    listNotes.forEach((item, i) => {
      if(item.id == note.id){
        listNotes[i] = note;
      }
    });
  }

  note.lastTime = new Date().getTime();
  console.log(listNotes);
  listNotes = JSON.stringify(listNotes);
  localStorage.setItem('notes', listNotes); 
};

const showNote = (note) =>{
  document.querySelector('#title-note').innerHTML = "<h1>"+note.title+"</h1>";
  document.querySelector('#content-note').innerHTML = "<p>"+note.content+"</p>";
  document.querySelector('#title-note').innerHTML += "<p>"+new Date (note.lastTime).toLocaleDateString()+"</p>";
  
  document.querySelector(".remove_note").addEventListener("click" , function() {
    remove_note(note.id)
  })

  modalView.style.display = 'block';
  notes.style.display='none';
  addNote.style.display='none';
};

closeModalView.addEventListener("click", (evt) => {
  evt.preventDefault();
  listNotes();
  modalView.style.display='none';
  notes.style.display='flex';
  addNote.style.display='block';
})

const listNotes = () => {
  notes.innerHTML="";
  let listNotes = loadNotes();
  listNotes.forEach((item) =>{
    let divCard = document.createElement('div');
    divCard.className = 'card';
    divCard.style.width = '18rem';
    notes.appendChild(divCard);
    let divCardBody = document.createElement('div');
    divCardBody.className = 'card-body';
    divCard.appendChild(divCardBody);
    let h1 = document.createElement('h1');
    h1.innerText = item.title;
    divCardBody.appendChild(h1);
    let pContent = document.createElement('p');
    divCardBody.appendChild(pContent);
    let pLastTime = document.createElement('p');
    pLastTime.innerText = new Date (item.lastTime).toLocaleDateString();
    divCardBody.appendChild(pLastTime);
    
    divCard.addEventListener('click',(evt) =>{
      showNote(item);
    });

  })
};

listNotes();

