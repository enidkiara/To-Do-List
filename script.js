const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

window.onload = ( ) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(addTaskToList);
};

addBtn.addEventListener("click", ( ) => {
    const taskText = taskInput.value.trim();
    if (taskText === " ") return;

    addTaskToList(taskText);
    saveTasks();
    taskInput.value = " ";
});

function addTaskToList(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
    saveTasks();
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}