const gameGridSize = 30;
const gridItemSize = 10;

document.addEventListener('DOMContentLoaded', function() {
    const gameGrid = document.getElementById('game-grid');

    gameGrid.style.setProperty('--grid-item-amount', gameGridSize);
    gameGrid.style.setProperty('--grid-item-size', gridItemSize + 'px');

    for (let i = 0; i < gameGridSize; i++) {
        for (let j = 0; j < gameGridSize; j++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('grid-item');
            gameGrid.appendChild(gridItem);
        }
    }

    // // const gridItem = document.createElement('div');
    // // gridItem.classList.add('grid-item');

    // console.log(gameGrid.offsetWidth);
    // console.log(gameGrid.offsetHeight);

    // const howManyGridItemsWide = Math.floor(gameGrid.offsetWidth / gameGridSize);
    // console.log("howManyGridItemsWide: " + howManyGridItemsWide);
    // for (let i = 0; i < howManyGridItemsWide; i++) {
    //     const gridItem = document.createElement('div');
    //     gridItem.classList.add('grid-item');
    //     // gridItem.style.width = `${widthOfGridItems}px`;
    //     // gridItem.style.height = `${widthOfGridItems}px`;
    //     gameGrid.appendChild(gridItem);
    //     // gameGrid.append(gridItem)
    //     console.log("appended grid item!");
    // }
    // // gameGrid.appendChild(gridItem);

});