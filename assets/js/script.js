var pageContentEl = document.querySelector('.page-content');
var formEl = document.querySelector('#task-form');
var tasksToDoEl = document.querySelector('#tasks-to-do');
var taskIdCounter = 0;

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
};

var createTaskEl = (taskDataObj) => {
    var listItemEl = document.createElement('li');
    listItemEl.className = 'task-item';

    var taskInfoEl = document.createElement('div');
    taskInfoEl.className = 'task-info';
    taskInfoEl.innerHTML = `<h3 class="task-name">${taskDataObj.name}</h3><span class="task-type">${taskDataObj.task}</span>`;
    
    var id = taskIdCounter += 1;
    listItemEl.setAttribute('data-task-id', id);

    listItemEl.appendChild(taskInfoEl);

    tasksToDoEl.appendChild(listItemEl);

    taskInfoEl.appendChild(createTaskActions(id));

};

var createTaskActions = (taskId) => {
    var actionContainerEl = document.createElement('div');
    actionContainerEl.className = 'task-actions';

    // create edit button
    var editButtonEl = document.createElement('button');
    editButtonEl.textContent = 'Edit';
    editButtonEl.className = 'btn edit-btn';
    editButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement('button');
    deleteButtonEl.textContent = 'Delete';
    deleteButtonEl.className = 'btn delete-btn';
    deleteButtonEl.setAttribute('data-task-id', taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create the status dropdown
    var statusSelectEl = document.createElement('select');
    statusSelectEl.className = 'select-status';
    statusSelectEl.setAttribute('name', 'status-change');
    statusSelectEl.setAttribute('data-task-id', taskId);

    var statusChoices = ['To Do', 'In Progress', 'Completed'];

    for (var i = 0; i < statusChoices.length; i++) {
        // create the option element
        var statusOptionEl = document.createElement('option');
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute('value', statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

var deleteTask = (taskId) => {
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    taskSelected.remove();
}

var editTask = (taskId) => {
    var taskSelected = document.querySelector(`.task-item[data-task-id="${taskId}"]`);
    var taskName = taskSelected.querySelector('h3.task-name').textContent;
    document.querySelector('input[name="task-name"]').value = taskName;
    var taskType = taskSelected.querySelector('span.task-type').textContent;
    document.querySelector('select[name="task-type"]').value = taskType;

    document.querySelector('#save-task').textContent = "Save Task";

    formEl.setAttribute('data-task-id', taskId);
}

var taskButtonHandler = (event) => {
    var taskId = event.target.getAttribute('data-task-id');

    if (event.target.matches('.delete-btn')) {
        deleteTask(taskId);
    } else if (event.target.matches('.edit-btn')) {
        editTask(taskId);
    }
};


formEl.addEventListener('submit', createTaskHandler);
pageContentEl.addEventListener('click', taskButtonHandler);