const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const hora = document.getElementById('hora');
const data = document.getElementById('data');
const botaoTema = document.getElementById('themeIcon');
const cabecalho = document.getElementById('cabecalho');
const body = document.body;

const meuStorage = localStorage;


function changeTheme() {

    body.classList.toggle("dark-background");
    cabecalho.classList.toggle('dark-color');

    if(body.classList.contains("dark-background")){
        cabecalho.style.color = "#212529"
        botaoTema.classList.remove('bi-brightness-high-fill')
        botaoTema.classList.add('bi-moon-stars-fill')
        botaoTema.style.color = "#212529"
        botaoTema.style.backgroundColor = "#fff"
     
        body.style.background = "url('./imgs/fundo-claro.svg') center center/cover no-repeat";
    }else{
        body.style.background = "linear-gradient(rgb(0,0,0,0.5),rgb(0,0,0,0.5)), url('./imgs/fundo-escuro.svg') center center/cover no-repeat";
        cabecalho.style.color = "#fff"
        botaoTema.style.color = "#fff"
        botaoTema.style.backgroundColor = "#212529"
        botaoTema.classList.add('bi-brightness-high-fill')
        botaoTema.classList.remove('bi-moon-stars-fill')
    }
}

// --------------------- DATA E HORA   ---------------------

const formatterHora = Intl.DateTimeFormat('pt-BR', {
    timeStyle: 'short'
})

const formatterData = Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'full'
})

setInterval(() => {
    hora.innerText = formatterHora.format(new Date())
    data.innerText = formatterData.format(new Date())
}, 1000);

// ---------------------------------------------------------


let taskId;

let tasks = [];


validateFields();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const hasError = validateFormOnSubmit();

    if (!hasError) {
    const title = document.getElementById("title").value;
    const category = document.getElementById("category").value;
    const time = document.getElementById("time").value;
    
    const task = {
        title,
        category,
        time
    };

    if (!taskId) {
        createTask(task);
    } else {
        updateTask(task);
    }
}
});


// -------------------- VALIDA CAMPOS DO FORM --------------------

function validateFields() {
    inputs.forEach((input) => {
        input.addEventListener("blur", (event) => {
            if (!input.value) {
            showErrorMessage(input);
            } else {
            hideErrorMessage(input);
            }

            switch (input.id) {
            case "title":
            case "category":
                if (input.value.length < 2) {
                input.nextElementSibling.innerText =
                    "O campo precisa ter, ao menos, 2 caracteres.";
                showErrorMessage(input);
                }
                break;

            default:
                break;
            }
        });
    });
}

// -------------------------------------------------------------


// ------------------------- VALIDA FORMULÁRIO -------------------------
function validateFormOnSubmit() {
    let hasError = false;
    inputs.forEach((field) => {
    if (!field.value) {
        field.nextElementSibling.classList.add("d-block");
        field.nextElementSibling.classList.remove("d-none");
        hasError = true;
    } else {
        field.nextElementSibling.classList.add("d-none");
        field.nextElementSibling.classList.remove("d-block");
    }
    });

    return hasError;
}

function showErrorMessage(field) {
    const sibling = field.nextElementSibling;
    sibling.classList.add("d-block");
    sibling.classList.remove("d-none");
}

function hideErrorMessage(field) {
    const sibling = field.nextElementSibling;
    sibling.classList.add("d-none");
    sibling.classList.remove("d-block");
}

// -------------------------------------------------------------

function getTaskById(id) {
    findById(id)
    .then((task) => {
        setFormData(task);
    })
    .catch((error) => {
        console.error("Erro ao buscar o tarefa:", error);
    });
}

function setFormData(task) {
        document.getElementById("title").value = task.title;
    document.getElementById("category").value = task.category;
    document.getElementById("time").value = task.time;
    }

function createTask(task) {
    save(task)
    .then(() => {
        window.location.href = "./tarefas.html";
    })
    .catch((error) => {
        console.error("Erro ao adicionar tarefa", error);
    });
}

function updateTask(task) {
    update(task, taskId)
    .then(() => {
        taskId = null;
        window.location.href = "./tarefas.html";
    })
    .catch((error) => {
        console.error("Erro ao editar tarefa", error);
    });
}


