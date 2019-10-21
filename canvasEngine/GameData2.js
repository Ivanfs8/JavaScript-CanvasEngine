var player = new GameObject("player", "Assets/RedFace.png");
player.start = function ()
{
    this.w = 10;
    this.h = 10;
    this.pos.x = 0;
    this.pos.y = -60;

    this.col[0].w = 10;
    this.col[0].h = 10;

    this.rb = new RigidBody("", 0, 0, 0);

    this.speed = 2;

    this.dir = new Vector2(0,0)
}
player.update = function ()
{
    if (this.col[0].isColliding && this.col[0].collided == "Wall")
    {
        console.log("Pared")
    }

    if(leftPressed && this.col[0].colDir.x != 1)
    {
        this.dir.x = -1
    }
    else if(rightPressed && this.col[0].colDir.x != -1)
    {
        this.dir.x = 1
    }
    else 
    {
        this.dir.x = 0
    }

    if(upPressed && this.col[0].colDir.y != -1)
    {
        this.dir.y = 1;
    }
    else if(downPressed && this.col[0].colDir.y != 1)
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
        this.col[0].debug = true
        this.rb = new RigidBody ("Static", 0, 0, 0);
    }
}

var level1 = [player, new wall(0, 0, 20, 20)]

var Scenes = [level1];

window.onload = gameStart(Scenes, 0);