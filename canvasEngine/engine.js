//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');
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
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);   

    //ctx.translate(canvas.width/2, canvas.height/2);
    //ctx.scale(1, -1);
    
    for (let index = 0; index < gameObjects.length; index++) 
    {
        ctx.drawImage(gameObjects[index].sprite, gameObjects[index].pos.x + canvas.width*0.5, -gameObjects[index].pos.y + canvas.height*0.5, gameObjects[index].w, gameObjects[index].h);
                        
    }   
    //ctx.restore();
    requestAnimationFrame(gameUpdate);
}

