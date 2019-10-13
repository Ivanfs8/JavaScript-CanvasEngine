//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');
ctx.translate(canvas.width*0.5, canvas.height*0.5);
ctx.scale(1,-1);
ctx.save();

var gameObjects = [];

//fisicas y colisiones
var collisions = [];

//controles
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mouseenter", )

var rightPressed;
var leftPressed;
var upPressed;
var downPressed;

function keyDownHandler(e) {
    if(e.keyCode == 39)
    {
        rightPressed = true;
    }
    
    if(e.keyCode == 37)
    {
        leftPressed = true;
    }

    if(e.keyCode == 38)
    {
        upPressed = true;
    }

    if(e.keyCode == 40)
    {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    
    if(e.keyCode == 37) {
        leftPressed = false;
    }

    if(e.keyCode == 38)
    {
        upPressed = false;
    }

    if(e.keyCode == 40)
    {
        downPressed = false;
    }
}

//game updates

function gameStart()
{
    for (let index = 0; index < gameObjects.length; index++) {
        gameObjects[index].start();        
    }
}

function gameUpdate() 
{
    for (let index = 0; index < gameObjects.length; index++) 
    {        
        gameObjects[index].update();
    }

    CheckAllColisions();
    
    ctx.clearRect(-canvas.width*0.5, -canvas.height*0.5, canvas.width, canvas.height);   

    for (let index = 0; index < gameObjects.length; index++) 
    {
        //ctx.translate(gameObjects[index].pos.x, gameObjects[index].pos.y)
        ctx.drawImage(gameObjects[index].sprite, gameObjects[index].pos.x - gameObjects[index].w*0.5, gameObjects[index].pos.y + gameObjects[index].h*0.5, gameObjects[index].w, -gameObjects[index].h);                        
    }

    //collision debugger
    for (let index = 0; index < collisions.length; index++) 
    {
        if(collisions[index].col.debug)
        {
            let x = collisions[index].pos.x - collisions[index].w*0.5 + collisions[index].col.offset.x;
            let y = collisions[index].pos.y - collisions[index].h*0.5 + collisions[index].col.offset.y;
            let w = collisions[index].col.w;
            let h = collisions[index].col.h;

            ctx.beginPath();
            ctx.rect(x, y, w, h);
            //ctx.fillStyle = "#0095DD";
            ctx.strokeStyle = "green";
            ctx.stroke();
            ctx.closePath();  
        }             
    }

    //ctx.restore();
    requestAnimationFrame(gameUpdate);
}

