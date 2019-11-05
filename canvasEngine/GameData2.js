var player = new GameObject("player", "Assets/RedFace.png");
player.start = function ()
{
    this.w = 10;
    this.h = 10;
    this.pos.x = -50;
    this.pos.y = -80;

    this.col[0].w = 10;
    this.col[0].h = 10;

    this.rb = new RigidBody("", 0, 0, 0);

    this.speed = 2;
    this.keys = 0
    this.points = 0

    this.maxPoints = 0
    for (let i = 0; i < gameObjects.length; i++) {
        if(gameObjects[i].name == "Point")
        {
            this.maxPoints += 1;
        }        
    }

    Score.text = "0";

    this.dir = new Vector2(0,0)
}
player.update = function ()
{
    if (this.col[0].isColliding && this.col[0].collided.name == "Door")
    {
        if(this.keys > 0)
        {
            Destroy(this.col[0].collided)
            this.keys -= 1;
        }
    }

    if(Input.left.keyPressed)
    {
        this.dir.x = -1
    }
    else if(Input.right.keyPressed)
    {
        this.dir.x = 1
    }
    else
    {
        this.dir.x = 0
    }

    if(Input.up.keyPressed)
    {
        this.dir.y = 1;
    }
    else if(Input.down.keyPressed)
    {
        this.dir.y = -1;
    }
    else
    {
        this.dir.y = 0
    }

    this.rb.vel = new Vector2(this.dir.x * this.speed, this.dir.y * this.speed)
}

class wall extends GameObject
{
    constructor(x = 0, y =0, w = 10, h = 10)
    {
        super()
        this.sprite.src = "Assets/WallBorder.png"
        this.name = "Wall"
        this.pos.x = x;
        this.pos.y = y;
        this.w = w;
        this.h = h;

        this.col[0] = new BoxCollider(w, h, 0, 0);
        //this.col[0].debug = true
        this.rb = new RigidBody ("Static", 0, 0, 0);
    }
}

class door extends GameObject
{
    constructor(x = 0, y =0, w = 10, h = 10)
    {
        super()
        this.sprite.src = "Assets/Brick.png"
        this.name = "Door"
        this.pos.x = x;
        this.pos.y = y;
        this.w = w;
        this.h = h;

        this.col[0] = new BoxCollider(w, h, 0, 0);
        //this.col[0].debug = true
        this.rb = new RigidBody ("Static", 0, 0, 0);

        // this.update = function()
        // {
        //     if(this.col[0].isColliding && this.col[0].collided.name == "player" && player.keys > 0)
        //     {
        //         Destroy(this);
        //     }
        // }
    }
}

class qey extends GameObject
{
    constructor(x = 0, y = 0)
    {
        super()
        this.sprite.src = "Assets/Key.png"
        this.name = "Door"
        this.pos.x = x;
        this.pos.y = y;
        this.w = 6;
        this.h = 12;

        this.col[0] = new BoxCollider(6, 12, 0, 0);
        //this.col[0].debug = true
        this.rb = null

        this.update = function()
        {
            if(this.col[0].isColliding && this.col[0].collided.name == "player")
            {
                Destroy(this);
                player.keys += 1;
            }
        }
    }
}

class point extends GameObject
{
    constructor(x = 0, y = 0)
    {
        super()
        this.sprite.src = "Assets/Point.png"
        this.name = "Point"
        this.pos.x = x;
        this.pos.y = y;
        this.w = 8;
        this.h = 8;

        
        //this.col[0].debug = true
        this.rb = null

        this.start = function()
        {
            this.col[0] = new BoxCollider(8, 8, 0, 0);
        }
        this.update = function()
        {
            if(this.col[0].isColliding && this.col[0].collided.name == "player")
            {
                Destroy(this);
                player.points += 1;
                Score.text = player.points.toString();
            }
        }
    }
}

class exit extends GameObject
{constructor(x = 0, y = 0)
    {super()
        this.sprite.src = "Assets/Exit.png"
        this.name = "Exit"
        this.pos.x = x;
        this.pos.y = y;
        this.w = 16;
        this.h = 16;

        this.col[0] = new BoxCollider(16, 16, 0, 0);
        //this.col[0].debug = true
        this.rb = null

        this.update = function()
        {
            if(this.col[0].isColliding && this.col[0].collided.name == "player")
            {
                if(player.points >= player.maxPoints)
                {
                    Destroy(this);
                    gameStart(Scenes, currentLevel + 1)
                }
                
            }
        }
    }
}

var title = new GameObject("Title", "Assets/StartLaberinto.png");
title.start = function()
{
    title.w = 33*2;
    title.h = 33*2;
    title.rb = null
}
title.update = function ()
{
    if(Input.space.keyDown)
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
    this.rb = null
}
gameOverScreen.update = function ()
{
    if(Input.space.keyDown)
    {
        Destroy(this);
        gameStart(Scenes, 0);        
    }
}

var Inicio = [title]; var GameOver = [gameOverScreen]
var level1 = [player, new wall(-62, 0, 2, 200), new wall(62, 0, 2, 200), new wall(0, -94, 120, 2), new wall(0, 94, 120, 2), new wall(-28, -60, 60, 2), new wall(28, -40, 60, 2),
            new wall(28, -20, 60, 2), new qey(54, -30), new wall(38, 20, 40, 2), new wall(-38, 20, 40, 2), new door(0, 20, 26, 2), new point(50, -80), new point(-50, 0), 
            new point(-50, 80), new exit(50, 80)]

var Scenes = [Inicio, level1, GameOver];

window.onload = gameStart(Scenes, 0);