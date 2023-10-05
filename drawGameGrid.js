const gameGridSize = 20;

document.addEventListener('DOMContentLoaded', function() {
    const gameGrid = document.getElementById('game-grid');

    // const gridItem = document.createElement('div');
    // gridItem.classList.add('grid-item');

    console.log(gameGrid.offsetWidth);
    console.log(gameGrid.offsetHeight);

    const howManyGridItemsWide = Math.floor(gameGrid.offsetWidth / gameGridSize);
    console.log("howManyGridItemsWide: " + howManyGridItemsWide);
    for (let i = 0; i < howManyGridItemsWide; i++) {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        // gridItem.style.width = `${widthOfGridItems}px`;
        // gridItem.style.height = `${widthOfGridItems}px`;
        gameGrid.appendChild(gridItem);
        // gameGrid.append(gridItem)
        console.log("appended grid item!");
    }
    // gameGrid.appendChild(gridItem);

});