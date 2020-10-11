
var buttonE1 = document.querySelector('#save-task');
var taskToDoE1 = document.querySelector('#tasks-to-do');

var createTaskHandler = () => {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    taskToDoE1.appendChild(listItemEl);
}

buttonE1.addEventListener("click", createTaskHandler);