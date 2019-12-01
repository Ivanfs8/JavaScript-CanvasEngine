//sistema
let canvas = document.getElementById("Canvas");
let ctx = canvas.getContext('2d');

// let dpi = Window.devicePixelRatio;
// let style_height = getComputedStyle(canvas).getPropertyValue("height").slice(0, -2);
// let style_width = getComputedStyle(canvas).getPropertyValue("width").slice(0, -2);
// canvas.setAttribute('height', style_height * dpi);
// canvas.setAttribute('width', style_width * dpi);

ctx.translate(canvas.width*0.5, canvas.height*0.5);
ctx.scale(2, -2);
ctx.imageSmoothingEnabled = false;
ctx.save();

var gameObjects = [];
var UserInterface = [];

//fisicas y colisiones
//var collisions = [];

//controles
document.addEventListener("keydown", keyDown, true);
document.addEventListener("keyup", keyUp, true);
//document.addEventListener("mouseenter", )

class key 
{
    constructor(keyCode = 0, keyDown = false, keyPressed = false, keyUp = false)
    {
        this.keyCode = keyCode;
        //this.code = code;
        this.keyDown = keyDown;
        this.keyPressed = keyPressed;
        this.keyUp = keyUp;       
    }
}

var Input =
{
    left : new key(37),
    right : new key(39),
    up : new key (38),
    down : new key (40),
    space : new key (32)
}

function keyDown(e)
{
    if(e.keyCode == 37 || e.keyCode == 38 || e.keyCode == 39 || e.keyCode == 40)
    {
        e.view.event.preventDefault();
    }
    
    //console.log("key" + e.keyCode)
    for (const key in Input) 
    {
        if (Input[key].keyCode == e.keyCode)
        {
            if(!Input[key].keyPressed)
            {
                Input[key].keyDown = true;
                Input[key].keyUp = false;
                Input[key].keyPressed = true;
            }            
        };
    }
}

function keyUp(e)
{
    for (const key in Input) {
        if (Input[key].keyCode == e.keyCode)
        {
            Input[key].keyUp = true;
            Input[key].keyDown = false;
            Input[key].keyPressed = false;
        };
    }
}

//render images
function drawImage(img, x, y, width, height, mods) 
{
    ctx.save();   
    
    //HSL
    if(mods.hue != null || mods.saturation != null || mods.luminosity != null)
    {
        ctx.filter = "brightness("+ (100+mods.luminosity) +"%)"
    }else{ctx.filter = "none"}

    if(!mods.tiled)
    {
        //if(typeof width === "undefined") width = img.width;
        //if(typeof height === "undefined") height = img.height;
        //if(typeof center === "undefined") center = false;
        
        // Set rotation point to center of image, instead of top/left
        //x -= width/2;
        //y -= height/2;
        
        // Set the origin to the center of the image
        ctx.translate(x, y);
        
        // Rotate the canvas around the origin
        //var rad = 2 * Math.PI - deg * Math.PI / 180;    
        //context.rotate(rad);
        
        // Flip/flop the canvas
        //if(flip) flipScale = -1; else flipScale = 1;
        //if(flop) flopScale = -1; else flopScale = 1;
        ctx.scale(1, -1);

        // Draw the image    
        ctx.drawImage(img, -width/2, -height/2, width, height);
    }
    else
    { 
        // set draw cordinates
        let xb = -width/2;
        let yb = -height/2;
        
        //restore cordinates to top left
        ctx.translate(xb, yb)
        ctx.scale(1,1)

        //draw pattern in rect        
        let pat = ctx.createPattern(img, "repeat");
        ctx.rect(x, y, width, height);
        ctx.fillStyle = pat;
        
        //translate again to center pivot before drawing
        ctx.translate(x, y)
        ctx.fill();
    }

    ctx.restore();
}

function drawText(font, size, align, x, y, text, color = "black") 
{
    ctx.save();
    
    //if(typeof width === "undefined") width = img.width;
    //if(typeof height === "undefined") height = img.height;
    //if(typeof center === "undefined") center = false;
    
    // Set rotation point to center of image, instead of top/left
    //x -= width/2;
    //y -= height/2;
    
    // Set the origin to the center of the image
    //ctx.translate(x-0.5, y + size/2);
    ctx.scale(1, -1);
    var fontString = size + "px " + font    
    ctx.font = fontString;
    ctx.fillStyle = color;
    ctx.textAlign = align;
    // Draw the image    
    ctx.fillText(text, x, y);
    
    ctx.restore();
}

//game updates
var rID = null;
var currentLevel = 0;
var lastGO_ID = 0

function gameStart(Scenes, level = 0)
{
    currentLevel = level;
    delete gameObjects
    //gameObjects = [];

    gameObjects = [...Scenes[level]];    

    for (let i = 0; i < gameObjects.length; i++) {
        gameObjects[i].gameObject = i;
        
        gameObjects[i].start();
    };

    lastGO_ID = gameObjects.length;

    if(rID == null)
    {
        //gameUpdate();
        ctx.font = "32px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";   
        ctx.fillText("Loading", 0, 0);

        window.onload = gameUpdate()
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
            if(a != b && gameObjects[a].col != null && gameObjects[b].col != null)
            {
                if(gameObjects[a].rb != null && gameObjects[a].rb != undefined && gameObjects[a].rb.type != "Static" &&
                gameObjects[b].rb != null && gameObjects[b].rb != undefined)
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
                    
                    //test.col[0].debug = true
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
        if(gameObjects[i].sprite != null && gameObjects[i].sprite != undefined && gameObjects[i].sprite.src != null && gameObjects[i].sprite.src != undefined)
        {
            drawImage(gameObjects[i].sprite, gameObjects[i].pos.x, gameObjects[i].pos.y, gameObjects[i].w, gameObjects[i].h, gameObjects[i].spriteMods);
        }       
        
        //ctx.drawImage(gameObjects[i].sprite, gameObjects[i].pos.x - gameObjects[i].w*0.5, gameObjects[i].pos.y + gameObjects[i].h*0.5, gameObjects[i].w, -gameObjects[i].h);                        
    }

    for (let i = 0; i < UserInterface.length; i++) 
    {
        drawText(UserInterface[i].font, UserInterface[i].size, UserInterface[i].align, UserInterface[i].pos.x, UserInterface[i].pos.y, UserInterface[i].text, UserInterface[i].color);        
    }    
    
    for (const key in Input) 
    {        
        Input[key].keyUp = false;
        Input[key].keyDown = false;       
    }

    rID = requestAnimationFrame(gameUpdate);       
}

