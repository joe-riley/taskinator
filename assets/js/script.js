var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');

var createTaskHandler = (event) => {
    event.preventDefault();

    var taskNameInput = document.querySelector('input[name="task-name"]').value;
    var taskTypeInput = document.querySelector('select[name="task-type"]').value;

    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    var taskDataObj = {
        name: taskNameInput,
        task: taskTypeInput,
    }

    createTaskEl(taskDataObj);

}

var createTaskEl = (taskDataObj) => {
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.task}</span>`;

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);

}

formEl.addEventListener("submit", createTaskHandler);