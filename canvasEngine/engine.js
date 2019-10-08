//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');

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

//mi juego

//player
var player = new GameObject("player");

player.sprite.src = "Assets/bar.png"
player.pos.y = -60;
player.w = 32;
player.h = 3;

player.col.w = player.w;
player.col.h = player.h;
player.speed = 5;

// player.start = function start()
// {
//     return;
// }

player.update = function update()
{
    if (leftPressed) 
    {
        player.pos.x -= player.speed;
    }

    if (rightPressed) 
    {
        player.pos.x += player.speed;
    }

    if(upPressed)
    {
        player.pos.y += player.speed;
    }

    if(downPressed)
    {
        player.pos.y -= player.speed;
    }
}

collisions.push(player);
gameObjects.push(player);
//}

//ball
var ball = new GameObject("Ball");
ball.sprite.src = "Assets/ball.png"
ball.w = 16;
ball.h = 8;

ball.col.w = ball.w;
ball.col.h = ball.h;

ball.dir = new Vector2(-1, 1);

ball.speed = 0.5;

ball.active = false;

ball.update = function update()
{
    if(ball.col.isColliding)
    {
        ball.dir.y = -ball.dir.y;

        // if(ball.col.collisionDirection.y != 0)
        // {
            
        // }

        // if(ball.col.collisionDirection.x != 0)
        // {
        //     ball.dir.x = -ball.dir.x;
        // }        
    }

    ball.pos.y += ball.dir.y * ball.speed;
    ball.pos.x += ball.dir.x * ball.speed;
}

// collisions.push(ball);
// gameObjects.push(ball);

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

    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    ctx.scale(1, -1);

    for (let index = 0; index < gameObjects.length; index++) 
    {
        ctx.drawImage(gameObjects[index].sprite, gameObjects[index].pos.x, gameObjects[index].pos.y, gameObjects[index].w, gameObjects[index].h);        
    }    
    
    ctx.restore();
    requestAnimationFrame(gameUpdate);
}

gameUpdate();