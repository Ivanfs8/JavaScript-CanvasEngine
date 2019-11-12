const xLimit = canvas.width*0.5;
const yLimit = canvas.height*0.5;

var play = false

var gm = new GameObject("gm", null)
gm.start = function()
{
    if(currentLevel == 1)
    {
        this.Score = 0;
    }
    this.rb = null
    this.col = null

    play = true
    this.spawnDelay = getRandomFloatInclusive(1,3)
    this.xCord = getRandomIntInclusive(-xLimit, xLimit)
    console.log(this.spawnDelay)
    Spawn(this.spawnDelay)
}

gm.update = function()
{
    Score.text = gm.Score.toString();
    Lives.text = Player.lives
    if(gm.Score >= 800)
    {
        play = false
        gameStart(Scenes, 2)
    }
}

const Spawn = async (sec) => 
{
    gm.spawnDelay = getRandomFloatInclusive(2,3)
    gm.xCord = getRandomIntInclusive(-xLimit, xLimit)

    Create(new Asteroid(gm.xCord, yLimit + 10))
    
    if(play)
    {
        await delay(sec * 1000);
        console.log(gm.spawnDelay)
        Spawn(gm.spawnDelay)
    }else{console.log("ended")}
    
}

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
    //this.col[0].debug = true

    this.canShoot = true

    this.lives = 3
}

Player.update = function()
{
    if(this.lives <= 0)
    {
        gameStart(Scenes, 3)
    }

    if(Input.left.keyPressed && this.pos.x > -xLimit)
    {
        this.dir.x = -1;
    }
    else if(Input.right.keyPressed && this.pos.x < xLimit)
    {
        this.dir.x = 1;
    }
    else
    {
        this.dir.x = 0;
    }

    if(Input.down.keyPressed && this.pos.y > -yLimit)
    {
        this.dir.y = -1;
    }
    else if(Input.up.keyPressed && this.pos.y < yLimit)
    {
        this.dir.y = 1;
    }
    else
    {
        this.dir.y = 0;
    }

    if(Input.space.keyPressed && this.canShoot)
    {
        this.canShoot = false;
        Create(new Bullet(Player.pos.x, Player.pos.y + 10))

        this.shootDelay(0.15);
    }

    this.rb.vel = new Vector2(this.dir.x * this.Speed.x, this.dir.y * this.Speed.y);
}

Player.shootDelay = async (sec) => 
{
    await delay(sec * 1000);
    Player.canShoot = true;    
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
            //this.col[0].debug = true
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
    constructor(x = 0, y = 0)
    {super("Asteroid", "Assets/Asteroid.png")
        this.pos.x = x;
        this.pos.y = y;

        this.w = 28
        this.h = 21

        this.rb = new RigidBody("Static", 0, -1, 0)

        this.start = function()
        {
            this.health = 3
            this.col[0] = new BoxCollider(28,21)
            //this.col[0].debug = true         
        }

        this.update = function()
        {            
            if(this.col[0].isColliding && (this.col[0].collided.name == "Bullet" || this.col[0].collided.name == "Asteroid"))
            {
                this.health -= 1;
            }

            if(this.col[0].isColliding && (this.col[0].collided.name == "Player"))
            {
                Destroy(this);
                Player.lives -= 1
            }

            if(this.health <= 0)
            {
                let chance = getRandomIntInclusive(1, 3)
                Create(new Mineral(this.pos.x, this.pos.y, chance))
                Destroy(this);
            }

            if(this.pos.y < -canvas.height*0.6)
            {
                Destroy(this)
            }
        }
    }
}

class Mineral extends GameObject{
    constructor(x, y, type = 1){
    super("Mineral", "Assets/RedMin.png")
        this.pos = new Vector2(x, y)
        
        this.start = function()
        {
            if(type == 1)
            {
                this.sprite.src = "Assets/RedMin.png"
                this.w = 8
                this.h = 10
                this.rb = new RigidBody("Static", 0, -1, 0)
                this.col[0] = new BoxCollider(8,10)
                this.value = 10
            }
            else if(type == 2)
            {
                this.sprite.src = "Assets/GreenMin.png"
                this.w = 7
                this.h = 7
                this.rb = new RigidBody("Static", 0, -2, 0)
                this.col[0] = new BoxCollider(7,7)
                this.value = 50
            }
            else if(type == 3)
            {
                this.sprite.src = "Assets/SkyMin.png"
                this.w = 7
                this.h = 7
                this.rb = new RigidBody("Static", 0, -3, 0)
                this.col[0] = new BoxCollider(7,7)
                this.value = 100
            }
        }

        this.update = function()
        {
            if(this.col[0].isColliding && this.col[0].collided.name == "Player")
            {
                Destroy(this)
                gm.Score += this.value
            }
        }

    }
}

var titleScreen = new GameObject("Title", "Assets/Start.png");
titleScreen.start = function()
{
    titleScreen.w = 36*2;
    titleScreen.h = 40*2;
    titleScreen.rb = null

    Score.text = ""
    Lives.text = ""
    play = false
}
titleScreen.update = function ()
{
    if(Input.space.keyDown)
    {
        Destroy(this);
        gameStart(Scenes, 1);
    }
}

var victoryScreen = new GameObject("Victory", "Assets/Victory.png")
victoryScreen.start = function()
{
    this.w = 42*2
    this.h = 40*2
    this.rb = null
    play = false
    Score.text = ""
    Lives.text = ""
}
victoryScreen.update = function ()
{
    if(Input.space.keyDown)
    {
        Destroy(this);
        gameStart(Scenes, 0);        
    }
}

var gameOverScreen = new GameObject("GameOver", "Assets/GameOver.png");
gameOverScreen.start = function()
{
    gameOverScreen.w = 19*2;
    gameOverScreen.h = 30*2;
    this.rb = null
    play = false
}
gameOverScreen.update = function ()
{
    if(Input.space.keyDown)
    {
        Destroy(this);
        gameStart(Scenes, 0);        
    }
}

var Title = [titleScreen]
var level1 = [gm, Player];
var Victory = [victoryScreen];
var GameOver = [gameOverScreen]

var Scenes = [Title, level1, Victory, GameOver];

var Score = new TextObject("Squarebit", 2,"right", 90, -80, "white");
var Lives = new TextObject("Squarebit", 2,"left", -90, -80, "red");
var Canvas = [Score, Lives]
UserInterface = Canvas
gameStart(Scenes, 0);