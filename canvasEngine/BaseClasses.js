const delay = ms => new Promise(res => setTimeout(res, ms));

class Vector2 
{
    constructor(x = 0, y = 0)
    {
        this.x = x;
        this.y = y;
    }
}

class GameObject {
    constructor(name = "GameObject", src) {
        this.gameObject = 0;
        this.sprite = new Image();
        this.sprite.src = src;
        this.pos = new Vector2(0, 0);
        this.name = name;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.col = [new BoxCollider(this.w, this.h)];
        this.rb = new RigidBody("Static");

        this.start = function() { return; };
        this.update = function() { return; };
        //return GameObject;
    }
}

function Destroy(toDestroy){
    toDestroy = toDestroy.gameObject;
    gameObjects = gameObjects.filter(k => k.gameObject != toDestroy);
    //gameObjects.slice(toRemove, 1);
};

class BoxCollider {
    constructor(w, h, x = 0, y = 0) {
        this.w = w;
        this.h = h;
        this.offset = new Vector2(0, 0);
        this.offset.x = x;
        this.offset.y = y;
        this.isColliding = false;
        this.collided = "";
        this.colDir = new Vector2(0, 0);
        this.debug = false;
    }
}

function boxCollisions(a, b)
{
    for (let i = 0; i < a.col.length; i++) 
    {
        let A1 = new Vector2( (a.pos.x + a.col[i].offset.x) - a.col[i].w * 0.5, (a.pos.y + a.col[i].offset.y) - a.col[i].h * 0.5);
        let A2 = new Vector2( (a.pos.x + a.col[i].offset.x) + a.col[i].w * 0.5, (a.pos.y + a.col[i].offset.y) + a.col[i].h * 0.5);

        let B1 = new Vector2( (b.pos.x + b.col[0].offset.x) - b.col[0].w * 0.5, (b.pos.y + b.col[0].offset.y) - b.col[0].h * 0.5);
        let B2 = new Vector2( (b.pos.x + b.col[0].offset.x) + b.col[0].w * 0.5, (b.pos.y + b.col[0].offset.y) + b.col[0].h * 0.5);

        if (A1.x < B2.x && A2.x > B1.x &&
            A1.y < B2.y && A2.y > B1.y) 
        {
            a.col[i].isColliding = true;
            a.col[i].collided = b;

            if(a.col[i].debug)
            {
                ctx.beginPath();
                ctx.rect(A1.x, A1.y, a.col[i].w, a.col[i].h);
                ctx.strokeStyle = "green";
                ctx.stroke();
                ctx.closePath();
            }
            
            //return true;
        }
        else {
            a.col[i].isColliding = false;
            a.col[i].collided = "";

            if(a.col[i].debug)
            {
                ctx.beginPath();
                ctx.rect(A1.x, A1.y, a.col[i].w, a.col[i].h);
                ctx.strokeStyle = "red";
                ctx.stroke();
                ctx.closePath();
            }
                        
            //return false;
        }
    }
}

function SweepAABB(a, b /*, normalX, normalY*/) 
{
    let normalX, normalY

    let b1 = 
    {
        x : (a.pos.x + a.col[0].offset.x) - a.col[0].w * 0.5,
        y : (a.pos.y + a.col[0].offset.y) - a.col[0].h * 0.5,
        w : a.col[0].w,
        h : a.col[0].h,
        vx : a.rb.vel.x,
        vy : a.rb.vel.y
    }

    let b2 = 
    {
        x : (b.pos.x + b.col[0].offset.x) - b.col[0].w * 0.5,
        y : (b.pos.y + b.col[0].offset.y) - b.col[0].h * 0.5,
        w : b.col[0].w,
        h : b.col[0].h,
        vx : b.rb.vel.x,
        vy : b.rb.vel.y
    }

    let invEntry = new Vector2()
    let invExit = new Vector2()

    if (b1.vx > 0)
    {
        invEntry.x = b2.x - (b1.x + b1.w)
        invExit.x = (b2.x + b2.w) - b1.x
    } 
    else 
    {
        invEntry.x = (b2.x + b2.w) - b1.x;
        invExit.x = b2.x - (b1.x + b1.w)
    }

    if (b1.vy > 0)
    {
        invEntry.y = b2.y - (b1.y + b1.h);
        invExit.y = (b2.y + b2.h) - b1.y;
    }
    else
    {
        invEntry.y = (b2.y + b2.h) - b1.y;
        invExit.y = b2.y - (b1.y + b1.h);
    }

    let Entry = new Vector2()
    let Exit = new Vector2()

    if (b1.vx == 0)
    {
        Entry.x = -Infinity
        Exit.x = Infinity
    }
    else
    {
        Entry.x = invEntry.x / b1.vx;
        Exit.x = invExit.x / b1.vx;
    }

    if (b1.vy == 0)
    {
        Entry.y = -Infinity;
        Exit.y = Infinity;
    }
    else
    {
        Entry.y = invEntry.y / b1.vy;
        Exit.y = invExit.y / b1.vy;
    }

    let entryTime = Math.max(Entry.x, Entry.y);
    let exitTime = Math.min(Exit.x, Exit.y);

    if (entryTime > exitTime || Entry.x < 0 && Entry.y < 0 || Entry.x > 1 || Entry.y > 1)
    {
        normalX = 0;
        normalY = 0;
        a.col[0].isColliding = false;
        a.col[0].collided = ""
        a.col[0].colDir = new Vector2 (0, 0)      
    }
    else //hubo colision
    {
        if (Entry.x > Entry.y) //calcular normal
        {
            if (invEntry.x < 0) 
            {
                normalX = 1
                normalY = 0
            }
            else 
            {
                normalX = -1
                normalY = 0
            }
        }
        else
        {
            if(invEntry.y < 0)
            {
                normalX = 0
                normalY = 1
            }
            else
            {
                normalX = 0
                normalY = -1
            }
        }

        //return entryTime
        a.col[0].isColliding = true;
        a.col[0].collided = b
        a.col[0].colDir = new Vector2 (normalX, normalY)
        console.log(a.col[0].colDir.x + " " + a.col[0].colDir.y)
        
        //console.log(normalX + ", " + normalY + ". EntryTime: " + entryTime + ", V: " + b1.vx + ", " + b1.vy)   

        b1.x += (b1.vx * -1) * entryTime 
        b1.y += (b1.vy * -1) * entryTime

        a.pos = new Vector2(b1.x - a.col[0].offset.x + a.col[0].w * 0.5, b1.y - a.col[0].offset.y + a.col[0].h * 0.5)
        
        let remainingTime = 1 - entryTime

        if(a.rb.type == "Deflect")
        {
            a.rb.vel.x *= remainingTime
            a.rb.vel.y *= remainingTime
            if (Math.abs(normalX) > 0.0001)
            {
                a.rb.vel.x = -a.rb.vel.x
            }
            if (Math.abs(normalY) > 0.0001)
            {
                a.rb.vel.y = -a.rb.vel.y
            }
        }

        if(a.rb.type == "Push")
        {
            let magnitude = Math.sqrt( (b1.vx * b1.vx + b1.vy * b1.vy) ) * remainingTime
            let dotprod = b1.vx * normalY + b1.vy * normalX
            if(dotprod > 0)
            {
                dotprod = 1
            }
            else if (dotprod < 0)
            {
                dotprod = -1
            }

            a.rb.vel.x = dotprod * normalY * magnitude
            a.rb.vel.y = dotprod * normalX * magnitude
        }

        if(a.rb.type == "Slide")
        {
            let dotprod = (b1.vx * normalY + b1.vy * normalX) * remainingTime
            a.rb.vel.x = dotprod * normalY
            a.rb.vel.y = dotprod * normalX
        }
    }
}

var Gravity = 10;

class RigidBody
{
    constructor(type = "Static", x = 0, y = 0, gMult = 1)
    {
        this.type = type;
        this.vel = new Vector2(x, y);
        this.gMult = gMult;
    }
}

function physicsUpdate() 
{
    for (let i = 0; i < gameObjects.length; i++) 
    {
        if(gameObjects[i].rb != null || gameObjects[i].rb != undefined)
        {
            if(gameObjects[i].rb != "Static")
            {
                gameObjects[i].pos.y -= Gravity * gameObjects[i].rb.gMult;

                gameObjects[i].pos.x += gameObjects[i].rb.vel.x;
                gameObjects[i].pos.y += gameObjects[i].rb.vel.y;
            }
        }
    }
}

class TextObject {
    constructor(font = "12px Arial", align = "left", x = 0, y = 0)
    {
        this.font = font
        this.align = align
        this.pos = new Vector2(x, y)
        this.text = "";
    }
}