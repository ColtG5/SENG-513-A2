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
        this.element.classList.add("zombie");
        let hurtbox = document.createElement("div");
        hurtbox.classList.add("zombie-hurtbox");
        this.element.appendChild(hurtbox);
        let healthbar = document.createElement("progress");
        healthbar.classList.add("healthbar");
        healthbar.value = this.hp;
        healthbar.max = this.hp;
        healthbar.maxwidth = "100%";
        this.element.appendChild(healthbar);
        this.tx = 0;
        this.ty = 0;
        this.canAttack = true;
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
        this.element.classList.add("big-minion");
        let hurtbox = document.createElement("div");
        hurtbox.classList.add("big-minion-hurtbox");
        this.element.appendChild(hurtbox);
        let healthbar = document.createElement("progress");
        healthbar.classList.add("healthbar");
        healthbar.value = this.hp;
        healthbar.max = this.hp;
        this.element.appendChild(healthbar);
        this.tx = 0;
        this.ty = 0;
        this.canAttack = true;
    }
}

let id = 0;

function createZombie() {
    let zombie = new Zombie(++id, "zombie", 40, 5, 2, 1.5, 1, 10, "assets/zombie.png");
    console.log(zombie);
    // zombie.element.classList.add('zombie');
    // console.log(zombie.element)
    return zombie;
}

function createBigMinion() {
    let bigMinion = new BigMinion(++id, "bigMinion", 200, 10, 5, 1.7, 8, 50, "assets/BIG-MINION.png");
    console.log(bigMinion);
    return bigMinion;
}

export { createZombie, createBigMinion };
