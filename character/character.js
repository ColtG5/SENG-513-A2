const character = document.getElementById('character');
const gameContainer = document.getElementById('game-container');

// --------------------------- MOVEMENT ---------------------------

const movementSpeed = 3;
const maxX = gameContainer.offsetWidth;
// console.log(maxX)
const maxY = gameContainer.offsetHeight;
let x = character.offsetLeft;
let y = character.offsetTop;
let dx = 0;
let dy = 0;

let orient = "down-right"
let lastOrientation = "down-right"

function updateCharacterPosition() {
    if (isKeyDown('w')) {
        dy = -movementSpeed;
    } else if (isKeyDown('s')) {
        dy = movementSpeed;
    } else {
        dy = 0;
    }

    if (isKeyDown('a')) {
        dx = -movementSpeed;
    } else if (isKeyDown('d')) {
        // console.log('hehe');
        dx = movementSpeed;
    } else {
        dx = 0;
    }

    updateCharacterOrientation(dx, dy);

    if ((x + dx < 0) || (x + dx > maxX - character.offsetWidth)) {
        dx = 0;
    }
    if ((y + dy < 0) || (y + dy > maxY - character.offsetHeight)) {
        dy = 0;
    }

    x += dx;
    y += dy;
    // console.log(x, y)
    character.style.left = x + 'px';
    character.style.top = y + 'px';
}

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
        character.classList.remove("character-" + lastOrientation);
        character.classList.add("character-" + orient);
        lastOrientation = orient;
    }
}

function isKeyDown(key) {
    return keyStates[key] === true;
}

const keyStates = {};

window.addEventListener('keydown', (e) => {
    keyStates[e.key.toLocaleLowerCase()] = true;
    // console.log(e.key)
});

document.addEventListener('keyup', (e) => {
    keyStates[e.key.toLocaleLowerCase()] = false;
    // console.log("released: " + e.key)
});

function resetKeyStates() {
    for (const key in keyStates) {
        keyStates[key] = false
    }
}

// --------------------------- SHOOTING ---------------------------

// document.addEventListener("visibilitychange", (event) => {
//     if (document.visibilityState == "visible") {
//         console.log("tab is active")
//     } else {
//         console.log("tab is inactive")
//     }
// });

function createBullet(event) {
    // if (!isKeyDown('shift') || onWindow === false) {
    //     return;
    // }

    // if (onWindow === false) {
    //     return;
    // }

    // const bulletStartX = (x + (character.offsetWidth / 2) * seperationFromCharacter) - bulletWidth / 2;
    // const bulletStartY = (y + (character.offsetHeight / 2) * seperationFromCharacter) - bulletHeight / 2;
    // console.log(nDeltaX, nDeltaY)
    // console.log(bulletStartX, bulletStartY);

    // console.log('shoot fr fr')
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    // console.log(x, y);
    bullet.style.left = bulletStartX + 'px';
    bullet.style.top = bulletStartY + 'px';
    bullet.style.position = 'absolute';
    bullet.style.width = bulletWidth + 'px';
    bullet.style.height = bulletHeight + 'px';
    bullet.style.backgroundColor = '#32BEFF';
    bullet.style.borderRadius = '50%';
    gameContainer.appendChild(bullet);
    // bullets.push(bullet);
    // console.log(bullets);

    gunImage();
}

let gunImageCounter = 0;

function gunImage() {
    // console.log("gun image");
    let alternateImage = document.createElement('img');
    alternateImage.src = 'assets/GOOB_GUN.png';
    alternateImage.width = character.offsetWidth;
    alternateImage.height = character.offsetHeight;
    alternateImage.style.position = 'absolute';
    alternateImage.style.left = 0;
    alternateImage.style.top = 0;
    alternateImage.style.display = 'block';
    // alternateImage.classList.add('character-no-transform')

    // if we shot and there is currently no gun image replacing the goob image, hide the goob image (and add gun image below)
    if (gunImageCounter === 0) {
        character.style.backgroundImage = 'none';
        character.classList.add('character-no-transform');
    }
    gunImageCounter++;

    character.appendChild(alternateImage);

    setTimeout(() => {
        character.removeChild(alternateImage);
        gunImageCounter--;

        if (gunImageCounter === 0) {
            character.style.backgroundImage = 'url(assets/goob_big_eyes.png)';
            character.classList.remove('character-no-transform');
            // console.log("gun image removed");
        }
    }, 300);
}

export { updateCharacterPosition, gunImage, resetKeyStates };
