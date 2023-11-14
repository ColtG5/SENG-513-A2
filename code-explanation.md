Code Explanation:

Three different complex parts of my code are:
1. Game loop  

Most important part of the code:
```javascript
function gameLoop(timestamp) {
    if (gameOver) {
        return;
    }

    // Calculate the time elapsed since the last frame
    const deltaTime = timestamp - previousTimestamp;
    previousTimestamp = timestamp;

    // Add the elapsed time to the accumulator
    accumulatedTime += deltaTime;

    // Update the game logic in fixed time steps
    while (accumulatedTime >= gameTickInterval) {
        updateGame(); // Your game logic goes here
        accumulatedTime -= gameTickInterval;
    }

    // Render the game
    renderGame(); // Your rendering code goes here

    // Request the next frame
    requestAnimationFrame(gameLoop);
}

// Start the game loop
requestAnimationFrame(gameLoop);
```
This gameLoop function is the backbone for how the game is run. It uses the requestAnimationFrame function to smoothly render frames at 60 game updates a second for my game. It does this by using the difference in time between iterations to create fixed time steps with the gameTickInterval (1000/60, where 1000 represents 1000ms (a second) and 60 means 60fps or 60 ticks a second, resulting in a 60th of a second), where the game state is updated. It essentially waits until a game tick of time has passed, and then executes an update to the game, and repeats this cycle until the game is stopped.
<br>
2. Collisions
Three parts of the collision code:
```javascript
// what collisions between objects in the game need to be checked every game tick
function collisionsToCheck() {
    bulletWallCollision(); // did a bullet collide with a wall
    checkCollisions(bullets, enemies, bulletEnemyCollision); // did a bullet hit an enemy
    checkCollisions(enemies, [character], enemyCharacterCollision); // did an enemy hit the player
}
```
```javascript
// check if any collisions happened between e.g. all enemies and all bullets
function checkCollisions(array1, array2, funcIfCollided) {
    for (const elm1 of array1) {
        for (const elm2 of array2) {
            if (isColliding(elm1, elm2)) {
                funcIfCollided(elm1, elm2);
            }
        }
    }
}

// Custom Interaction Mechanism:
// this method is the collision system for the game. It compares where two entities are on the screen,
// and reports if they have "collided" (pixel coordinates overlapped)
function isColliding(elm1, elm2) {
    // use the hit/hurt box of an entity, not its actual position
    const elm1Hurtbox = elm1.element.children[0];
    const elm2Hurtbox = elm2.element.children[0];

    const elm1Left = elm1.element.offsetLeft + elm1Hurtbox.offsetLeft;
    const elm1Right = elm1Left + elm1.element.offsetWidth - elm1Hurtbox.offsetLeft * 2;
    const elm1Top = elm1.element.offsetTop + elm1Hurtbox.offsetTop;
    const elm1Bottom = elm1Top + elm1.element.offsetHeight - elm1Hurtbox.offsetTop * 2;

    const elm2Left = elm2.element.offsetLeft + elm2Hurtbox.offsetLeft;
    const elm2Right = elm2Left + elm2.element.offsetWidth - elm2Hurtbox.offsetLeft * 2;
    const elm2Top = elm2.element.offsetTop + elm2Hurtbox.offsetTop;
    const elm2Bottom = elm2Top + elm2.element.offsetHeight - elm2Hurtbox.offsetTop * 2;

    // if these entities overlap each other on the screen, they have "collided"!
    if (elm1Left < elm2Right && elm1Right > elm2Left && elm1Top < elm2Bottom && elm1Bottom > elm2Top) {
        return true;
    }
    return false;
}
```
```javascript
function bulletEnemyCollision(bullet, enemy) {
    // all the code handling what happens when a bullet hits an enemy
}
```
To make collisions work in my game, I settled on the principle of these three steps:
1. determine everything that can collide
2. for every entity of one type, check if it collided with every entity of the other type
3. if collided, run a function to handle that specific collision

The three snippets of code above encapsulate the three ideas above. This approach lets me easily add another entity to the game. For instance, if I was to add another entity, I would just need to make sure those entities are stored with the other entities, and then they will already be checked for collisions against appropoate entities. All I would need to add is the function for what to do when they collide with something. This dynamic approach let me scale up adding more entities very fast.
<br>
3. Movement Direction:
```javascript
// Custom algorithm:
// given an entity to move, and an entity for it to move towards, calculate the
// direction vectors for that entities movement
function getDirectionToMove(mover, target) {
    // move the enemies to the center of the player
    let characterCenterX = target.element.offsetLeft + target.element.offsetWidth / 2;
    let characterCenterY = target.element.offsetTop + target.element.offsetHeight / 2;
    let enemyX = mover.element.offsetLeft + mover.element.offsetWidth / 2;
    let enemyY = mover.element.offsetTop + mover.element.offsetHeight / 2;

    // get how far enemy is away from character
    const deltaX = characterCenterX - enemyX;
    const deltaY = characterCenterY - enemyY;

    // get the magnitude of that disance
    const magnitude = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // normalize the x and y distance
    const normalizedDeltaX = deltaX / magnitude;
    const normalizedDeltaY = deltaY / magnitude;

    return {
        nDeltaX: normalizedDeltaX,
        nDeltaY: normalizedDeltaY,
    };
}
```
An integral part of my game is to have the computer controlled enemies move towards the character to create the challenge. I accomplished this by calculating direction vectors for the enemies towards their target (the player). Each game tick, these vectors are multiplied by the enemy's speed, and added to their position, to make them move across the page! This worked really well for what I was going for in this assignment.  
As a bonus, this function abstracts perfectly for shooting bullets. The direction from the character to the spot clicked on screen is calculated for the bullet using this function too, as they follow the exact same logic, proving again why this piece of code is one of the most important in my game.