import { character } from "../character/character.js";
import { enemies } from "../enemy/enemy-spawning.js";
import { bullets } from "../weapons/weapon-spawning.js";
import { gameContainer } from "../utility.js";
// const character = document.getElementById("character");

const maxX = gameContainer.offsetWidth;
const maxY = gameContainer.offsetHeight;

function collisionsToCheck() {
    bulletWallCollision();
    checkCollisions(bullets, enemies, bulletEnemyCollision);
    checkCollisions(enemies, [character], enemyCharacterCollision);
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

        if (bulletLeft < 0 || bulletRight > maxX || bulletTop < 0 || bulletBottom > maxY) {
            bullet.element.remove();
            bullets.splice(bullets.indexOf(bullet), 1);
            console.log("bullet removed");
            return;
        }
    });
}

function isColliding(elm1, elm2) {
    // if (elm2 == character) {
    //     elm2 = { element: character };
    // }

    const elm1Hurtbox = elm1.element.children[0];
    const elm2Hurtbox = elm2.element.children[0];

    const elm1Left = elm1.element.offsetLeft + elm1Hurtbox.offsetLeft;
    const elm1Right = elm1Left + elm1.element.offsetWidth - elm1Hurtbox.offsetLeft * 2;
    const elm1Top = elm1.element.offsetTop + elm1Hurtbox.offsetTop;
    const elm1Bottom = elm1Top + elm1.element.offsetHeight - elm1Hurtbox.offsetTop * 2;

    // console.log(`elm1: ${elm1.element.id}\t elm2: ${elm2.element.id}`)
    // console.log(elm1)
    // console.log(elm1.element)

    // console.log(elm1.element);
    // console.log(elm1.element.querySelector(".zombie-hurtbox"));
    // console.log(elm1.element.offsetLeft)

    // elm1 =
    // console.log(elm1.element.children[0].offsetLeft)

    // console.log(elm1.element.querySelector(".zombie-hurtbox").offsetLeft)

    // console.log(`elm1Left: ${elm1Left}, elm1Right: ${elm1Right}, elm1Top: ${elm1Top}, elm1Bottom: ${elm1Bottom}`)

    // console.log(elm2)
    // console.log(elm2.element.offsetLeft, elm2.element.offsetWidth)
    const elm2Left = elm2.element.offsetLeft + elm2Hurtbox.offsetLeft;
    const elm2Right = elm2Left + elm2.element.offsetWidth - elm2Hurtbox.offsetLeft * 2;
    const elm2Top = elm2.element.offsetTop + elm2Hurtbox.offsetTop;
    const elm2Bottom = elm2Top + elm2.element.offsetHeight - elm2Hurtbox.offsetTop * 2;

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

    let healthbar = enemy.element.querySelector("progress");
    console.log(`\t\t\t${healthbar}`)
    healthbar.value = enemy.hp;
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
    // console.log("yeah")
    // check if enemy collides with character
    // if it does, remove health from the character
    // console.log(character)
    if (!enemy.canAttack) {
        return;
    }
    console.log("attacked")
    character.hp -= enemy.damage;
    let healthbar = character.element.querySelector("progress");
    healthbar.value = character.hp;

    enemy.canAttack = false;
    setTimeout(() => {
        enemy.canAttack = true;
    }, 1000);

    if (character.hp <= 0) {
        // character.element.remove();
        console.log("you died");
        location.reload();
    }
}

export { collisionsToCheck, isColliding };
