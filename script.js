const container = document.getElementById("grid-container");
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const gridSizeValue2 = document.getElementById("gridSizeValue2");

function createGrid(rows, cols) {
    container.innerHTML = ''; // Clear existing grid
    container.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    for (let i = 0; i < rows * cols; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        container.appendChild(cell);
    }
}

gridSizeSlider.addEventListener('input', function() {
    gridSizeValue.textContent = this.value;
    gridSizeValue2.textContent = this.value;
    createGrid(this.value, this.value);
});

createGrid(16, 16);  // Initial grid
