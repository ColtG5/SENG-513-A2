class Bullet {
    constructor() {
        this.damage = 10;
        this.speed = 10;
        this.dx = 0;
        this.dy = 0;
        this.health = 10;
        this.enemiesHit = [];
        this.element = document.createElement('div');
        this.element.classList.add('bullet');
    }
}

// let bulletSpeed = 40;
// let bulletDamage = 10;

function createBullet() {
    let bullet = new Bullet();
    // console.log(bullet)
    // bullet.element.classList.add('bullet');
    // console.log(zombie.element)
    return bullet;
}

export { createBullet }