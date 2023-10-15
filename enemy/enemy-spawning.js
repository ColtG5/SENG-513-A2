import { createZombie } from './enemy.js';

const gameContainer = document.getElementById('game-container');

let enemies = []
let maxNumOfZombies = 15;

function spawnZombie() {
    // if (enemies.length > maxNumOfZombies - 1) {
    //     return;
    // }
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

// function wave() {
//     spawnZombie();
//     spawnZombie();
//     spawnZombie();
//     spawnZombie();
//     spawnZombie();
// }

// function waves() {
//     console.log("waves")
//     setInterval(() => {
//         wave();
//     }, 10000);
// }

// setTimeout(() => {
//     wave();
//     waves();
// }, 2000);

let canStartRound = true;
let countingRounds = 0;
let maxZombieCount = 5;


function startWave() {
    // console.log()
    if (enemies.length == 0 && canStartRound) {
        console.log("starting a round")
        canStartRound = false;
        let waveText = document.getElementById('wave-text');
        // do the "starting round" text animation
        setTimeout(() => {
            countingRounds++;
            waveText.innerHTML = `ROUND ${countingRounds}`;
            waveText.style.animation = 'fadeInOut 6s alternate'
        }, 3000);

        // set the interval for spawning in the zombies for this round
        setTimeout(() => {
            // waveText.style.opacity = '0';
            waveText.style.animation = 'none';
            let zombiesSpawnedThisRound = 0;
            const zombieSpawning = setInterval(() => {
                // console.log(countingRounds / 2)
                const zombieHordeSize = countingRounds / 2;
                for (let i = 0; i <= zombieHordeSize; i++) {
                    spawnZombie();
                }
                zombiesSpawnedThisRound++;

                if (zombiesSpawnedThisRound == maxZombieCount) {
                    clearInterval(zombieSpawning);
                    canStartRound = true;
                    maxZombieCount += 2;
                }
            }, 1000);
        }, 9000);
    }
}



export { enemies, startWave }