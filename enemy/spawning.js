import { createZombie } from './enemy.js';

function spawnZombie() {
    let enemy = createZombie();
    return enemy;
}

function spawnAfterFiveSeconds() {
    setTimeout(spawnZombie, 5000);
}