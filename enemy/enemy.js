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
    }
}

function createZombie() {
    let zombie = new Enemy("zombie", 100, 5, 2, 10, 10, 10, "assets/zombie.png");
    // zombie.element.classList.add('zombie');
    // console.log(zombie.element)
    return zombie;
}

export { createZombie }