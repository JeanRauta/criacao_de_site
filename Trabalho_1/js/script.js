add_note = document.querySelector('.add_note');
add_note_modal = document.querySelector('.add_card_modal');
add_close_btn = document.querySelector('.close_modal_btn');
btn_submit = document.querySelector('.btn_submit');
html_storage = document.querySelector('.html_storage');
var array_storage = new Array;


add_note.addEventListener('click' , ()=>{
    add_note_modal.style.display = 'flex';
    add_close_btn.addEventListener('click' , ()=>{
        add_note_modal.style.display = 'none';
    })
    btn_submit.addEventListener('click' , ()=>{
        add_note_modal.style.display = 'none';
        let id_nota = new Date;
        id_nota = id_nota.getTime();
        const nota = {
            id: id_nota,
            titulo: document.querySelector('.title').value ,
            texto: document.querySelector('.text').value
        };
        html_storage.value = id_nota;
        save_note(nota);
    })
})

function save_note(nota) {
    
}
