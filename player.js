import { ctx, canvas } from './context.js';	

// player
let player = {
    src:  './images/pacman.png',
    lastKey: '',
    sPosX:  0,
    sPosY:  0,
    sWidth:  70,
    sHeight:  70,
    dPosX:  0,
    dPosY:  0,
    dWidth:  70,
    dHeight:  70,
    speed:  10,
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
    move(e) {

        switch(e.key) {
            case "ArrowLeft":
            case "ArrowRight":
                if(e.key !== this.lastKey) {
                    if(this.lastKey === "") {
                        if(e.key === "ArrowLeft")
                            this.speed = -this.speed;
                    } else {
                        this.speed = -this.speed;
                    }
                    this.lastKey = e.key;
                }
                break;
        }

    },
    update() {
        if(this.lastKey !== "")
            this.dPosX += this.speed;
    },
    initialPos() {
        this.dPosX = (canvas.width / 2) - (player.dWidth / 2);
        this.dPosY = (canvas.height - 215);
    },
    collision() {

        if(this.dPosX < 0) {
            this.dPosX = 0;
        }

        else if(this.dPosX >= canvas.width - this.dWidth) {
            this.dPosX = canvas.width - this.dWidth;    
        }
    
    }
};

export default player;