// const character = document.getElementById('character');
import { gameContainer } from "../utility.js";

class Character {
    constructor(type, hp, damage, defense, speed, xp, money, image) {
        this.type = type;
        this.hp = hp;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;
        this.xp = xp;
        this.money = money;
        this.image = image;
        this.element = document.createElement("div");
        this.element.id = "character";
        let hurtbox = document.createElement("div");
        hurtbox.classList.add("character-hurtbox");
        this.element.appendChild(hurtbox);
        let healthbar = document.createElement("progress");
        healthbar.classList.add("healthbar");
        healthbar.value = this.hp;
        healthbar.max = this.hp;
        healthbar.maxwidth = "100%";
        this.element.appendChild(healthbar);
        // this.element.querySelector(".healthbar").classList.add("character-no-transform");
        this.tx = 0;
        this.ty = 0;
        this.canAttack = true;
    }
}

let character = new Character("character", 100);
gameContainer.appendChild(character.element);
// character.element

const movementSpeed = 3;
const maxX = gameContainer.offsetWidth;
// console.log(maxX)
const maxY = gameContainer.offsetHeight;

let x = character.element.offsetLeft;
let y = character.element.offsetTop;
let dx = 0;
let dy = 0;

function updateCharacterPosition() {
    if (isKeyDown("w")) {
        dy = -movementSpeed;
    } else if (isKeyDown("s")) {
        dy = movementSpeed;
    } else {
        dy = 0;
    }

    if (isKeyDown("a")) {
        dx = -movementSpeed;
    } else if (isKeyDown("d")) {
        // console.log('hehe');
        dx = movementSpeed;
    } else {
        dx = 0;
    }

    updateCharacterOrientation(dx, dy);

    if (x + dx < 0 || x + dx > maxX - character.element.offsetWidth) {
        dx = 0;
    }
    if (y + dy < 0 || y + dy > maxY - character.element.offsetHeight) {
        dy = 0;
    }

    x += dx;
    y += dy;
    // console.log(x, y)
    character.element.style.left = x + "px";
    character.element.style.top = y + "px";
}

let orient = "down-right";
// let healhbarOrient
let lastOrientation = "down-right";

function updateCharacterOrientation(dx, dy) {
    if (dx === 0 && dy === 0) {
        return;
    }

    if (dx > 0) {
        if (dy > 0) {
            orient = "down-right";
        } else if (dy < 0) {
            orient = "up-right";
        } else {
            orient = "right";
        }
    } else if (dx < 0) {
        if (dy > 0) {
            orient = "down-left";
        } else if (dy < 0) {
            orient = "up-left";
        } else {
            orient = "left";
        }
    } else {
        if (dy > 0) {
            orient = "down";
        } else if (dy < 0) {
            orient = "up";
        }
    }

    if (orient !== lastOrientation) {
        // console.log(orient)
        character.element.classList.remove("character-" + lastOrientation);
        character.element.classList.add("character-" + orient);
        lastOrientation = orient;
    }
}

function isKeyDown(key) {
    return keyStates[key] === true;
}

const keyStates = {};

window.addEventListener("keydown", (e) => {
    keyStates[e.key.toLocaleLowerCase()] = true;
    // console.log(e.key)
});

document.addEventListener("keyup", (e) => {
    keyStates[e.key.toLocaleLowerCase()] = false;
    // console.log("released: " + e.key)
});

function resetKeyStates() {
    for (const key in keyStates) {
        keyStates[key] = false;
    }
}

let gunImageCounter = 0;

function gunImage() {
    // console.log("gun image");
    let alternateImage = document.createElement("img");
    alternateImage.src = "assets/GOOB_GUN.png";
    alternateImage.width = character.element.offsetWidth;
    alternateImage.height = character.element.offsetHeight;
    alternateImage.style.position = "absolute";
    alternateImage.style.left = 0;
    alternateImage.style.top = 0;
    alternateImage.style.display = "block";
    // alternateImage.classList.add('character-no-transform')

    // if we shot and there is currently no gun image replacing the goob image, hide the goob image (and add gun image below)
    if (gunImageCounter === 0) {
        character.element.style.backgroundImage = "none";
        character.element.classList.add("character-no-transform");
    }
    gunImageCounter++;

    character.element.appendChild(alternateImage);

    setTimeout(() => {
        character.element.removeChild(alternateImage);
        gunImageCounter--;

        if (gunImageCounter === 0) {
            character.element.style.backgroundImage = "url(assets/goob_big_eyes.png)";
            character.element.classList.remove("character-no-transform");
            // console.log("gun image removed");
        }
    }, 300);
}

export { updateCharacterPosition, gunImage, resetKeyStates, character };
