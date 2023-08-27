const container = document.getElementById("grid-container");
const gridSizeSlider = document.getElementById("gridSize");
const gridSizeValue = document.getElementById("gridSizeValue");
const gridSizeValue2 = document.getElementById("gridSizeValue2");
const resetButton = document.getElementById("resetButton");

function createGrid(n) {
    container.innerHTML = ''; // Clear existing grid
    container.style.gridTemplateColumns = `repeat(${n}, 1fr)`;

    for (let i = 0; i < n * n; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
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
});

createGrid(16);  // Initial grid
