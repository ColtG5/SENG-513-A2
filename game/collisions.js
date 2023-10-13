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

function isColliding(elm1, elm2) {
    const elm1Left = elm1.element.offsetLeft;
    const elm1Right = elm1Left + elm1.element.offsetWidth;
    const elm1Top = elm1.element.offsetTop;
    const elm1Bottom = elm1Top + elm1.element.offsetHeight;

    console.log(`elm1Left: ${elm1Left}, elm1Right: ${elm1Right}, elm1Top: ${elm1Top}, elm1Bottom: ${elm1Bottom}`)

    const elm2Left = elm2.element.offsetLeft;
    const elm2Right = elm2Left + elm2.element.offsetWidth;
    const elm2Top = elm2.element.offsetTop;
    const elm2Bottom = elm2Top + elm2.element.offsetHeight;

    console.log(`elm2Left: ${elm2Left}, elm2Right: ${elm2Right}, elm2Top: ${elm2Top}, elm2Bottom: ${elm2Bottom}`)

    if (elm1Left < elm2Right && elm1Right > elm2Left && elm1Top < elm2Bottom && elm1Bottom > elm2Top) {
        console.log("HERE")
        return true;
    }
    return false;
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
    console.log("HERE")
    bullet.element.remove();
    bullets.splice(bullets.indexOf(bullet), 1);
    enemy.element.remove();
    enemies.splice(enemies.indexOf(enemy), 1);
}



export { collisionsToCheck }