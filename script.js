var input = document.querySelector(".input")
var adicionar = document.querySelector(".adicionar")
var qtdTarefas = document.querySelector(".num_tarefas")
var listaTarefas = document.querySelector(".todo_list__tarefa")
var mainContainer = document.querySelector(".todo_list")
var errorElement = document.querySelector(".erro")
var errorMessage = document.querySelector(".erro > p")
var errorElement
var maxLista = 6

adicionar.addEventListener('click', function(){
    var tamLista = document.querySelectorAll(".tarefa")
    var textInput = input.value

    if (tamLista.length < maxLista && textInput.length >= 6) {
        criarTarefa(textInput)
        adicionar.classList.add("spin")
        setTimeout(()=>{
            adicionar.classList.remove("spin")
        }, 100)
        input.value = "" //clear input
    } 
    else {
        if (errorElement.classList.contains("invisible")) {
            errorElement.classList.remove("invisible")
            errorElement.classList.add("full")
            setTimeout(()=>{
                errorElement.classList.remove("full")
            }, 250)
            
            if (textInput.length < 6)
                errorMessage.innerHTML = "Insira no mínimo 6 caracteres."
            else {
                errorMessage.innerHTML = "A lista de tarefas está cheia!"
            }

            setTimeout(()=>{
                errorElement.classList.add("invisible")
            }, 5000)
        } else return
    }

    tamLista = document.querySelectorAll(".tarefa") //refresh
    qtdTarefas.innerHTML = `${tamLista.length}`
    
})

var criarTarefa = (text)=> {
    var itemLista   = document.createElement("li")
    var checkbox    = document.createElement("input")
    var nomeTarefa  = document.createElement("p")
    var removeBtn   = document.createElement("button")
    var trashIcon   = document.createElement("span")

    nomeTarefa.append(`${text}`)
    checkbox.setAttribute("type", "checkbox")
    removeBtn.classList.add("remover")
    removeBtn.addEventListener('click', function(event){
        removerTarefa(event)
    })
    itemLista.classList.add("tarefa")
    trashIcon.classList.add("material-symbols-outlined")
    trashIcon.innerHTML = "delete"
    checkbox.classList.add("done")
    checkbox.addEventListener('change', function(event){
        if (event.currentTarget.checked == true) {
            itemLista.classList.add("concluido")
        } else {
            itemLista.classList.remove("concluido")
        }
    })
    removeBtn.appendChild(trashIcon)
    itemLista.appendChild(checkbox)
    itemLista.appendChild(nomeTarefa)
    itemLista.appendChild(removeBtn)
    listaTarefas.appendChild(itemLista)
}

var removerTarefa = (event)=>{
    var elementoClicado = event.currentTarget.parentElement
    elementoClicado.remove()
    var tamLista = document.querySelectorAll(".tarefa")
    qtdTarefas.innerHTML = `${tamLista.length}`
}