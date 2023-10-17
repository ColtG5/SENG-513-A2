import { createZombie, createBigMinion } from "./enemy.js";

const gameContainer = document.getElementById("game-container");

let enemies = [];
// let maxNumOfZombies = 15;
// let maxNumOfBigMinions = 2;
// let enemySpawnStuff = {
//     zombies: { maxNumOfZombies: maxNumOfZombies },
//     bigMinions: { maxNumOfBigMinions: maxNumOfBigMinions },
// };

function spawnZombie() {
    let enemy = createZombie();
    positionEnemy(enemy);
}

function spawnBigMinion() {
    let enemy = createBigMinion();
    positionEnemy(enemy);
}

function positionEnemy(enemy) {
    gameContainer.appendChild(enemy.element);
    enemy.element.style.top =
        Math.floor(Math.random() * (gameContainer.offsetHeight - enemy.element.offsetHeight)) + "px";
    enemy.element.style.left =
        Math.floor(Math.random() * (gameContainer.offsetWidth - enemy.element.offsetWidth)) + "px";

    enemies.push(enemy);
}

let canStartRound = true;
let countingRounds = 0;
// configure to my liking

function startWave() {
    // console.log()
    if (enemies.length == 0 && canStartRound) {
        console.log("starting a round");
        canStartRound = false;
        let waveText = document.getElementById("wave-text");
        // do the "starting round" text animation
        setTimeout(() => {
            countingRounds++;
            waveText.innerHTML = `ROUND ${countingRounds}`;
            waveText.style.animation = "fadeInOut 6s alternate";
        }, 3000);

        setTimeout(() => {
            waveText.style.animation = "none";
            spawnDuringRound();
        }, 9000);
    }
}

let startingZombieCount = 4;
let startingBigMinionCount = 1;

const roundsBetweenZombieHordeSizeIncrease = 5;
const roundsBetweenBigMinionHordeSizeIncrease = 8;

let extraZombiesEachRound = 1;
let extraBigMinionsEachRound = 0.2;

function spawnDuringRound() {
    // let zombieCountForRound = Math.floor(startingZombieCount-1 + extraZombiesEachRound * countingRounds);
    // let bigMinionCountForRound = Math.floor(startingBigMinionCount-1 + extraBigMinionsEachRound * countingRounds);
    let zombieCountForRound = startingZombieCount + Math.floor(extraZombiesEachRound * countingRounds);
    let bigMinionCountForRound = startingBigMinionCount + Math.floor(extraBigMinionsEachRound * countingRounds);
    const zombieHordeSize = countingRounds / roundsBetweenZombieHordeSizeIncrease;
    const bigMinionHordeSize = countingRounds / roundsBetweenBigMinionHordeSizeIncrease;

    let enemySpawnStuff = {
        zombies: {
            maxCount: zombieCountForRound,
            hordeSize: zombieHordeSize,
            spawnFunc: spawnZombie,
        },
        bigMinions: {
            maxCount: bigMinionCountForRound,
            hordeSize: bigMinionHordeSize,
            spawnFunc: spawnBigMinion,
        },
    };

    const spawningDuringRoundInterval = setInterval(() => {
        // const keys = Object.keys(enemySpawnStuff);

        // const randomIndex = Math.floor(Math.random() * keys.length);
        // enemyObj = enemySpawnStuff[randomEnemy];

        let result = randomEnemyFromRaffle(enemySpawnStuff);
        let enemyObj = result.enemyObj;
        let enemyObjKey = result.enemyObjKey;

        console.log(`spawning ${enemyObj}`);

        for (let i = 0; i <= enemyObj.hordeSize; i++) {
            enemyObj.spawnFunc();
        }

        enemyObj.maxCount--;
        if (enemyObj.maxCount <= 0) {
            // enemySpawnStuff.splice(enemyObj, 1);
            console.log(`\t\t\tdeleting ${enemyObj}`)
            delete enemySpawnStuff[enemyObjKey];
        }

        console.log(`enemySpawnStuff: ${enemySpawnStuff} ${Object.keys(enemySpawnStuff).length}}`);

        if (Object.keys(enemySpawnStuff).length == 0) {
            console.log("round over")
            canStartRound = true;
            clearInterval(spawningDuringRoundInterval);
        }

        // enemySpawnStuff[randomEnemy][maxCount]--;

        // if (zombiesSpawnedThisRound >= maxNumOfEnemies) {
        //     clearInterval(spawningDuringRoundInterval);
        //     canStartRound = true;
        //     maxZombieCount += extraZombiesEachRound;
        // }
    }, 1000);
}

function randomEnemyFromRaffle(enemySpawnStuff) {
    const keys = Object.keys(enemySpawnStuff);
    // console.log(keys);
    let raffleBowl = [];
    for (const key of keys) {
        // console.log(key);
        let enemyObj = enemySpawnStuff[key];
        // console.log(enemyObj);
        for (let i = 0; i < enemyObj.maxCount; i++) {
            raffleBowl.push(key);
        }
    }
    // console.log(raffleBowl);
    const raffleResult = Math.floor(Math.random() * raffleBowl.length);
    const raffleWinnerKey = raffleBowl[raffleResult];
    // console.log(`raffle result: ${raff}`);

    return { enemyObj: enemySpawnStuff[raffleWinnerKey], enemyObjKey: raffleWinnerKey };
}

export { enemies, startWave };
