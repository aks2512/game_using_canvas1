import { ctx, canvas } from './context.js';	

let background = {
    src: './images/background.jpg',
    sWidth: 600,
    sHeight: 360,
    sPosX: 0,
    sPosY: 0,
    dWidth: canvas.width,
    dHeight: canvas.height,
    dPosX: 0,
    dPosY: 0,
    draw() {

        let image = new Image();
        image.src = this.src;

        ctx.drawImage(image, this.sPosX, this.sPosY, this.sWidth, this.sHeight, this.dPosX, this.dPosY, this.dWidth, this.dHeight);

    },
}

export default background;