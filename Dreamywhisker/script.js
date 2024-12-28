
    // Get the start icon and start popup
    const startIcon = document.getElementById('start-icon');
    const startPopup = document.getElementById('start-popup');
    const closePopupButton = document.getElementById('close-popup');

    // When the start icon is clicked, show the start popup
    startIcon.addEventListener('click', () => {
        startPopup.style.display = 'flex';
    });

    // When the close button is clicked, hide the start popup
    closePopupButton.addEventListener('click', () => {
        startPopup.style.display = 'none';
    });

    // Optional: Automatically update the date and time
    function updateDateTime() {
        const now = new Date();
        const options = {
           
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
         
            hour12: false
        };
        const formattedDateTime = now.toLocaleString('en-US', options);
        document.getElementById('date-time').textContent = formattedDateTime;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);



    // Make the popup draggable
const popup = document.getElementById('draggablePopup');
const menuBar = document.getElementById('menuBar');

let isDragging = false;
let offsetX = 0;
let offsetY = 0;

// When dragging starts
menuBar.addEventListener('mousedown', (e) => {
  isDragging = true;
  offsetX = e.clientX - popup.offsetLeft;
  offsetY = e.clientY - popup.offsetTop;
  popup.style.cursor = 'grabbing'; // Change cursor to grabbing
});

// When dragging ends
document.addEventListener('mouseup', () => {
  isDragging = false;
  popup.style.cursor = 'grab'; // Reset cursor
});

// Move the popup when dragging
document.addEventListener('mousemove', (e) => {
  if (isDragging) {
    popup.style.left = `${e.clientX - offsetX}px`;
    popup.style.top = `${e.clientY - offsetY}px`;
  }
});
