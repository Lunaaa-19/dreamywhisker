document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('new-task-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskList = document.getElementById('task-list');
    const clearCompletedBtn = document.getElementById('clear-completed-btn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Function to render tasks
    function renderTasks(filter = 'all') {
        taskList.innerHTML = '';
        const filteredTasks = tasks.filter(task => {
            if (filter === 'pending') return !task.completed;
            if (filter === 'completed') return task.completed;
            return true;
        });

        filteredTasks.forEach((task, index) => {
            const taskItem = document.createElement('li');
            taskItem.className = task.completed ? 'completed' : '';
            taskItem.innerHTML = `
                <span>${task.text}</span>
                <div>
                    <button class="complete-btn">${task.completed ? '✔' : '✔'}</button>
                    <button class="delete-btn">✖</button>
                    <button class="edit-btn">✎</button>
                </div>
            `;

            // Mark task as complete
            taskItem.querySelector('.complete-btn').addEventListener('click', () => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks(filter);
            });

            // Delete task
            taskItem.querySelector('.delete-btn').addEventListener('click', () => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks(filter);
            });

            // Edit task
            taskItem.querySelector('.edit-btn').addEventListener('click', () => {
                const newText = prompt('Edit your task:', task.text);
                if (newText) {
                    tasks[index].text = newText;
                    saveTasks();
                    renderTasks(filter);
                }
            });

            taskList.appendChild(taskItem);
        });
    }

    // Add task
    addTaskBtn.addEventListener('click', () => {
        const newTaskText = taskInput.value.trim();
        if (newTaskText !== '') {
            tasks.push({ text: newTaskText, completed: false });
            taskInput.value = '';
            saveTasks();
            renderTasks();
        }
    });

    // Clear completed tasks
    clearCompletedBtn.addEventListener('click', () => {
        tasks = tasks.filter(task => !task.completed);
        saveTasks();
        renderTasks();
    });

    // Filter tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            renderTasks(filter);
        });
    });

    // Save tasks to localStorage
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Initial render
    renderTasks();
});
