const xLimit = canvas.width*0.5-105;
const yLimit = canvas.height*0.5-100;

var globalRepeatIndex = 0

class Dificulty{
    constructor(min = 2, max = 3, minQ = 1, maxQ = 1, maxScore = 300)
    {
        this.minSpawn = min
        this.maxSpawn = max
        this.minQuantity = minQ
        this.maxQuantity = maxQ
        this.ScoreObjective = maxScore
    }
}

var LevelDificulty = 
[
    new Dificulty(1.8, 2.5, 1, 1, 100),
    new Dificulty(1.6, 2.2, 1, 2, 300),
    new Dificulty(1.4, 2, 1, 2, 550),
    new Dificulty(1.2, 1.8, 1, 2, 1000),
    new Dificulty(1, 1.6, 1, 3, 1325),
    new Dificulty(1, 1.4, 1, 3, 1900),
    new Dificulty(1, 1.4, 2, 3, 2350),
    new Dificulty(1, 1.2, 2, 3, 3025),
    new Dificulty(0.8, 1.2, 2, 4, 3550),
    new Dificulty(0.5, 1, 2, 5, 4000),
]

var levelIndex = 0

var gm = new GameObject("gm", null)
gm.play = false
gm.start = function()
{
    if(currentLevel == 1)
    {
        this.Score = 0;
    }
    this.rb = null
    this.col = null

    this.play = true
    this.spawnDelay = getRandomFloatInclusive(LevelDificulty[levelIndex].minSpawn, LevelDificulty[levelIndex].maxSpawn)
    this.xCord = getRandomIntInclusive(-xLimit, xLimit)
    this.spawnQuantity = getRandomIntInclusive(LevelDificulty[levelIndex].minQuantity, LevelDificulty[levelIndex].maxQuantity)
    console.log(this.spawnDelay + "\n" + this.spawnQuantity)
    gm.Spawn(this.spawnDelay)
}

gm.update = function()
{
    Score.text = gm.Score.toString();
    Lives.text = Player.lives
    LevelCanvas.text = "LV " + (levelIndex+1)
    if(gm.Score >= LevelDificulty[levelIndex].ScoreObjective)
    {        
        //this.play = false
        levelIndex++
        console.log("level up to " + (levelIndex+1))
        
        if(levelIndex > LevelDificulty.length -1)
        {
            levelIndex = 0
            gameStart(Scenes, 2)
        }
    }
}

gm.GameOver = function ()
{
    gm.play = false
    levelIndex = 0
    gameStart(Scenes, Scenes.length-1)
    globalRepeatIndex++
}

gm.Spawn = async (sec) => 
{   
    let level = currentLevel
    let localRepeatIndex = globalRepeatIndex
    if(gm.play && currentLevel == level && globalRepeatIndex == localRepeatIndex)
    {   
        await delay(sec * 1000);
        if(gm.play && currentLevel == level && globalRepeatIndex == localRepeatIndex)
        {
            gm.spawnDelay = getRandomFloatInclusive(LevelDificulty[levelIndex].minSpawn, LevelDificulty[levelIndex].maxSpawn)            
            gm.spawnQuantity = getRandomIntInclusive(LevelDificulty[levelIndex].minQuantity, LevelDificulty[levelIndex].maxQuantity)

            console.log(gm.spawnDelay + "\n" + gm.spawnQuantity)
            
            for (let i = 0; i < gm.spawnQuantity; i++) 
            {
                gm.xCord = getRandomIntInclusive(-xLimit, xLimit)            
                Create(new Asteroid(gm.xCord, yLimit + 10, getRandomIntInclusive(1,3), 0 ) )                
            }            
            
            gm.Spawn(gm.spawnDelay)
        }
        else{return}
    }
    else
    {
        console.log("ended")
        return
    }    
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
    if(this.lives < 0)
    {
        gm.GameOver()
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
    constructor(x = 0, y = 0, size = 3, dir = 0) //falta size and direction
    {super("Asteroid", "Assets/Asteroid.png")
        this.pos.x = x;
        this.pos.y = y;
        
        this.size = size
        this.dir = dir

        this.spriteBig = ["Assets/Asteroid.png", "Assets/AsteroidBreak1.png", "Assets/AsteroidBreak2.png"]
        this.spriteMed = ["Assets/AsteroidM.png", "Assets/AsteroidMBreak.png"]
        this.spriteSma = "Assets/AsteroidS.png"

        switch (size) 
        {
            case 3:
                this.sprite.src = this.spriteBig[0]
                this.w = 28
                this.h = 21
                this.speed = 1
                break;
            case 2:
                this.sprite.src = this.spriteMed[0]
                this.w = 15
                this.h = 17
                this.speed = 2
                break;
            case 1:
                this.sprite.src = this.spriteSma
                this.w = 8
                this.h = 8
                this.speed = 2
                break;        
            default:
                break;
        }        

        this.start = function()
        {
            this.health = this.size
            this.rb = new RigidBody("Static", this.dir, -1 * this.speed, 0)
            this.col[0] = new BoxCollider(this.w,this.h)
            this.col[0].ignore = ["Mineral", "Asteroid"]
            //this.col[0].debug = true         
        }

        this.update = function()
        {            
            if(this.col[0].isColliding && (this.col[0].collided.name == "Bullet" || this.col[0].collided.name == "Asteroid"))
            {
                this.tookDamageAnim(0.05)
                
                if(this.size != 1)
                {
                    var chance = getRandomIntInclusive (1,10)
                    if(chance < 4 - this.health)
                    {
                        Destroy(this);
                        Create(new Asteroid(this.pos.x-5, this.pos.y, this.size-1, -1))
                        Create(new Asteroid(this.pos.x+5, this.pos.y, this.size-1, 1))
                        return
                    }
                }

                this.health -= 1;
                if(this.health <= 0)
                {
                    //let chance = getRandomIntInclusive(1, 3)
                    Create(new Mineral(this.pos.x, this.pos.y, this.size))
                    Destroy(this);                                        
                }
                else 
                {
                    switch (size) 
                    {
                        case 3:
                            if(this.health == 2)
                                {this.sprite.src = this.spriteBig[1]}
                            else
                                {this.sprite.src = this.spriteBig[2]}
                            break;
                        case 2:
                            this.sprite.src = this.spriteMed[1]                            
                            break;                              
                        default:
                            break;
                    }
                }               
            }

            if(this.col[0].isColliding && (this.col[0].collided.name == "Player"))
            {
                Destroy(this);
                Player.lives -= 1
            }            

            if(this.pos.y < -canvas.height*0.6)
            {
                Destroy(this)
            }
        }

        this.tookDamageAnim = async (sec) => 
        {
            this.spriteMods.luminosity = 200;
            await delay(sec * 1000);
            this.spriteMods.luminosity = null;
        }
    }
}

class Mineral extends GameObject{
    constructor(x, y, type = 1){
    super("Mineral", "Assets/RedMin.png")
        this.pos = new Vector2(x, y)
        
        this.start = function()
        {
            switch (type) 
            {
                case 3:
                    this.sprite.src = "Assets/RedMin.png"
                    this.w = 8
                    this.h = 10
                    this.rb = new RigidBody("Static", 0, -1, 0)
                    this.col[0] = new BoxCollider(8,10)
                    this.value = 25
                    break;
                case 2:
                    this.sprite.src = "Assets/GreenMin.png"
                    this.w = 7
                    this.h = 7
                    this.rb = new RigidBody("Static", 0, -2, 0)
                    this.col[0] = new BoxCollider(7,7)
                    this.value = 50
                    break;
                case 1:
                    this.sprite.src = "Assets/SkyMin.png"
                    this.w = 7
                    this.h = 7
                    this.rb = new RigidBody("Static", 0, -3, 0)
                    this.col[0] = new BoxCollider(7,7)
                    this.value = 100
                    break;
                default:
                    break;
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

var Background = new GameObject("Background", "Assets/Background.png")
Background.start = function()
{
    this.pos.y = yLimit
    this.pos.x = 0
    this.rb = new RigidBody("Static", 0, -0.1, 0)
    this.col = null
    this.spriteMods.tiled = true
    this.w = 192
    this.h = 192*3
}

Background.update = function()
{
    if(Background.pos.y <= -yLimit)
    {
        Background.pos.y = yLimit+8
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
    LevelCanvas.text = ""
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
var level1 = [Background, gm, Player];
var Victory = [victoryScreen];
var GameOver = [gameOverScreen]

var Scenes = [Title, level1, Victory, GameOver];

var Score = new TextObject("Squarebit", 2,"right", 90, -80, "white");
var Lives = new TextObject("Squarebit", 2,"left", -90, -80, "red");
var LevelCanvas = new TextObject("Squarebit", 1,"right", 90, -70, "white");
var Canvas = [Score, Lives, LevelCanvas]
UserInterface = Canvas
gameStart(Scenes, 0);