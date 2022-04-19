import background from './background.js';
import player from './player.js';
import bombs from './bomb.js';
import { ctx } from './context.js';
'use strict';

(function(win, doc) {

    const telas = {
        PLAY: {
            init() {
                player.initialPos();
                bombs(4).forEach((bomb) => {
                    bomb.randomPos();
                });
                loop();
            },
        }
    }

    //Telas
    telas.PLAY.init();

    //Player movement
    win.addEventListener('keydown', (e) => {

        player.move(e);
    
    });
    

    function loop() {
        let gameover = false;

        background.draw();
        player.draw();
        player.animate();
        player.collision();
        player.update();
        bombs(4).forEach((bomb) => {
            bomb.draw();
            if(bomb.update() === false)
                gameover = true;
        });
        

        if(gameover === false)
            requestAnimationFrame(loop);
        else {
            ctx.font = "30px Arial";
            ctx.fillText("Game Over", (canvas.width / 2) - 100, (canvas.height / 2));
            ctx.fillText("Reload this page to restart", (canvas.width / 2) - 200, (canvas.height / 2) + 50);
        }

    }

})(window, document);