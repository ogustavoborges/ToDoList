const tasksDiv = document.getElementById("tasks-list");
let tasksArray = [];

getTasks();

function refreshTasksGrid() {
    tasksDiv.innerHTML = "";

    if(tasksArray.length > 0){
        document.getElementById('alert').classList.add('d-none');
    } else if(tasksArray.length == 0){
        document.getElementById('alert').classList.remove('d-none');
    }

    tasksArray.forEach((task) => {
    tasksDiv.innerHTML += `

    <div class="card mb-4">
        <div class="card-body">
            <div class="row">
                <div class="col-9">
                    <h5 class="card-title">${task.title}</h5>
                    <p class="card-text">${task.category},  <i class="bi bi-clock"></i> ${task.time}</p>
                    <button type="button" class="btn btn-dark btn-sm bi bi-pencil-fill"  data-bs-toggle="modal" onclick="editTask('${task._id}')" data-bs-target="#modalTarefa"></button>
                    <button type="button" class="btn btn-dark btn-sm bi bi-trash-fill" onclick="removeTask('${task._id}')" ></button>
                </div>
                <div class="col d-flex align-items-center justify-content-end">
                    <input class="form-check-input check" type="checkbox" id="checkboxNoLabel" value="" aria-label="check task">
                </div>
            </div> 
        </div>
    </div>
    `;
});
}



function getTasks() {
    findAll()
    .then((records) => {
        tasksArray = records;




    refreshTasksGrid();
    })
    .catch((error) => {
        console.error("Erro ao buscar usuários:", error);
    });
}

function removeTask(id) {
    remove(id)
    .then(() => {
        getTasks();
    })
    .catch((error) => {
        console.error("Erro ao excluir o usuário:", error);
    });
}

function editTask(id) {
    taskId = id;
    getTaskById(id);
}


const fecharModal = document.getElementById('fecharModal');

fecharModal.addEventListener('click', () => {
    limpaForm();
})

document.addEventListener('keydown', (e) => {
    if( e.key === 'Escape'){
        limpaForm();
    }
})

function limpaForm(){
    taskId = null;
    document.getElementById("title").value = '';
    document.getElementById("category").value = '';
    document.getElementById("time").value = '';
}