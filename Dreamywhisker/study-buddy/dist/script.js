document.addEventListener('DOMContentLoaded', () => {
    // Variables
    const video = document.getElementById('anime-video');
    const startButton = document.getElementById('start');
    const pauseButton = document.getElementById('pause');
    const resetButton = document.getElementById('reset');
    const doneButton = document.getElementById('done');
    const timerDisplay = document.querySelector('.timer-display h2');
    const newTaskInput = document.getElementById('new-task');
    const categorySelect = document.getElementById('category-select');
    const addTaskButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');


    let timer;
    let isRunning = false;
    let startTime;
    let timeElapsed = 0; // Time elapsed during current session

    // Timer Functions
    function updateTimerDisplay() {
        const minutes = Math.floor(timeElapsed / 60).toString().padStart(2, '0');
        const seconds = (timeElapsed % 60).toString().padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;
    }

    function startTimer() {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now() - timeElapsed * 1000; // Adjust start time based on elapsed time
            video.play(); // Start video playback
            timer = setInterval(() => {
                timeElapsed = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time
                updateTimerDisplay();
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            video.pause(); // Pause video playback
        }
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        timeElapsed = 0;
        updateTimerDisplay();
        video.pause(); // Pause video playback
        video.currentTime = 0; // Reset video to start
    }

    function recordSession() {
        // Placeholder for recording session time
        // Implement your progress tracking logic here
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        const category = categorySelect.value;
        if (taskText) {
            const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
            tasks.push({ text: taskText, category });
            localStorage.setItem('tasks', JSON.stringify(tasks));
            displayTasks();
            newTaskInput.value = '';
        }
    }

    function displayTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${task.text} (${task.category})</span>
                <button class="delete-btn">❌</button>
            `;
            taskList.appendChild(li);
        });
    }

    function deleteTask(taskIndex) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.splice(taskIndex, 1);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        displayTasks();
    }

    // Event Listeners for Timer Controls
    startButton.addEventListener('click', startTimer);
    pauseButton.addEventListener('click', pauseTimer);
    resetButton.addEventListener('click', resetTimer);
    doneButton.addEventListener('click', () => {
        if (isRunning) {
            clearInterval(timer);
            isRunning = false;
            video.pause(); // Pause video playback
            recordSession(); // Record session time
        }
    });

    // Event Listener for Adding Tasks
    addTaskButton.addEventListener('click', addTask);

    // Event Listener for Task Actions (Delete)
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const index = Array.from(taskList.children).indexOf(e.target.closest('li'));
            deleteTask(index);
        }
    });

    // Ensure the video is muted and set to loop
    video.muted = true;
    video.loop = true;

    // Display tasks on page load
    displayTasks();

    // Motivational Quotes Functions
    const quotes = [
        "Keep going, you're doing great!",
        "Believe in yourself!",
        "You can achieve anything!",
        "Stay positive and strong.",
        "Your hard work will pay off.",
        "Dream big and work hard.",
        "Success is a journey, not a destination."
    ];

    let currentQuoteIndex = 0;

    function displayQuote(index) {
        document.getElementById('quote-display').textContent = quotes[index];
    }
  

    function showNextQuote() {
        currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
        displayQuote(currentQuoteIndex);
    }

    function showPrevQuote() {
        currentQuoteIndex = (currentQuoteIndex - 1 + quotes.length) % quotes.length;
        displayQuote(currentQuoteIndex);
    }

    document.getElementById('next-quote').addEventListener('click', showNextQuote);
    document.getElementById('prev-quote').addEventListener('click', showPrevQuote);

    // Initialize with the first quote
    displayQuote(currentQuoteIndex);

    // Initialize timer display to 00:00
    timerDisplay.textContent = '00:00';
});