//mi juego

//player
var player = new GameObject("Player", "Assets/bar.png");
player.pos.y = -60;
player.w = 16;
player.h = 4;

player.col[0] = new BoxCollider(player.w+4, 2, 0, player.h*0.5-1)
player.col[0].debug = true;
player.speed = 5;

// player.start = function start()
// {
//     return;
// }

player.update = function update()
{
    if (leftPressed && player.pos.x - player.w*0.5 > leftWall.pos.x+leftWall.w*0.5) 
    {
        player.pos.x -= player.speed;
        //console.log("x: " + player.pos.x);
    }

    if (rightPressed) 
    {
        player.pos.x += player.speed;
        //console.log("x: " + player.pos.x);
    }

    if(upPressed)
    {
        player.pos.y += player.speed;
        //console.log("y: " + player.pos.y);
    }

    if(downPressed)
    {
        player.pos.y -= player.speed;
        //console.log("y: " + player.pos.y);
    }

    if(player.col.isColliding){
        //console.log(player.col.collided + "   (" + player.col.colDir.x + ", " + player.col.colDir.y + ")" );
    }
}

gameObjects.push(player);
//collisions.push(player);

//ball
var ball = new GameObject("Ball", "Assets/ball.png"); 
ball.w = 8;
ball.h = 8;

//ball.col.w = ball.w;
//ball.col.h = ball.h;
ball.col[0] = new BoxCollider(ball.w, ball.h)
ball.col[1] = new BoxCollider(ball.w*0.5-2, ball.h, -6, 0);
ball.col[2] = new BoxCollider(ball.w, ball.h*0.5-2, 0, 6);
ball.col[3] = new BoxCollider(ball.w*0.5-2, ball.h, 6, 0);
ball.col[4] = new BoxCollider(ball.w, ball.h*0.5-2, 0, -6);

ball.col[0].debug = true;

ball.dir = new Vector2(-1, -1);

ball.speed = 1;

ball.update = function update()
{
    if(ball.col[0].isColliding)
    {
        console.log(ball.col[0].collided);
        
        if(ball.col[1].isColliding)
        {
            ball.dir.x = -ball.dir.x;
        }
        else if(ball.col[3].isColliding){
            ball.dir.x = -ball.dir.x;
        }

        if(ball.col[2].isColliding || ball.col[4].isColliding)
        {
            ball.dir.y = -ball.dir.y;
        }
        
    }

    //console.log(ball.col.isColliding);
    ball.pos.y += ball.dir.y * ball.speed;
    ball.pos.x += ball.dir.x * ball.speed;    
}

gameObjects.push(ball);
//collisions.push(ball);

//var brick = new GameObject("Brick");

class Wall extends GameObject{
    constructor(){
        super()

        this.sprite.src = "Assets/Brick.png";
        this.w = 20;
        this.h = canvas.height;
        
        this.col[0] = new BoxCollider(20, canvas.height);
        // this.col.w = 20;
        // this.col.h = 30;
    }
}

var leftWall = new Wall();
leftWall.name = "leftWall";
leftWall.pos.x = -canvas.width*0.5;
//leftWall.col.debug = true;

gameObjects.push(leftWall);
//collisions.push(leftWall);

var rightWall = new Wall();
rightWall.name = "rigthWall"
rightWall.pos.x = canvas.width*0.5;
//rightWall.col.debug = true;

gameObjects.push(rightWall);
//collisions.push(rightWall);

var downWall = new Wall();
downWall.name = "downWall";
downWall.pos.y = -canvas.height*0.5;
downWall.col[0] = new BoxCollider(canvas.width, 20);

gameObjects.push(downWall);


window.onload = gameUpdate();