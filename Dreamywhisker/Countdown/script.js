let interval; // Declare the interval variable globally to control it in multiple functions

document.getElementById("startCountdown").addEventListener("click", function() {
    const dateInput = document.getElementById("dateInput").value;
    const timeInput = document.getElementById("timeInput").value;

    if (dateInput && timeInput) {
        const targetDate = new Date(dateInput + 'T' + timeInput).getTime();
        localStorage.setItem("countdown", targetDate); // Save the new target date in local storage
        clearInterval(interval); // Clear any existing countdown
        startCountdown(targetDate);
    } else {
        alert("Please select both date and time!");
    }
});

function startCountdown(targetDate) {
    function updateCountdown() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining < 0) {
            clearInterval(interval);
            document.getElementById('countdown').innerHTML = "Time's up!";
            localStorage.removeItem("countdown"); // Clear expired countdown from local storage
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    interval = setInterval(updateCountdown, 1000); // Use the global interval variable
    updateCountdown(); // Run the countdown immediately
}

// Load countdown from local storage if available
document.addEventListener('DOMContentLoaded', function() {
    const savedCountdown = localStorage.getItem("countdown");
    if (savedCountdown) {
        const targetDate = parseInt(savedCountdown, 10);
        if (targetDate > new Date().getTime()) {
            clearInterval(interval); // Clear any existing countdown
            startCountdown(targetDate); // Start the countdown if the saved target date is valid
        } else {
            localStorage.removeItem("countdown"); // Clear expired countdown
        }
    }
});
