// const addTask = document.getElementById('add-task')
// const taskContainer = document.getElementById('task-container')
// const inputTask = document.getElementById('input-task')


// addTask.addEventListener('click', function(){
//     addNewTask();
// })
// inputTask.addEventListener('keydown',function(e){
//     if(e.key === 'Enter'){
//         addNewTask();
//     }else if(e.key === 'Delete'){
//         deleteTask()
//     }
// })


// function addNewTask(){
//     let task = document.createElement('div');
//     task.classList.add('task');

//     let li = document.createElement('li')
//     li.innerText= `${inputTask.value}`
//     task.appendChild(li);


//     let checkButton = document.createElement('button');
//     checkButton.innerHTML = '<i class= "fa-solid fa-check"></i>';
//     checkButton.classList.add('checkTask');
//     task.appendChild(checkButton)

//     let deleteButton = document.createElement('button');
//     deleteButton.innerHTML = '<i class= "fa-solid fa-trash-can"></i>';
//     deleteButton.classList.add('deleteTAsk');
//     task.appendChild(deleteButton)


//     if(inputTask.value === ""){
//         alert('Please Enter Task')
//     }else{
//         taskContainer.appendChild(task);
//     }
//     inputTask.value= "";

//     checkButton.addEventListener('click',function(){
//         checkButton.parentElement.style.textDecoration = "line-through"
//     })

//     deleteButton.addEventListener('click',function(e){
//         let target = e.target.parentElement.parentElement.remove();
//     })
// }

// Elements
const addTask = document.getElementById('add-task');
const taskContainer = document.getElementById('task-container');
const inputTask = document.getElementById('input-task');
const categorySelect = document.getElementById('category');
const dueDateInput = document.getElementById('due-date');
const prioritySelect = document.getElementById('priority');

// Load tasks from local storage
const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Function to save tasks to local storage
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Initialize tasks array
let tasks = savedTasks;

// Function to create a new task object
function createTaskObject(taskText, category, dueDate, priority) {
  return {
    id: Date.now().toString(), // Unique identifier for each task
    text: taskText,
    category: category,
    dueDate: dueDate,
    priority: priority,
    completed: false,
  };
}

// Function to render tasks
function renderTasks() {
  taskContainer.innerHTML = ''; // Clear existing tasks

  tasks.forEach((task) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) {
      taskElement.classList.add('completed');
    }

    const taskTextElement = document.createElement('li');
    taskTextElement.innerText = task.text;
    taskElement.appendChild(taskTextElement);

    const editButton = document.createElement('button');
    editButton.innerHTML = '<i class="fa-solid fa-edit"></i>';
    editButton.classList.add('editTask');
    editButton.addEventListener('click', () => editTask(task));
    taskElement.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    deleteButton.classList.add('deleteTask');
    deleteButton.addEventListener('click', () => deleteTask(task.id));
    taskElement.appendChild(deleteButton);

    const checkButton = document.createElement('button'); // Add a new button for marking tasks as completed
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    checkButton.classList.add('checkTask');
    checkButton.addEventListener('click', () => markTaskAsCompleted(task.id));
    taskElement.appendChild(checkButton);

    taskContainer.appendChild(taskElement);
  });
}

// Function to add a new task
function addNewTask() {
  const taskText = inputTask.value.trim();
  const category = categorySelect.value;
  const dueDate = dueDateInput.value;
  const priority = prioritySelect.value;

  if (!taskText) {
    alert('Please Enter Task');
    return;
  }

  const newTask = createTaskObject(taskText, category, dueDate, priority);
  tasks.push(newTask);
  saveTasksToLocalStorage();
  renderTasks();
  inputTask.value = '';
  categorySelect.value = '';
  dueDateInput.value = '';
  prioritySelect.value = '';
}

// Function to edit a task
function editTask(task) {
  const newText = prompt('Edit Task:', task.text);
  if (newText !== null) {
    task.text = newText;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Function to delete a task by ID
function deleteTask(taskId) {
  tasks = tasks.filter((task) => task.id !== taskId);
  saveTasksToLocalStorage();
  renderTasks();
}

// Function to mark a task as completed
function markTaskAsCompleted(taskId) {
  const task = tasks.find((task) => task.id === taskId);
  if (task) {
    task.completed = !task.completed;
    saveTasksToLocalStorage();
    renderTasks();
  }
}

// Event listeners
addTask.addEventListener('click', addNewTask);
inputTask.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addNewTask();
  }
});


// Initial rendering of tasks
renderTasks();

