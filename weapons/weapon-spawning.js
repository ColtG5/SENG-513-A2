import { createBullet } from "../weapons/weapons.js";
import { onWindow } from "../utility.js";
import { gunImage } from "../character/character.js";
import { getDirectionToMove } from "../game/update-objects.js";

const gameContainer = document.getElementById("game-container");
const character = document.getElementById("character");

let bullets = [];
const bulletWidth = 10;
const bulletHeight = 10;
const rapidFireDelay = 150;

const seperationFromCharacter = 30;

let mouseDown = false;
let mouseX, mouseY;

let rapidFiring = false;
gameContainer.addEventListener("mousedown", (event) => {
    if (onWindow === true) {
        mouseDown = true;

        mouseX = event.clientX - gameContainer.offsetLeft;
        mouseY = event.clientY - gameContainer.offsetTop;

        // this below code is hilarious

        // const rapidFireDelayInterval = setInterval(() => {
        //     spawnBullet(event);
        //     if (mouseDown) {
        //         rapidFireDelayInterval.clearInterval();
        //     }
        // }, rapidFireDelay);

        if (rapidFiring === false) {
            rapidFiring = true;
            const rapidFireDelayInterval = setInterval(() => {
                spawnBullet(event);
                if (!mouseDown) {
                    rapidFiring = false;
                    clearInterval(rapidFireDelayInterval);
                }
            }, rapidFireDelay);
        }


        // spawn a bullet every rapidFireDelay seconds, and stop spawning bullets once mouseDown isnt true
    }
});

gameContainer.addEventListener("mousemove", (event) => {
    if (onWindow === true && mouseDown) {
        // Update the mouse position as the mouse moves
        mouseX = event.clientX - gameContainer.offsetLeft;
        mouseY = event.clientY - gameContainer.offsetTop;
    }
});

gameContainer.addEventListener("mouseup", (event) => {
    if (onWindow === true) {
        mouseDown = false;
    }
});

function bulletDirection() {
    // Calculate the direction vector from character to mouse pointer
    // const mouseX = event.clientX - gameContainer.offsetLeft;
    // const mouseY = event.clientY - gameContainer.offsetTop;
    const characterCenterX = character.offsetLeft + character.offsetWidth / 2;
    const characterCenterY = character.offsetTop + character.offsetHeight / 2;

    const deltaX = mouseX - characterCenterX;
    // console.log(mouseX, characterCenterX)
    const deltaY = mouseY - characterCenterY;

    // Calculate the magnitude of the direction vector
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Calculate the normalized direction vector
    const normalizedDeltaX = deltaX / magnitude;
    const normalizedDeltaY = deltaY / magnitude;

    // console.log(normalizedDeltaX, normalizedDeltaY)

    return {
        nDeltaX: normalizedDeltaX,
        nDeltaY: normalizedDeltaY,
    };
}

function spawnBullet(event) {
    let bullet = createBullet();
    const dx = bulletDirection(event).nDeltaX;
    const dy = bulletDirection(event).nDeltaY;

    gunImage()

    // const { dx, dy } = bulletDirection(event)
    // const { dx, dy } = bulletDirection(event);

    // const speed = bullet.speed;
    // bullet.dx = dx * speed;
    // bullet.dy = dy * speed;

    bullet.dx = dx;
    bullet.dy = dy;

    // console.log(dx, dy);

    const bulletStartX =
        character.offsetLeft +
        character.offsetWidth / 2 +
        dx * seperationFromCharacter -
        bulletWidth / 2;
    const bulletStartY =
        character.offsetTop +
        character.offsetHeight / 2 +
        dy * seperationFromCharacter -
        bulletHeight / 2;

    bullet.element.style.offsetWidth = bulletWidth + "px";
    bullet.element.style.offsetHeight = bulletHeight + "px";
    bullet.element.style.left = bulletStartX + "px";
    bullet.element.style.top = bulletStartY + "px";

    gameContainer.appendChild(bullet.element);
    // console.log(bullet)
    bullets.push(bullet);
    console.log("shoot fr fr");
    // console.log(bullets);
}

export { bullets };
