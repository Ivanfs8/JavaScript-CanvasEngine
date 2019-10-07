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

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}

//mi juego

//player
var player = new GameObject();
player.sprite.src = "Assets/bar.png"
player.position.x = canvas.width/2;
player.position.y = canvas.height/2 + 60;
player.width = 32;
player.height = 3;

player.collider.x = player.position.x;
player.collider.y = player.position.y;
player.collider.width = player.width;
player.collider.height = player.height;
player.speed = 5;

// player.start = function start()
// {
//     return;
// }

player.update = function update()
{
    if (leftPressed) 
    {
        player.position.x -= player.speed;
    }

    if (rightPressed) 
    {
        player.position.x += player.speed;
    }    
}

collisions.push(player);
gameObjects.push(player);
//}

//ball
var ball = new GameObject();
ball.sprite.src = "Assets/ball.png"
ball.position.x = canvas.width/2;
ball.position.y = canvas.height/2;
ball.width = 16;
ball.height = 8;

ball.collider.x = ball.position.x;
ball.collider.y = ball.position.y;
ball.collider.width = ball.width;
ball.collider.height = ball.height;

ball.dir = new Vector2(-1, 1);

ball.speed = 0.5;

ball.active = false;

ball.update = function update()
{
    if(ball.collider.isColliding)
    {
        ball.dir.y = -ball.dir.y;

        // if(ball.collider.collisionDirection.y != 0)
        // {
            
        // }

        // if(ball.collider.collisionDirection.x != 0)
        // {
        //     ball.dir.x = -ball.dir.x;
        // }        
    }

    ball.position.y += ball.dir.y * ball.speed;
    ball.position.x += ball.dir.x * ball.speed;
}

collisions.push(ball);
gameObjects.push(ball);




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

    CheckColision();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < gameObjects.length; index++) 
    {
        ctx.drawImage(gameObjects[index].sprite, gameObjects[index].position.x, gameObjects[index].position.y, gameObjects[index].width, gameObjects[index].height);        
    }    
    
    
}

setInterval(gameUpdate, 10);