import { enemies } from "../enemy/enemy-spawning.js";
import { bullets } from "../weapons/weapon-spawning.js";

const gameContainer = document.getElementById('game-container');
const character = document.getElementById('character');

const maxX = gameContainer.offsetWidth;
const maxY = gameContainer.offsetHeight;

function collisionsToCheck() {
    bulletWallCollision();
    checkCollisions(bullets, enemies, bulletEnemyCollision);
    checkCollisions(enemies, [{element: character}], enemyCharacterCollision)
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
        const bulletLeft = bullet.element.offsetLeft;
        const bulletRight = bulletLeft + bullet.element.offsetWidth;
        const bulletTop = bullet.element.offsetTop;
        const bulletBottom = bulletTop + bullet.element.offsetHeight;

        if (bulletLeft < 0 || bulletRight > maxX || bulletTop < 0 || bulletBottom > maxY ) {
            bullet.element.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("bullet removed")
            return;
        }
    });
}



function isColliding(elm1, elm2) {
    if (elm2 == character) {
        elm2 = {element: character}
    }
    const elm1Left = elm1.element.offsetLeft;
    const elm1Right = elm1Left + elm1.element.offsetWidth;
    const elm1Top = elm1.element.offsetTop;
    const elm1Bottom = elm1Top + elm1.element.offsetHeight;

    // console.log(`elm1Left: ${elm1Left}, elm1Right: ${elm1Right}, elm1Top: ${elm1Top}, elm1Bottom: ${elm1Bottom}`)

    // console.log(elm2)
    // console.log(elm2.element.offsetLeft, elm2.element.offsetWidth)
    const elm2Left = elm2.element.offsetLeft;
    const elm2Right = elm2Left + elm2.element.offsetWidth;
    const elm2Top = elm2.element.offsetTop;
    const elm2Bottom = elm2Top + elm2.element.offsetHeight;

    // console.log(`elm2Left: ${elm2Left}, elm2Right: ${elm2Right}, elm2Top: ${elm2Top}, elm2Bottom: ${elm2Bottom}`)

    if (elm1Left < elm2Right && elm1Right > elm2Left && elm1Top < elm2Bottom && elm1Bottom > elm2Top) {
        // console.log("HERE")
        return true;
    }
    return false;
}

function bulletEnemyCollision(bullet, enemy) {
    // console.log(bullet)
    if (bullet.enemiesHit.includes(enemy.id)) {
        return;
    }
    enemy.hp -= bullet.damage;
    // console.log(enemy.hp)
    if (enemy.hp <= 0) {
        enemy.element.remove();
        enemies.splice(enemies.indexOf(enemy), 1);
    }
    bullet.health -= enemy.damage;
    bullet.speed = Math.floor(bullet.speed * 0.5);
    // console.log(bullet.speed)
    // console.log(`bullet hp: ${bullet.hp}`)
    if (bullet.health <= 0) {
        bullet.element.remove();
        bullets.splice(bullets.indexOf(bullet), 1);
    }

    bullet.enemiesHit.push(enemy.id);
    // console.log(bullet)
}

function enemyCharacterCollision(enemy, character) {
    console.log("yeah")

    // check if enemy collides with character
    // if it does, remove health from the character

    
}


export { collisionsToCheck, isColliding }