// Function to append characters to the display
function appendToDisplay(value) {
    document.getElementById('display').value += value;
  }
  
  // Function to clear the display
  function clearDisplay() {
    document.getElementById('display').value = '';
  }
  
  // Function to delete the last character
  function deleteChar() {
    const display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
  }
  
  // Function to evaluate the expression
  function calculate() {
    try {
      const display = document.getElementById('display');
      display.value = eval(display.value);
    } catch {
      alert('Invalid calculation');
    }
  }
  
  // Function to evaluate the expression
function calculate() {
    try {
      const display = document.getElementById('display');
      // Handle percentage calculation by replacing '%' with '/100' for evaluation
      display.value = eval(display.value.replace('%', '/100'));
    } catch {
      alert('Invalid calculation');
    }
  }
  
  // Function to calculate the square root
  function calculateSquareRoot() {
    const display = document.getElementById('display');
    const value = parseFloat(display.value);
    if (isNaN(value)) {
      alert('Invalid input');
      return;
    }
    display.value = Math.sqrt(value);
  }