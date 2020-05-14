
//draw to canvas
//select cvs

const cvs=document.getElementById( "bird");
const ctx=cvs.getContext("2d");


//game vars and consts

let frame=0;


//load sprite image
const sprite=new Image();
sprite.src="sprite.png";


//background
const bg = {
    sX : 0,
    sY : 0,
    w : 275,
    h : 226,
    x : 0,
    y:cvs.height-226,
    
    draw:function(){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }

}

const fg={
    sX :276,
    sY : 0,
    w : 224,
    h : 112,
    x : 0,
    y: cvs.height-112,

    draw :function(){
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x,this.y,this.w,this.h);
        ctx.drawImage(sprite,this.sX,this.sY,this.w,this.h,this.x+this.w,this.y,this.w,this.h);
        
        
        

    }
}
//bird

const bird={
 
  /* update:function(){

     if(state.current==state.getReady){
         this.y=150;
     }else{
         this.speed+=this.gravity
         this.y+=this.speed;
         if(this.y+this.h/2>=cvs.height-fg.h){
             this.y=cvs.height-fg.h-this.h/2;
             if(state.current==state.game){
                 state.current=state.over;
             }
         }

     }
   },
   */

    animation : [
        {sX: 276, sY : 112},
        {sX: 276, sY : 139},
        {sX: 276, sY : 164},
        {sX: 276, sY : 139}
    ],
    x : 50,
    y : 150,
    w : 34,
    h : 26,

    frame:0,
    speed:0,
    gravity:0.25,
    jump:4.6,
    draw: function(){
        let bird=this.animation[this.frame]
        
        ctx.drawImage(sprite,bird.sX,bird.sY,this.w,this.h,this.x-this.w/2,this.y-this.h/2,this.w,this.h);
    },

    flap:function(){
        this.speed=-this.jump;

    },

    update:function(){
        
        //if the game state
        this.period= state.current==state.getReady?10:5;
        //we increment the frame by 1 each period

        this.frame+=frame%this.period==0?1:0;
        //frame goes from 0 to4 then back to 0 again

        this.frame=this.frame%this.animation.length;
        if(state.current==state.getReady){

        }else{
            this.speed+=this.gravity;
            this.y+=this.speed;

            if(this.y+this.h/2>=cvs.height-fg.h){
                this.y=cvs.height-fg.h-this.h/2;
                if(state.current==state.game){
                    state.current=state.over;
                }
            }
        }
    }
}


//get ready message

const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,
    
    draw: function(){
        if(state.current==state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
    
    
}

//game over message
const gameOver={
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,
    
    draw: function(){
        if(state.current==state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
        }
    
    
}


// to control the game

cvs.addEventListener("click",function(evt){
    switch(state.current){
        case state.getReady:
            state.current=state.game;
            break;
        case state.game:
            bird.flap();
            break;
        case state.over:
            state.current=state.getReady;
            break;
    }


});

const state={
    current:0,
    getReady:0,
    game:1,
    over:2
}





//draw
function draw(){
    ctx.fillStyle="#70c5ce";

    ctx.fillRect(0,0, cvs.clientWidth, cvs.height);

    bg.draw();
    fg.draw();
    bird.draw();
    getReady.draw();
    gameOver.draw();

}

//update 
function update(){
    bird.update();
    
  

}

//loop 
function loop(){
    update();
    draw();
    frame++;

    requestAnimationFrame(loop);

}
loop();










