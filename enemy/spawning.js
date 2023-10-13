import { createZombie } from './enemy.js';

const gameContainer = document.getElementById('game-container');

let enemies = []

function spawnZombie() {
    let enemy = createZombie();
    gameContainer.appendChild(enemy.element);
    enemies.push(enemy);
    console.log(`Spawned a ${enemy.type}. ${enemies}`)
    console.log(enemy.element.offsetWidth)
    console.log(enemy.element.offsetLeft)

    // set the top and left properties of the zombie to a random posotion valid inside the game container
    enemy.element.style.top = Math.floor(Math.random() * (gameContainer.offsetHeight - enemy.element.offsetHeight)) + 'px';
    enemy.element.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - enemy.element.offsetWidth)) + 'px';
}

setInterval(spawnZombie, 1000);

export { enemies }