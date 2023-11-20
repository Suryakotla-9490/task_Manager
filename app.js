document.addEventListener('DOMContentLoaded', function () {
    // Retrieve tasks from local storage
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render tasks on page load
    renderTasks();

    // Function to add a new task
    window.addTask = function () {
        const taskInput = document.getElementById('task-input');
        const taskText = taskInput.value.trim();

        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            taskInput.value = '';
            localStorage.setItem('tasks', JSON.stringify(tasks));
            renderTasks();
        }
    };

    // Function to render tasks on the page
    function renderTasks() {
        const taskList = document.getElementById('task-list');
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
                <button onclick="toggleCompletion(${index})">Toggle</button>
                <button onclick="deleteTask(${index})">Delete</button>
            `;
            taskList.appendChild(listItem);
        });
    }

    // Function to toggle task completion
    window.toggleCompletion = function (index) {
        tasks[index].completed = !tasks[index].completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };

    // Function to delete a task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
    };
});
