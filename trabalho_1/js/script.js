var conteiner = document.querySelector(".container")
var addnote = document.querySelector(".addnote")
var modal = document.querySelector(".modal")
var btnSub = document.querySelector(".btn-sub")


addnote.addEventListener('click', function () {
    if (conteiner.style.display == 'none') {
        conteiner.style.display = 'block'
    }else{
        conteiner.style.display = 'none'
    }
    
})

function save(){
    
}

btnSub.addEventListener("click", function () {
    save(
        {
            title:document.querySelector(".noteTitle").value,
            texto:document.querySelector(".noteContent").value
        }
    )
})
