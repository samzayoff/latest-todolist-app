const currentUser = localStorage.getItem("loggedInUser") || sessionStorage.getItem("loggedInUser");
if (!currentUser) {
  window.location.href = "index.html";
}

// Unload protection
function beforeUnloadHandler(e) {
  e.preventDefault();
  e.returnValue = '';
}
window.addEventListener("beforeunload", beforeUnloadHandler);

const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem(`tasks_${currentUser}`)) || [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    if (task.completed) li.classList.add('completed');

    li.addEventListener('click', function () {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function (e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
}

function saveTasks() {
  localStorage.setItem(`tasks_${currentUser}`, JSON.stringify(tasks));
}

function logout() {
  window.removeEventListener("beforeunload", beforeUnloadHandler);
  localStorage.removeItem("loggedInUser");
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

const users = JSON.parse(localStorage.getItem("users")) || {};
if (users[currentUser]) {
  document.getElementById("userNameDisplay").textContent = currentUser;
} else {
  alert("You are not logged in.");
  window.location.href = "index.html";
}

renderTasks();
