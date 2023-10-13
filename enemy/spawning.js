import { createZombie } from './enemy.js';

let enemies = []


function spawnZombie() {
    let enemy = createZombie();
    return enemy;
}

export { spawnZombie, enemies }