const gameGridSize = Math.floor(screen.height / 20);;
const gridItemSize = 10;

const gameGrid = document.getElementById('game-grid');

console.log(Math.floor(screen.height / 20));

gameGrid.style.setProperty('--grid-item-amount', gameGridSize);
gameGrid.style.setProperty('--grid-item-size', gridItemSize + 'px');

for (let i = 0; i < gameGridSize; i++) {
    for (let j = 0; j < gameGridSize; j++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        gameGrid.appendChild(gridItem);
    }
}