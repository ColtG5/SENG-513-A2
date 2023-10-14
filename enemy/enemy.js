class Enemy {
    constructor(type, hp, attack, defense, speed, xp, money, image) {
        this.type = type;
        this.hp = hp;
        this.attack = attack;
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

function createZombie() {
    let zombie = new Enemy("zombie", 40, 5, 2, 2, 1, 10, "assets/zombie.png");
    // zombie.element.classList.add('zombie');
    // console.log(zombie.element)
    return zombie;
}

export { createZombie }