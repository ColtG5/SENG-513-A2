import { enemies } from '../enemy/enemy-spawning.js';
import { bullets } from '../weapons/weapon-spawning.js';

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
        console.log(bullet.element.offsetLeft)

        bullet.element.style.left = bullet.element.offsetLeft + bullet.dx + 'px';
        bullet.element.style.top = bullet.element.offsetTop + bullet.dy + 'px';

        console.log(bullet.element.offsetLeft)
    });

    // bullets.forEach((bullet) => {
    //     // bullet.x += bullet.dx;
    //     // bullet.y += bullet.dy;
    //     // bullet.element.style.left = bullet.x + 'px';
    //     // bullet.element.style.top = bullet.y + 'px';

    //     // console.log(bullet.element.left)
    //     // console.log(bullet.element.offsetLeft)
    //     // console.log(bullet.dx)

    //     // let newX = bullet.element.left + bullet.dx;

    //     console.log(bullet.element.offsetLeft)
        
        

    //     bullet.element.style.left = bullet.element.offsetLeft + bullet.dx + 'px';
    //     bullet.element.style.top = bullet.element.offsetTop + bullet.dy + 'px';


    //     console.log(bullet.element.offsetLeft)
    //     // console.log
    // });
}

function updateEnemies() {
    // enemies.forEach((enemy) => {
    //     let dx, dy = getDirectionToMove(enemy, character);
    //     let newX = enemy.element.offsetLeft + dx;
    //     let newY = enemy.element.offsetTop + dy;
    //     enemy.element.style.left = newX + 'px';
    //     enemy.element.style.top = newY + 'px';
    // });
    
}

export { getDirectionToMove, updateBullets, updateEnemies }