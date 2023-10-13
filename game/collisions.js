import { bullets, bulletHeight, bulletWidth } from "../character/character.js";
import { enemies } from "../enemy/spawning.js";

const gameContainer = document.getElementById('game-container');

const maxX = gameContainer.offsetWidth;
const maxY = gameContainer.offsetHeight;

function collisionsToCheck() {
    bulletWallCollision();
    checkCollisions(bullets, enemies, bulletEnemyCollision);
}

function checkCollisions(array1, array2, funcIfCollided) {
    for (const elm1 of array1) {
        for (const elm2 of array2) {
            if (isColliding(elm1, elm2)) {
                funcIfCollided(elm1, elm2);
            }
        }
    }
}

function bulletWallCollision() {
    bullets.forEach((bullet) => {
        const bulletLeft = bullet.x;
        const bulletRight = bullet.x + bulletWidth;
        const bulletTop = bullet.y;
        const bulletBottom = bullet.y + bulletHeight;

        if (bulletLeft < 0 || bulletRight > maxX || bulletTop < 0 || bulletBottom > maxY ) {
            bullet.element.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
            return;
        }
    });
}


function bulletEnemyCollision(bullet, enemy) {
    // check if bullet collides with enemy on the page
    // if it does, remove the bullet, and remove the enemy
    // console.log("collided")
    bullet.element.remove();
    bullets.splice(bullets.indexOf(bullet), 1);
    enemy.element.remove();
    enemies.splice(enemies.indexOf(enemy), 1);
}



export { collisionsToCheck }