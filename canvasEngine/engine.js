//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');
ctx.translate(canvas.width*0.5, canvas.height*0.5);
ctx.scale(1, -1);
ctx.imageSmoothingEnabled = false;
ctx.save();

var gameObjects = [];

//fisicas y colisiones
var collisions = [];

//controles
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//document.addEventListener("mouseenter", )

var rightPressed;
var leftPressed;
var upPressed;
var downPressed;
var spacePressed;

function keyDownHandler(e) {
    if(e.keyCode == 39)
    {
        rightPressed = true;
    }
    
    if(e.keyCode == 37)
    {
        leftPressed = true;
    }

    if(e.keyCode == 38)
    {
        upPressed = true;
    }

    if(e.keyCode == 40)
    {
        downPressed = true;
    }

    if(e.keyCode == 32)
    {
        spacePressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    
    if(e.keyCode == 37) {
        leftPressed = false;
    }

    if(e.keyCode == 38)
    {
        upPressed = false;
    }

    if(e.keyCode == 40)
    {
        downPressed = false;
    }

    if(e.keyCode == 32)
    {
        spacePressed = false;
    }
}

//render images
function drawImage(img, x, y, width, height) 
{
    ctx.save();
    
    //if(typeof width === "undefined") width = img.width;
    //if(typeof height === "undefined") height = img.height;
    //if(typeof center === "undefined") center = false;
    
    // Set rotation point to center of image, instead of top/left
    x -= width/2;
    y -= height/2;
    
    // Set the origin to the center of the image
    ctx.translate(x + width/2, y + height/2);
    
    // Rotate the canvas around the origin
    //var rad = 2 * Math.PI - deg * Math.PI / 180;    
    //context.rotate(rad);
    
    // Flip/flop the canvas
    //if(flip) flipScale = -1; else flipScale = 1;
    //if(flop) flopScale = -1; else flopScale = 1;
    ctx.scale(1, -1);
    
    // Draw the image    
    ctx.drawImage(img, -width/2, -height/2, width, height);
    
    ctx.restore();
}

//game updates
var rID = null;
var currentLevel = 0;

function gameStart(Scenes, level = 0)
{
    currentLevel = level;
    gameObjects = [];

    gameObjects = [...Scenes[level]];

    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].gameObject = i;
        
        gameObjects[i].start();
    };

    if(rID == null)
    {
        gameUpdate();
    }
    //cancelAnimationFrame(rID);    
}

function gameUpdate() 
{
    ctx.clearRect(-canvas.width*0.5, -canvas.height*0.5, canvas.width, canvas.height);

    for (let i = 0; i < gameObjects.length; i++) 
    {        
        gameObjects[i].update();
    }

    physicsUpdate()

    //CheckAllColisions();
    for (let a = 0; a < gameObjects.length; a++) 
    {
        for (let b = 0; b < gameObjects.length; b++) 
        {
            if(a != b)
            {
                if(gameObjects[a].rb != null && gameObjects[a].rb != undefined && gameObjects[a].rb.type != "Static")
                {
                    let box = 
                    {
                        x : gameObjects[a].pos.x,
                        y : gameObjects[a].pos.y,
                        w : gameObjects[a].col[0].w,
                        h : gameObjects[a].col[0].h,
                        vx : gameObjects[a].rb.vel.x,
                        vy : gameObjects[a].rb.vel.y
                    }
                    
                    let test = new GameObject("", "")
                    test.pos.x = box.vx > 0 ? box.x + box.vx : box.x + box.vx
                    test.pos.y = box.vy > 0 ? box.y + box.vy : box.y + box.vy
                    test.col[0] =                     
                    new BoxCollider(box.vx > 0 ? box.vx + box.w : box.w - box.vx,
                                    box.vy > 0 ? box.vy + box.h : box.h - box.vy)
                    
                    test.col[0].debug = true
                    boxCollisions(test, gameObjects[b])
                    if(test.col[0].isColliding)
                    {
                        SweepAABB(gameObjects[a], gameObjects[b])
                    }
                    else
                    {
                        gameObjects[a].col[0].isColliding = false;
                        gameObjects[a].col[0].collided = ""
                        gameObjects[a].col[0].colDir = new Vector2 (0,0)
                    }                   
                }
                else
                {
                    boxCollisions(gameObjects[a], gameObjects[b]);
                }                

                if(gameObjects[a].col[0].isColliding)
                {                   
                    break;
                }
            }
            
        }        
    }

       
    
    for (let i = 0; i < gameObjects.length; i++) 
    {
        drawImage(gameObjects[i].sprite, gameObjects[i].pos.x, gameObjects[i].pos.y, gameObjects[i].w, gameObjects[i].h)
        
        //ctx.drawImage(gameObjects[i].sprite, gameObjects[i].pos.x - gameObjects[i].w*0.5, gameObjects[i].pos.y + gameObjects[i].h*0.5, gameObjects[i].w, -gameObjects[i].h);                        
    }

    rID = requestAnimationFrame(gameUpdate);       
}

