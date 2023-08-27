const container = document.getElementById("grid-container");
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const gridSizeValue2 = document.getElementById("gridSizeValue2");
const resetButton = document.getElementById("resetButton");
const penColorPicker = document.getElementById("penColor");
const backgroundColorPicker = document.getElementById("backgroundColor");

let isMousePressed = false;
let currentPenColor = '#000000'; // Default color

function createGrid(n) {
    container.innerHTML = ''; // Clear existing grid
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n * n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        
        // Attach mouse events to each cell for drawing functionality
        cell.addEventListener('mousedown', function(event) {
            isMousePressed = true;
            event.target.style.backgroundColor = currentPenColor;
            event.target.setAttribute('painted', true); // Tag cell as painted
        });

        cell.addEventListener('mouseover', function(event) {
            if (isMousePressed) {
                event.target.style.backgroundColor = currentPenColor;
                event.target.setAttribute('painted', true); // Tag cell as painted
            }
        });
        
        container.appendChild(cell);
    }
}

gridSizeSlider.addEventListener('input', function() {
    gridSizeValue.textContent = this.value;
    gridSizeValue2.textContent = this.value;
    createGrid(this.value);
});

resetButton.addEventListener('click', function() {
    gridSizeSlider.value = 16;
    gridSizeValue.textContent = 16;
    gridSizeValue2.textContent = 16;
    createGrid(16);
    
    // Reset colors and 'painted' attribute for all cells
    let cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        cell.style.backgroundColor = '#ffffff'; // Set background color to white
        cell.removeAttribute('painted'); // Remove painted attribute
    });
    
    penColorPicker.value = '#000000'; // Reset pen color to black
    backgroundColorPicker.value = '#ffffff'; // Reset background color to white
    currentPenColor = '#000000'; // Set the current pen color to the default
});

penColorPicker.addEventListener('input', function() {
    currentPenColor = this.value;
});

backgroundColorPicker.addEventListener('input', function() {
    let cells = document.querySelectorAll('.grid-cell');
    cells.forEach(cell => {
        // Only change the background color of cells which have not been painted over
        if (!cell.hasAttribute('painted')) {
            cell.style.backgroundColor = this.value;
        }
    });
});

// Global mouse events to handle drawing and prevent unwanted behavior
document.addEventListener('mouseup', function() {
    isMousePressed = false;
});
document.addEventListener('mouseleave', function() {
    isMousePressed = false;
});
document.addEventListener('dragstart', function(event) {
    event.preventDefault();
});

createGrid(16);  // Create the initial grid
