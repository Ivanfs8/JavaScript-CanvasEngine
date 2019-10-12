//mi juego

//player
var player = new GameObject("Player", "Assets/bar.png");
player.pos.y = -60;
player.w = 16;
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
ball.w = 8;
ball.h = 8;

ball.col.w = ball.w;
ball.col.h = ball.h;

ball.dir = new Vector2(-1, -1);

ball.speed = 1;

ball.update = function update()
{
    if(ball.col.isColliding)
    {
        if(ball.col.collided == "Player"){
            ball.dir.y = -ball.dir.y;
            //ball.dir.x = -ball.dir.x;
        }
        // else {
        //     if(ball.col.colDir.y != 0){
        //         ball.dir.y = -ball.dir.y;
        //     }

        //     if(ball.col.colDir.x != 0){
        //         ball.dir.x = -ball.dir.x;
        //     }
        // }        

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

collisions.push(ball);
gameObjects.push(ball);

//var brick = new GameObject("Brick");

function Wall () {

//new GameObject("Wall", "Assets/Brick.png");
// this.w = 16;
// this.h = 20;
}

var leftWall = new Wall();
//leftWall.pos.x = 0;
//gameObjects.push(leftWall);
//collisions.push(leftWall);

var rightWall = new Wall();
//rightWall.pos.x = 40;
//gameObjects.push(rightWall);
//collisions.push(rightWall);


class mierda{
    constructor(tipo, olor){
        this.nombre = "nombre";
        this.tipo = tipo;
        this.olor = olor;
    }
}

class caca extends mierda{
    constructor(nombre, tipo, olor){
        super(nombre, tipo, olor)
        
        this.tipo = "caca";
        this.olor = "a caca";        
    }
}

var caquita = new caca();

console.log(caquita.nombre + " " + caquita.tipo + " " + caquita.olor);



window.onload = gameUpdate();