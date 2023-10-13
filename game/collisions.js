import { bullets, enemies } from collections.js

function collisionsToCheck() {
    checkCollisions(bullets, enemies, bulletEnemyCollision)
}

function checkCollisions(array1, array2, funcIfCollided) {
    for (const elm1 of array1) {
        for (const elm2 of array2) {
            if (isColliding(elm1, elm2)) {
                funcIfCollided(elm1, elm2)
            }
        }
    }
}

function bulletEnemyCollision(bullet, enemy) {

}



export { checkCollisions }