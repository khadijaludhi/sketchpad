// Selecting important elements from the HTML document.
const container = document.getElementById("grid-container");
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const gridSizeValue2 = document.getElementById("gridSizeValue2");
const resetButton = document.getElementById("resetButton");
const penColorPicker = document.getElementById("penColor");
const backgroundColorPicker = document.getElementById("backgroundColor");
const undoButton = document.getElementById("undoButton");
const redoButton = document.getElementById("redoButton");

// Setting initial state and default values.
let isMousePressed = false; // Whether the mouse is being pressed or not.
let currentPenColor = '#000000'; // Default drawing color.
let drawingSession = false; // Track if user is currently drawing.

// For undo and redo functionality.
let history = []; // To keep track of drawn states.
let historyIndex = -1; // To navigate through drawn states.

// Save the current drawing to history.
function saveStateToHistory() {
    const currentState = [...container.children].map(cell => ({
        color: cell.style.backgroundColor,
        painted: cell.hasAttribute('painted')
    }));
    history = history.slice(0, historyIndex + 1);
    history.push(currentState);
    historyIndex++;
}

// Load a saved state from history.
function loadStateFromHistory() {
    const savedState = history[historyIndex];
    
    container.childNodes.forEach((cell, index) => {
        cell.style.backgroundColor = savedState[index].color;
        
        if (savedState[index].painted) {
            cell.setAttribute('painted', true);
        } else {
            cell.removeAttribute('painted');
        }
    });
}

// Create a grid for drawing.
function createGrid(n) {
    container.innerHTML = ''; // Remove any previous grid.
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`; // Set grid columns.

    for (let i = 0; i < n * n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        
        // Event to handle starting a drawing.
        cell.addEventListener('mousedown', function(event) {
            isMousePressed = true;
            event.target.style.backgroundColor = currentPenColor;
            event.target.setAttribute('painted', true);
            drawingSession = true;  // Indicate that drawing has started.
        });
        
        // Event to handle drawing continuation.
        cell.addEventListener('mouseover', function(event) {
            if (isMousePressed) {
                event.target.style.backgroundColor = currentPenColor;
                event.target.setAttribute('painted', true);
            }
        });

        container.appendChild(cell); // Add cell to the grid.
    }
}

// Event to handle grid size change.
gridSizeSlider.addEventListener('input', function() {
    gridSizeValue.textContent = this.value;
    gridSizeValue2.textContent = this.value;
    createGrid(this.value);
    saveStateToHistory();
});

// Event to handle grid reset.
resetButton.addEventListener('click', function() {
    gridSizeSlider.value = 16;
    gridSizeValue.textContent = 16;
    gridSizeValue2.textContent = 16;
    createGrid(16);
    penColorPicker.value = '#000000';
    backgroundColorPicker.value = '#ffffff'; 
    currentPenColor = '#000000';
    saveStateToHistory();
});

// Event to update drawing color.
penColorPicker.addEventListener('input', function() {
    currentPenColor = this.value;
});

// Event to update grid background color.
backgroundColorPicker.addEventListener('input', function() {
    let cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        if (!cell.hasAttribute('painted')) {
            cell.style.backgroundColor = this.value;
        }
    });
    saveStateToHistory();
});

// Undo functionality.
undoButton.addEventListener('click', function() {
    if (historyIndex > 0) {
        historyIndex--;
        loadStateFromHistory();
    }
});

// Redo functionality.
redoButton.addEventListener('click', function() {
    if (historyIndex < history.length - 1) {
        historyIndex++;
        loadStateFromHistory();
    }
});

// Events to handle end of drawing session.
document.addEventListener('mouseup', function() {
    isMousePressed = false;
    if (drawingSession) {
        drawingSession = false;
        saveStateToHistory();
    }
});
document.addEventListener('mouseleave', function() {
    isMousePressed = false;
    if (drawingSession) {
        drawingSession = false;
        saveStateToHistory();
    }
});

// Prevent unwanted drag behavior.
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

// Create initial grid and save its state.
createGrid(16);
saveStateToHistory(); 
