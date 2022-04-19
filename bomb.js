import { ctx, canvas } from './context.js';
import player from './player.js';	

// player
let bomb = {
    src:  './images/bomb.png',
    lastKey: '',
    sPosX:  0,
    sPosY:  0,
    sWidth:  512,
    sHeight:  512,
    dPosX:  0,
    dPosY:  0,
    dWidth:  40,
    dHeight:  40,
    speed:  1.5,
    frames: {
        actual: 0,
        amount: 2,
        distance: 128,
    },
    animation: {
        currentTime: 0,
        interval: 10
    },
    animate() {

        if(this.animation.currentTime === this.animation.interval) {

            if (this.frames.actual < this.frames.amount) {
                this.sPosX = (this.frames.actual * this.frames.distance);
                this.frames.actual++;
            } else {
                this.frames.actual = 0;
            } 

            this.animation.currentTime = 0;
        }
        this.animation.currentTime++;
    },
    draw() {

        let image = new Image();
        image.src = this.src;

        ctx.drawImage(image, this.sPosX, this.sPosY, this.sWidth, this.sHeight, this.dPosX, this.dPosY, this.dWidth, this.dHeight);
    
    },
    update() {
        if(this.dPosY < canvas.height)
            this.dPosY += this.speed;
        else
            this.randomPos();

        if(this.collison() === true)
            return false;

        return true;
    },
    randomPos() {
        this.dPosX = (Math.random() * canvas.width);
        this.dPosY = (-100);
    },
    collison() {
        if(
            player.dPosY <= this.dPosY + this.dHeight &&
            this.dPosX < player.dPosX + player.dWidth &&
            this.dPosX + this.dWidth > player.dPosX
        )
            return true;
        return false;
    }
};

function createMultiplesBombs(amount) {
    let multiplesBombs = [];
    for(let i = 0; i < amount; i++) {
        multiplesBombs.push(bomb);
    }

    return multiplesBombs;
}

export default createMultiplesBombs;