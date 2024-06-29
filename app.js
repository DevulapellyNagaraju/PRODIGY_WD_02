let timer; // To hold setInterval instance
let time = 0; // Initial time in milliseconds
let running = false; // Flag to track if stopwatch is running
let lapNumber = 1; // Track lap number
let lapTimes = []; // Array to store lap times

function startStop() {
  if (running) {
    clearInterval(timer);
    running = false;
    document.querySelector('button').textContent = 'Start';
  } else {
    timer = setInterval(updateTime, 10); // Update every 10ms
    running = true;
    document.querySelector('button').textContent = 'Stop';
  }
}

function reset() {
  clearInterval(timer);
  running = false;
  time = 0;
  updateDisplay();
  lapTimes = []; // Reset lap times array
  displayLapTimes(); // Clear lap list display
  document.getElementById('clearButton').style.display = 'none'; // Hide Clear button
  document.getElementById('clearAllButton').style.display = 'none'; // Hide Clear All button
  document.querySelector('button').textContent = 'Start';
}

function updateTime() {
  time += 10; // Increment time by 10ms
  updateDisplay();
}

function recordLap() {
  if (running) {
    // Capture current lap time
    const lapTime = document.querySelector('.time').textContent;

    // Add lap time to lapTimes array
    lapTimes.push({ lap: lapNumber++, time: lapTime, millis: time });

    // Display lap times
    displayLapTimes();

    // Toggle visibility of Clear and Clear All buttons
    toggleClearButtons();
  }
}

function clearLast() {
  if (lapTimes.length > 0) {
    lapTimes.pop(); // Remove the last lap time from lapTimes array
    displayLapTimes(); // Update display to reflect the removal
  }

  // Toggle visibility of Clear and Clear All buttons
  toggleClearButtons();
}

function clearAll() {
  lapTimes = []; // Clear lapTimes array
  displayLapTimes(); // Update display to clear lap list

  // Toggle visibility of Clear and Clear All buttons
  toggleClearButtons();
}

function toggleClearButtons() {
  const clearButton = document.getElementById('clearButton');
  const clearAllButton = document.getElementById('clearAllButton');

  // Show Clear button if there's more than one lap recorded
  if (lapTimes.length > 1) {
    clearButton.style.display = 'inline-block';
  } else {
    clearButton.style.display = 'none';
  }

  // Show Clear All button if there are more than two lap times
  if (lapTimes.length > 2) {
    clearAllButton.style.display = 'inline-block';
  } else {
    clearAllButton.style.display = 'none';
  }
}

function displayLapTimes() {
  const lapList = document.getElementById('lapList');
  if (lapList) {
    lapList.innerHTML = ''; // Clear existing lap list

    // Display lap times if there are any
    if (lapTimes.length > 0) {
      lapTimes.forEach((lap, index) => {
        const lapDisplay = document.createElement('div'); // Changed li to div
        lapDisplay.classList.add('lap');

        const lapNumber = (lap.lap).toString().padStart(2, '0');
        const lapTime = lap.time;
        const lapDiff = index === 0 ? lap.millis : lap.millis - lapTimes[index - 1].millis;
        const formattedDiff = formatTime(lapDiff);

        lapDisplay.innerHTML = `<span>${lapNumber}</span><span>${lapTime}</span><span>+${formattedDiff}</span>`;
        lapList.appendChild(lapDisplay);
      });

      // Show Clear and Clear All buttons based on lap count
      toggleClearButtons();
    } else {
      // Hide Clear and Clear All buttons if no lap times
      document.getElementById('clearButton').style.display = 'none';
      document.getElementById('clearAllButton').style.display = 'none';
    }
  }
}

function formatTime(timeInMillis) {
  const minutes = Math.floor(timeInMillis / 60000);
  const seconds = Math.floor((timeInMillis % 60000) / 1000);
  const milliseconds = Math.floor((timeInMillis % 1000) / 10);
  return `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function updateDisplay() {
  const minutes = Math.floor(time / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);
  document.querySelector('.time').textContent = `${minutes}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}
