//mi juego

//player
var player = new GameObject("Player", "Assets/bar.png");
player.pos.y = -60;
player.w = 16;
player.h = 3;

player.col.w = player.w;
player.col.h = player.h;
player.col.debug = true;
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

    if(player.col.isColliding){
        console.log("player col");
    }
}

collisions.push(player);
gameObjects.push(player);
//}

//ball
var ball = new GameObject("Ball", "Assets/ball.png"); 
ball.w = 8;
ball.h = 8;

ball.col.w = ball.w;
ball.col.h = ball.h;

ball.dir = new Vector2(-1, -1);

ball.speed = 1;

ball.update = function update()
{
    if(ball.col.collided == "Player")
    {
        ball.dir.y = 1;
        
        //console.log(ball.dir);
    }

    if(ball.col.collided == "Wall")
    {
        ball.dir.x = 1;
    }

    //console.log(ball.col.isColliding);
    ball.pos.y += ball.dir.y * ball.speed;
    ball.pos.x += ball.dir.x * ball.speed;    
}

gameObjects.push(ball);
collisions.push(ball);

//var brick = new GameObject("Brick");

class Wall extends GameObject{
    constructor(){
        super()

        this.name = "Wall";
        this.sprite.src = "Assets/Brick.png";
        this.w = 16;
        this.h = canvas.height;
        
        this.col = new BoxCollider(this.w, this.h);
        this.col.w = 16;
        this.col.h = canvas.height;
    }
}

var leftWall = new Wall();
leftWall.pos.x = -canvas.width*0.5;
leftWall.pos.y = 0;
leftWall.col.debug = true;

gameObjects.push(leftWall);
collisions.push(leftWall);

var rightWall = new Wall();
rightWall.pos.x = 0;
//gameObjects.push(rightWall);
//collisions.push(rightWall);

window.onload = gameUpdate();