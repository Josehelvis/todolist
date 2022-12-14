const btnAdd = document.querySelector('#buttonAdicionarTask');
const  ul = document.getElementById('ulTaksContainer')
const inputAdicionarTask = document.getElementById('inputAddTarefa')
const containerTasks = document.getElementById('container-tasksEdit')
const containercancelEdit = document.getElementById('container-cancelEditID')
const btnCancelar = document.getElementById('btnCancelar')
const containerTaskButtons = document.querySelector('.container-taskButtons')
const liExemplo = document.getElementById('liExemplo')

let oldInputValue;
let returns = false;
let idTarefaEdit;

function liTarefaExemplo() {
    if(ul.childNodes.length == 1){
        ul.innerHTML = `<li id="liExemplo">
        <span id="spanTarefa"> Sua tarefa</span>
        <div class="container-taskButtons">
            <button class="btnCheck"><i class="ph-check"></i></button>
            <button class="btnEdit"><i class="ph-note-pencil"></i></button>
            <button class="btnDelete"><i class="ph-trash"></i></button>
        </div>
        </li>`
    }
}


function changeSubmit(isEditTask) {
    let tarefa = {
        id: gerarId()
    }
    const editInputValue = inputAdicionarTask.value

    isEditTask? updateValue(editInputValue) : formaTask(tarefa)
}


btnAdd.addEventListener('click', () => {
    inverseCancel()
    returns? changeSubmit(true) : changeSubmit(false)
    returns = false
    inputAdicionarTask.value = ''
})

inputAdicionarTask.addEventListener('keydown', (e) => {
    let tarefa = {
        id: gerarId()
    }

    if(e.key === 'Enter') {
        inverseCancel()
        console.log(returns)
        returns? changeSubmit(true) : changeSubmit(false)
        returns = false
    }
})

function gerarId() {
   const id = Math.floor(Math.random() * 200)

   return id
}

function formaTask(tarefa) {
    const inputAdicionarTaskValue = inputAdicionarTask.value
    if(inputAdicionarTaskValue) {
        const liEemplo = document.getElementById('liExemplo')
        if(liEemplo){
            liEemplo.remove()
        }
        ul.innerHTML += `<li id="${tarefa.id}">
        <span id="spanTarefa">${inputAdicionarTaskValue}</span>
        <div class="container-taskButtons">
            <button class="btnCheck" onclick="handleCheck(${tarefa.id})"><i class="ph-check"></i></button>
            <button class="btnEdit" onclick="handleEditTask(${tarefa.id})"><i class="ph-note-pencil"></i></button>
            <button class="btnDelete" onclick="handleDelete(${tarefa.id})"><i class="ph-trash"></i></button>
        </div>
        </li>`
        inputAdicionarTask.value = ''
        inputAdicionarTask.focus()
        // const li = document.createElement('li')
        // li.innerHTML +=`
        // <span id="spanTarefa">${inputAdicionarTaskValue}</span>
        // <div class="container-taskButtons">
        //     <button class="btnCheck"><i class="ph-check"></i></button>
        //     <button class="btnEdit"><i class="ph-note-pencil"></i></button>
        //     <button class="btnDelete" onclick="handleDelete(${})"><i class="ph-trash"></i></button>
        // </div> `
        // // const btnDelete = document.querySelector('.btnDelete')
        // // btnDelete.addEventListener('click', () => handleDelete(li))
        // ul.append(li)
    }
}

const handleDelete = (liid) =>  {
    const tasks = ul.childNodes

    for(const task of tasks) {
        if(task.id == liid) {
            task.remove()
        }     
    }
    liTarefaExemplo()
}
const handleEditTask = (liId) => {
    returns = true
    hideCancel()
    const tasks = ul.childNodes

    for(const task of tasks) {
        if(task.id == liId) {
            const span = task.querySelector('span')
            inputAdicionarTask.focus()
            inputAdicionarTask.value = span.innerHTML
            oldInputValue = span.innerHTML
            idTarefaEdit = liId

        }     
    }

}
function hideCancel() {
    containerTasks.style.display = 'none'
    containercancelEdit.style.display = 'block'
}

function inverseCancel() {
    containerTasks.style.display = 'block'
    containercancelEdit.style.display = 'none'
}
btnCancelar.addEventListener('click', () => {
    inverseCancel()
    inputAdicionarTask.value = ''
})
const handleCheck = (liId) => {
    const tasks = ul.querySelectorAll('li')
    

    for(let task of tasks) {
        if(task.id == liId) {
            const span = task.querySelector('span')
            span.classList.toggle('check')
        }
    }
    for(let task of tasks) {
        if(task.id == liId) {
            const btnCheck = task.querySelector('.btnCheck')
            const span = task.querySelector('span')
            btnCheck.innerHTML = '<i class="ph-x"></i>'
            if(span.classList == '') {
                btnCheck.innerHTML = '<i class="ph-check"></i>'
            }
        }
    }
}
function updateValue (text, liId) {
    const tasks = ul.querySelectorAll('li')
    liId = idTarefaEdit 
  
    for(let task of tasks){
        
        if(task.id == liId) {
            const span = task.querySelector('span')
            if(span.innerText === oldInputValue) {
                span.innerText = text
                inputAdicionarTask.value = ''
            }
        }
        
    }
}