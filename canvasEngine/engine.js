//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');

var gameobjects = [];

class GameObject {
    constructor(sprite, x, y, width, height, update, collision){
        this.sprite = new Image();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.update = update;
    }    
}

var collisions = [];

function collision(A,B) {
    if (A.x < B.x + B.width && A.x + A.width > B.x && y < B.y + B.height && A.height + A.y > B.y) 
        {
            return true;
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
const player = new GameObject;
player.sprite.src = "mario.jpg"
player.x = 15;
player.y = 20;
player.width = 100;
player.height = 50;

var playerSpeed = 10;

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

gameobjects.push(player);


//render game
draw();

function draw() 
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let index = 0; index < collisions.length; index++) {
        
        for (let index2 = 0; index2 < collisions.length - 1; index2++) 
        {
            if(index != index2)
            {
                collision(collisions[index], collisions[index2])
            }            
        }
        
    }

    for (let index = 0; index < gameobjects.length; index++) {
        gameobjects[index].update();        
    }

    for (let index = 0; index < gameobjects.length; index++) {
        ctx.drawImage(gameobjects[index].sprite, gameobjects[index].x, gameobjects[index].y, gameobjects[index].width, gameobjects[index].height);        
    }    
    
}

setInterval(draw, 10);