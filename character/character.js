const character = document.getElementById('character');
const gameContainer = document.getElementById('game-container');

// --------------------------- MOVEMENT ---------------------------

const movementSpeed = 5;
const maxX = gameContainer.offsetWidth;
// console.log(maxX)
const maxY = gameContainer.offsetHeight;
let x = character.offsetLeft;;
let y = character.offsetTop;;
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

// Helper function to check if a key is down
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

// --------------------------- SHOOTING ---------------------------

const bulletSpeed = 2;
const bulletWidth = 10;
const bulletHeight = 10;
const seperationFromCharacter = 30;

let bullets = [];

gameContainer.addEventListener('click', function(event) {
    if (!isKeyDown('shift')) {
        return;
    }

    let { nDeltaX, nDeltaY } = bulletDirection(event);

    const bulletStartX = (x + (character.offsetWidth / 2) + nDeltaX * seperationFromCharacter) - bulletWidth / 2;
    const bulletStartY = (y + (character.offsetHeight / 2) + nDeltaY * seperationFromCharacter) - bulletHeight / 2;
    // console.log(nDeltaX, nDeltaY)
    // console.log(bulletStartX, bulletStartY);

    console.log('shoot fr fr')
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
    bullets.push({
        element: bullet,
        x: bulletStartX,
        y: bulletStartY,
        dx: nDeltaX * bulletSpeed,
        dy: nDeltaY * bulletSpeed
    });
    // console.log(bullets);

    gunImage();

});

function bulletDirection(event) {
    // Calculate the direction vector from character to mouse pointer
    const mouseX = event.clientX - gameContainer.offsetLeft;
    const mouseY = event.clientY - gameContainer.offsetTop;
    const characterCenterX = x + character.offsetWidth / 2;
    const characterCenterY = y + character.offsetHeight / 2;

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
        nDeltaY: normalizedDeltaY
    };
}

function gunImage() {
    console.log("gun image");
    let alternateImage = document.createElement('img');
    alternateImage.src = 'assets/GOOB_GUN.png';
    alternateImage.width = character.offsetWidth;
    alternateImage.height = character.offsetHeight;
    alternateImage.style.position = 'absolute';
    alternateImage.style.left = 0;
    alternateImage.style.top = 0;
    alternateImage.style.display = 'block';

    character.style.backgroundImage = 'none';
    character.appendChild(alternateImage);
    setTimeout(() => {
        character.removeChild(alternateImage);
        character.style.backgroundImage = 'url(assets/goob_big_eyes.png)';
        console.log("gun image removed");
    }, 500);
}

function updateBullets() {
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

        bullet.x += bullet.dx;
        bullet.y += bullet.dy;
        bullet.element.style.left = bullet.x + 'px';
        bullet.element.style.top = bullet.y + 'px';
    });
}

export { updateCharacterPosition, updateBullets };
