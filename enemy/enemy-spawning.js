import { createZombie } from './enemy.js';

const gameContainer = document.getElementById('game-container');

let enemies = []
let maxNumOfZombies = 15;

function spawnZombie() {
    if (enemies.length > maxNumOfZombies - 1) {
        return;
    }
    let enemy = createZombie();
    gameContainer.appendChild(enemy.element);

    enemy.element.style.top = Math.floor(Math.random() * (gameContainer.offsetHeight - enemy.element.offsetHeight)) + 'px';
    enemy.element.style.left = Math.floor(Math.random() * (gameContainer.offsetWidth - enemy.element.offsetWidth)) + 'px';

    // console.log(`height: ${enemy.element.offsetHeight}, width: ${enemy.element.offsetWidth}`)

    enemies.push(enemy);
    // console.log(`Spawned a ${enemy.type}. ${enemies}`)
    // console.log(enemy.element.offsetWidth)
    // console.log(enemy.element.offsetLeft)

    // set the top and left properties of the zombie to a random posotion valid inside the game container
}

function wave() {
    spawnZombie();
    spawnZombie();
    spawnZombie();
    spawnZombie();
    spawnZombie();
}

function waves() {
    console.log("waves")
    setInterval(() => {
        wave();
    }, 10000);
}

setTimeout(() => {
    wave();
    waves();
}, 2000);


export { enemies }