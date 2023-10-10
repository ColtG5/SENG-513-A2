function Enemy(type, hp, attack, defense, speed, xp, money, image) {
    this.type = type;
    this.hp = hp;
    this.attack = attack;
    this.defense = defense;
    this.speed = speed;
    this.xp = xp;
    this.money = money;
    this.image = image;
}

function createZombie() {
    return new Enemy("zombie", 100, 5, 2, 10, 10, 10, "assets/zombie.png");
}

export { createZombie }