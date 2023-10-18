class Zombie {
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
        this.element = document.createElement("div");
        let hurtbox = document.createElement("div");
        hurtbox.classList.add("zombie-hurtbox");
        this.element.appendChild(hurtbox);
        this.element.classList.add("zombie");
        this.tx = 0;
        this.ty = 0;
    }
}

class BigMinion {
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
        this.element = document.createElement("div");
        let hurtbox = document.createElement("div");
        hurtbox.classList.add("big-minion-hurtbox");
        this.element.appendChild(hurtbox);
        this.element.classList.add("big-minion");
        this.tx = 0;
        this.ty = 0;
    }
}

let id = 0;

function createZombie() {
    let zombie = new Zombie(++id, "zombie", 40, 5, 2, 2, 1, 10, "assets/zombie.png");
    console.log(zombie);
    // zombie.element.classList.add('zombie');
    // console.log(zombie.element)
    return zombie;
}

function createBigMinion() {
    let bigMinion = new BigMinion(++id, "bigMinion", 200, 10, 5, 3, 8, 50, "assets/BIG-MINION.png");
    console.log(bigMinion);
    return bigMinion;
}

export { createZombie, createBigMinion };
