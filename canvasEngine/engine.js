//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');

var gameobjects = [];

class GameObject {
    constructor(sprite, x, y, width, height, start, update, collider)
    {
        this.sprite = new Image();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.start = start;
        this.update = update;

        this.collider = new Collider();        
    }    
}

var collisions = [];

class Collider 
{
    constructor(x, y, width, height, OnCollision)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.OnCollision = false;
    }
}

function CheckColision(A, B) 
{
    //A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.height + A.y > B.y
    //A.y + A.height < B.y || A.y > B.y + B.height || A.x + A.width < B.x || A.x > B.x + B.width
    if ( A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.height + A.y > B.y  ) 
    {
        console.log("colision");
        return true;       
    }
    else 
    {
        return false;
    }
}

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
{
var player = new GameObject;
player.sprite.src = "Assets/bar.png"
player.x = canvas.width/2;
player.y = canvas.height/2 + 60;
player.width = 32;
player.height = 3;

player.collider.x = player.x;
player.collider.y = player.y;
player.collider.width = player.width;
player.collider.height = player.height;

var playerSpeed = 5;

player.start = function start()
{
    return;
}

player.update = function update()
{
    if(leftPressed)
    {
        player.x -= playerSpeed;
    }

    if(rightPressed)
    {
        player.x += playerSpeed;
    }
};

collisions.push(player);
gameobjects.push(player);
}

//ball
{
var ball = new GameObject();
ball.sprite.src = "Assets/ball.png"
ball.x = canvas.width/2;
ball.y = canvas.height/2;
ball.width = 16;
ball.height = 8;

ball.collider.x = ball.x;
ball.collider.y = ball.y;
ball.collider.width = ball.width;
ball.collider.height = ball.height;

var ballDirx = 0;
var ballDiry = 1;

var ballSpeed = 2;

ball.update = function update()
{
    ctx.beginPath()
    ctx.rect(ball.collider.x, ball.collider.y, ball.collider.width, ball.collider.height);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

    if(ball.collider.OnCollision)
    {
        ballSpeed = 0;
    }

    ball.y += ballDiry * ballSpeed;
    ball.x += ballDirx * ballSpeed;
}

collisions.push(ball);
gameobjects.push(ball);
}

//game updates

function gameStart()
{
    for (let index = 0; index < gameobjects.length; index++) {
        gameobjects[index].start();        
    }
}

function gameUpdate() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //if (collisions.length > 1) 
    {
        for (let index = 0; index < collisions.length; index++) 
        {
            //move collisions
            collisions[index].collider.x = collisions[index].x;
            collisions[index].collider.y = collisions[index].y;

            //Check collisions
            for (let index2 = 0; index2 < collisions.length - 1; index2++) 
            {
                if (index != index2) 
                {
                    collisions[index].collider.OnCollision = CheckColision(collisions[index].collider, collisions[index2].collider);                    
                }
            }
        }
    }    

    for (let index = 0; index < gameobjects.length; index++) 
    {
        gameobjects[index].update();        
    }

    for (let index = 0; index < gameobjects.length; index++) 
    {
        ctx.drawImage(gameobjects[index].sprite, gameobjects[index].x, gameobjects[index].y, gameobjects[index].width, gameobjects[index].height);        
    }    
    
}

setInterval(gameUpdate, 20);