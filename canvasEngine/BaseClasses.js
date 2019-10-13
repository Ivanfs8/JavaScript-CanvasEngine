const delay = ms => new Promise(res => setTimeout(res, ms));

class Vector2 
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

class GameObject {
    constructor(name = "GameObject", src) {
        this.sprite = new Image();
        this.sprite.src = src;
        this.pos = new Vector2(0, 0);
        this.name = name;
        this.w = this.sprite.width;
        this.h = this.sprite.height;
        this.col = new BoxCollider(this.w, this.h);
        this.update = function () { return; };
        //return GameObject;
    }
}

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

function CheckAllColisions() 
{
    if (collisions.length > 1) 
    {
        for (let A = 0; A < collisions.length; A++) 
        {
            //Check collisions
            for (let B = 0; B < collisions.length; B++) 
            {
                if (A != B) 
                {
                    //let colA = collisions[A];
                    //let colB = collisions[B];
                    let xA = collisions[A].pos.x - collisions[A].w + collisions[A].col.offset.x;
                    let yA = collisions[A].pos.y - collisions[A].h + collisions[A].col.offset.y;
                    let wA = collisions[A].col.w;
                    let hA = collisions[A].col.h;
                    
                    let xB = collisions[B].pos.x - collisions[B].w + collisions[B].col.offset.x;
                    let yB = collisions[B].pos.y - collisions[B].h + collisions[B].col.offset.y;
                    let wB = collisions[B].col.w;
                    let hB = collisions[B].col.h;

                    //collisions[A].col.isColliding = CheckColision(collisions[A].col, collisions[B].col);
                    
                    //A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.height + A.y > B.y
                    //A.y + A.height < B.y || A.y > B.y + B.height || A.x + A.width < B.x || A.x > B.x + B.width
                    //collisions[A].col.x < collisions[B].col.x + collisions[B].col.width && collisions[A].col.x + collisions[A].col.width > collisions[B].col.x && collisions[A].col.y < collisions[B].col.y + collisions[B].col.height && collisions[A].col.height + collisions[A].col.y > collisions[B].col.y
                    if (xB > wA + xA || xA > wB + xB || yB > hA + yA || yA > hB + yB) 
                    {
                        collisions[A].col.isColliding = false;
                        collisions[A].col.collided = "";         
                    }
                    else 
                    {                        
                        //console.log("colision");

                        if (collisions[A].pos.x < collisions[B].pos.x) 
                        {
                            collisions[A].col.colDir.x = -1;
                        }
                        else if (collisions[A].pos.x > collisions[B].pos.x) 
                        {
                            collisions[A].col.colDir.x = 1;
                        }

                        if (collisions[A].pos.y < collisions[B].pos.x) 
                        {
                            collisions[A].col.colDir.y = -1;
                        }
                        else if (collisions[A].pos.y > collisions[B].pos.y) 
                        {
                            collisions[A].col.colDir.y = 1;
                        }

                        collisions[A].col.isColliding = true;
                        collisions[A].col.collided = collisions[B].name;
                        //console.log(collisions[A].col.isColliding + " " + collisions[A].col.collided);                             
                    }
                }
            }            
        }        
    }
}

function RigidBody()
{

}