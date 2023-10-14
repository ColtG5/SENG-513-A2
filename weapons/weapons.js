class Bullet {
    constructor(damage=10, speed=10) {
        this.damage = damage;
        this.speed = speed;
        this.dx = 0;
        this.dy = 0;
        this.element = document.createElement('div');
        this.element.classList.add('bullet');
    }
}

// let bulletSpeed = 40;
// let bulletDamage = 10;

function createBullet() {
    let bullet = new Bullet();
    // bullet.element.classList.add('bullet');
    // console.log(zombie.element)
    return bullet;
}

export { createBullet }