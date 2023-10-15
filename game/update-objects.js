import { enemies } from '../enemy/enemy-spawning.js';
import { bullets } from '../weapons/weapon-spawning.js';
import { isColliding } from './collisions.js'

const character = document.getElementById('character');

function getDirectionToMove(mover, target) {
    let characterCenterX = target.offsetLeft + target.offsetWidth / 2;
    let characterCenterY = target.offsetTop + target.offsetHeight / 2;
    let enemyX = mover.element.offsetLeft + mover.element.offsetWidth / 2;
    let enemyY = mover.element.offsetTop + mover.element.offsetHeight / 2;

    const deltaX = characterCenterX - enemyX;
    // console.log(mouseX, characterCenterX)
    const deltaY = characterCenterY - enemyY;

    // Calculate the magnitude of the direction vector
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the normalized direction vector
    const normalizedDeltaX = deltaX / magnitude;
    const normalizedDeltaY = deltaY / magnitude;

    // console.log(normalizedDeltaX, normalizedDeltaY)

    return {
        nDeltaX: normalizedDeltaX,
        nDeltaY: normalizedDeltaY
    };
}

function updateBullets() {
    bullets.map((bullet) => {
        // console.log(bullet.element.offsetLeft + bullet.dx)
        bullet.element.style.left = bullet.element.offsetLeft + (bullet.dx * bullet.speed) + 'px';
        bullet.element.style.top = bullet.element.offsetTop + (bullet.dy * bullet.speed) + 'px';
        // if (isColliding(bullet, enemy)) {
        //     console.log("collided")
        //     return
        // }
        // console.log(bullet.element.offsetLeft, bullet.element.offsetTop)
        // console.log(bullet.element.left)
        // console.log(bullet.dx, bullet.dy)

        // console.log(bullet.element.offsetLeft)
    });
}

function updateEnemies() {
    // enemies.forEach((enemy) => {
    //     let dx, dy = getDirectionToMove(enemy, character);
    //     let newX = enemy.element.offsetLeft + dx;
    //     let newY = enemy.element.offsetTop + dy;
    //     enemy.element.style.left = newX + 'px';
    //     enemy.element.style.top = newY + 'px';
    // });
    enemies.map((enemy) => {
        if (isColliding(enemy, {element: character})) {
            // console.log("collided, not moving closer!")
            return
        }

        // const {dx, dy} = getDirectionToMove(enemy, character);
        // console.log(character.offsetLeft, character.offsetTop)
        const dx = getDirectionToMove(enemy, character).nDeltaX * enemy.speed;
        const dy = getDirectionToMove(enemy, character).nDeltaY * enemy.speed;
        // console.log(dx, dy)
        let newX = enemy.element.offsetLeft + dx;
        let newY = enemy.element.offsetTop + dy;

        // console.log(enemy.element.offsetLeft, enemy.element.offsetTop);

        enemy.element.style.left = newX + 'px';
        enemy.element.style.top = newY + 'px';
    });

    // enemies.map((enemy) => {
    //     const { dx, dy } = getDirectionToMove(enemy, character);
    //     // console.log(dx, dy);
    
    //     // Calculate the new position using transform
    //     let newX = enemy.element.style.left ? parseFloat(enemy.element.style.left) : 0;
    //     let newY = enemy.element.style.top ? parseFloat(enemy.element.style.top) : 0;
    //     newX += dx;
    //     newY += dy;
    
    //     enemy.element.style.transform = `translate(${newX}px, ${newY}px)`;
    // });

    // enemies.map((enemy) => {
    //     // const {dx, dy} = getDirectionToMove(enemy, character);
    //     const dx = getDirectionToMove(enemy, character).nDeltaX * enemy.speed;
    //     const dy = getDirectionToMove(enemy, character).nDeltaY * enemy.speed;

    //     enemy.tx += dx;
    //     enemy.ty += dy;
    
    //     // // Calculate the new position based on the current position and the speed
    //     // const currentX = enemy.element.getBoundingClientRect().left;
    //     // const currentY = enemy.element.getBoundingClientRect().top;
    //     // const newX = currentX + dx;
    //     // const newY = currentY + dy;
    
    //     // // Update the enemy's position using transform
    //     console.log(dx, dy)
    //     console.log(enemy.tx, enemy.ty)
    //     enemy.element.style.transform = `translate(${enemy.tx}px, ${enemy.tx}px)`;
        
    // });
    
    
}

export { getDirectionToMove, updateBullets, updateEnemies }