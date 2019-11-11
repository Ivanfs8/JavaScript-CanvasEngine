var Player = new GameObject("Player", "Assets/Ship.png")
Player.Speed = new Vector2(2,1);
Player.start = function()
{
    this.w = 18;
    this.h = 13;
    this.pos.x = 0;
    this.pos.y = -80;

    this.dir = new Vector2(0,0)

    this.rb = new RigidBody("Static", 0, 0, 0);
    this.col[0] = new BoxCollider(18, 13);
    this.col[0].debug = true
}

Player.update = function()
{
    if(Input.left.keyPressed)
    {
        this.dir.x = -1;
    }
    else if(Input.right.keyPressed)
    {
        this.dir.x = 1;
    }
    else
    {
        this.dir.x = 0;
    }

    if(Input.down.keyPressed)
    {
        this.dir.y = -1;
    }
    else if(Input.up.keyPressed)
    {
        this.dir.y = 1;
    }
    else
    {
        this.dir.y = 0;
    }

    if(Input.space.keyDown)
    {
        Create(new Bullet(Player.pos.x, Player.pos.y + 10))
    }

    this.rb.vel = new Vector2(this.dir.x * this.Speed.x, this.dir.y * this.Speed.y);
}

class Bullet extends GameObject{
    constructor(x, y)
    {super("Bullet", "Assets/Laser.png")
                
        this.pos.x = x;
        this.pos.y = y;

        this.w = 2
        this.h = 13

        this.rb = new RigidBody("Static", 0, 3, 0)

        this.start = function()
        {
            this.col[0] = new BoxCollider(2, 10);
            this.col[0].debug = true
        }

        this.update = function()
        {
            if(this.pos.y > canvas.height*0.6)
            {
                Destroy(this);
            }

            if(this.col[0].isColliding && this.col[0].collided.name == "Asteroid")
            {
                Destroy(this);
            }
        }        
    }
}

class Asteroid extends GameObject{
    constructor(x,y)
    {super("Asteroid", "Assets/Asteroid.png")
        this.pos.x = x;
        this.pos.y = y;

        this.w = 28
        this.h = 21

        this.rb = new RigidBody("Static", 0, 0, 0)

        this.start = function()
        {
            this.health = 3
            this.col[0] = new BoxCollider(28,21)
            this.col[0].debug = true         
        }

        this.update = function()
        {            
            if(this.col[0].isColliding && this.col[0].collided.name == "Bullet")
            {
                this.health -= 1;
            }

            if(this.health <= 0)
            {
                Destroy(this);
            }
        }
    }

}

var level1 = [Player, new Asteroid(0,0)];
var Scenes = [level1];
gameStart(Scenes, 0);