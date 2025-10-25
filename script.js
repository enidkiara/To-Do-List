const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

window.onload = ( ) => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(addTaskToList);
};

addBtn.addEventListener("click", ( ) => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    addTaskToList(taskText);
    saveTasks();
    taskInput.value = "";
    updateCount();
});

function addTaskToList(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
        updateCount();
    });

    li.addEventListener('dblclick', function () {
    const currentText = li.firstChild.textContent.trim();

    const input = document.createElement('input');
    input.type = 'text';
    input.value = currentText;
    input.classList.add('edit-input');

    
    li.textContent = '';
    li.appendChild(input);
    input.focus();

    const saveEdit = () => {
        const newText = input.value.trim() || currentText;

        li.textContent = newText;
        li.appendChild(deleteBtn);
        saveTasks();
    };

    input.addEventListener('blur', saveEdit);
    input.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            saveEdit();
            input.blur();
        }
    });
});

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✖";
    deleteBtn.addEventListener("click", () => {
        li.remove();
        saveTasks();
        updateCount();
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

function updateCount() {
    const count = document.querySelectorAll("#taskList li:not(.completed)").length;
    document.getElementById("taskCount").textContent = `${count} tasks left`;
}
updateCount();

document.getElementById("clearAll").addEventListener("click", () => {
    taskList.innerHTML = "";
    saveTasks();
});

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const filter = btn.dataset.filter;
        const tasks = document.querySelectorAll("#taskList li");

        tasks.forEach(task => {
            const isCompleted = task.classList.contains("completed");

            if (filter === "all") {
                task.style.display = "flex";
            } else if (filter === "active") {
                task.style.display = isCompleted ? "none" : "flex";
            } else if (filter === "completed") {
                task.style.display = isCompleted ? "flex" : "none";
            }
        });
    });
});