class Enemy {
    constructor(id, type, hp, damage, defense, speed, xp, money, image) {
        this.id = id;
        this.type = type;
        this.hp = hp;
        this.damage = damage;
        this.defense = defense;
        this.speed = speed;
        this.xp = xp;
        this.money = money;
        this.image = image;
        this.element = document.createElement('div');
        this.element.classList.add('zombie');
        this.tx = 0;
        this.ty = 0;
    }
}

let id = 0;

function createZombie() {
    let zombie = new Enemy(++id, "zombie", 40, 5, 2, 2, 1, 10, "assets/zombie.png");
    console.log(zombie)
    // zombie.element.classList.add('zombie');
    // console.log(zombie.element)
    return zombie;
}

export { createZombie }