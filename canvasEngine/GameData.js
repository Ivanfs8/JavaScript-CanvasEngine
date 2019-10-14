//mi juego

//player
var player = new GameObject("Player", "Assets/bar.png");

player.start = function start()
{
    player.pos.y = -90;
    player.w = 16;
    player.h = 4;

    player.col[0] = new BoxCollider(player.w, player.h)
    player.speed = 5;

    player.counter = 0;
    for (let i = 0; i < gameObjects.length; i++) 
    {
        if(gameObjects[i].name == "Brick")
        {
            player.counter += 1;
        }
    }
}

player.update = function update()
{
    if (leftPressed && player.pos.x - player.w*0.5 > leftWall.pos.x+leftWall.col[0].w*0.5) 
    {
        player.pos.x -= player.speed;
        //console.log("x: " + player.pos.x);
    }

    if (rightPressed && player.pos.x + player.w*0.5 < rightWall.pos.x-rightWall.col[0].w*0.5) 
    {
        player.pos.x += player.speed;
        //console.log("x: " + player.pos.x);
    }

    if (player.counter <= 0)
    {
        Destroy(this);
        gameStart(Scenes, currentLevel + 1);        
    }
}

//ball
var ball = new GameObject("Ball", "Assets/ball.png");
ball.lives = 0;
ball.start = function start()
{
    ball.w = 8;
    ball.h = 8;
    ball.pos.x = 0;
    ball.pos.y = 0;

    ball.col[0] = new BoxCollider(ball.w, ball.h)
    ball.col[1] = new BoxCollider(ball.w * 0.5 - 4, ball.h - 4, -6, 0);
    ball.col[2] = new BoxCollider(ball.w - 4, ball.h * 0.5 - 4, 0, 6);
    ball.col[3] = new BoxCollider(ball.w * 0.5 - 4, ball.h - 4, 6, 0);
    ball.col[4] = new BoxCollider(ball.w - 4, ball.h * 0.5 - 4, 0, -6);

    let rand = Math.random();
    if (rand <= 0.5) {
        rand = -1;
    } else {
        rand = 1;
    }
    ball.dir = new Vector2(rand, -1);

    ball.speed = 1;

    if(ball.lives <= 0)
    {
        ball.lives = 3;
    }    
}

ball.update = function update()
{
    if(ball.col[0].isColliding)
    {
        //console.log(ball.col[0].collided);
        if(ball.col[0].collided == "downWall")
        {   
            ball.lives -= 1;
            if(ball.lives <= 0)
            {
                Destroy(this);
                gameStart(Scenes, 3);
            }
            ball.start();
            return;
        }
        
        if(ball.col[1].isColliding||ball.col[3].isColliding)
        {
            ball.dir.x = -ball.dir.x;
        }

        if(ball.col[2].isColliding||ball.col[4].isColliding)
        {
            ball.dir.y = -ball.dir.y;
        }
    }

    //console.log(ball.col.isColliding);
    ball.pos.y += ball.dir.y * ball.speed;
    ball.pos.x += ball.dir.x * ball.speed;    
}

class Wall extends GameObject{
    constructor(){
        super()

        this.sprite.src = "Assets/Wall.png";
        this.w = 5;
        this.h = canvas.height;
        
        this.col[0] = new BoxCollider(5, canvas.height);
        // this.col.w = 20;
        // this.col.h = 30;
    }
}

var leftWall = new Wall();
leftWall.name = "leftWall";
leftWall.pos.x = -canvas.width*0.5;
//leftWall.col.debug = true;

var rightWall = new Wall();
rightWall.name = "rigthWall"
rightWall.pos.x = canvas.width*0.5;
//rightWall.col.debug = true;


var downWall = new Wall();
downWall.name = "downWall";
downWall.w = 0;
downWall.h = 0;
downWall.col[0] = new BoxCollider(canvas.width, 5);
downWall.pos.y = -canvas.height*0.5 - downWall.h*0.5;

var upWall = new Wall();
upWall.name = "upWall";
upWall.w = canvas.width;
upWall.h = 5;
upWall.pos.y = canvas.height*0.5;
upWall.col[0] = new BoxCollider(canvas.width, 5);

//bloques
class Brick extends GameObject{
    constructor(x = 0, y = 0){
        super();
        this.sprite.src = "Assets/Brick.png";
        this.name = "Brick"
        this.w = 16;
        this.h = 4;       

        this.pos.x = x;
        this.pos.y = y;

        this.start = function ()
        {
            this.col[0] = new BoxCollider(16, 4);
        }

        this.update = function update(){
            if(this.col[0].isColliding){
                console.log("destroy");
                Destroy(this);
                player.counter -= 1;
            }
        }
    }
}

//menu
var title = new GameObject("Title", "Assets/Start.png");
title.start = function()
{
    title.w = 34*2;
    title.h = 39*2;
}
title.update = function ()
{
    if(spacePressed)
    {
        Destroy(this);
        gameStart(Scenes, 1);        
    }
}

var gameOverScreen = new GameObject("GameOver", "Assets/GameOver.png");
gameOverScreen.start = function()
{
    gameOverScreen.w = 19*2;
    gameOverScreen.h = 30*2;
}
gameOverScreen.update = function ()
{
    if(spacePressed)
    {
        Destroy(this);
        gameStart(Scenes, 0);        
    }
}

var Menu = [title];
var Level1 = [leftWall, rightWall, upWall, downWall, player, ball, new Brick(-30, 80), new Brick(0, 80), new Brick(30, 80)];
var Level2 = [leftWall, rightWall, upWall, downWall, player, ball, new Brick(-30, 80), new Brick(0, 80), new Brick(30, 80), new Brick(-30, 60), new Brick(0, 60), new Brick(30, 60)];
var GameOver = [gameOverScreen];

var Scenes = [Menu, Level1, Level2, GameOver];

window.onload = gameStart(Scenes, 0);
//window.onload = gameUpdate();