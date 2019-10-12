const delay = ms => new Promise(res => setTimeout(res, ms));

class Vector2 
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

function GameObject (name, src, col)
{
    let sprite = new Image();
    sprite.src = src;
    this.sprite = sprite;
    this.pos = new Vector2(0, 0);

    this.name = name; 
    this.w = sprite.width;
    this.h = sprite.height;
    this.col = new BoxCollider(this.w, this.h);
    this.update = function(){return};

    //return GameObject;
}

function BoxCollider (w, h, offset, isColliding, colDir, collided)
{    
    this.w = 1;
    this.h = 1;
    this.offset = new Vector2(0,0);
    this.isColliding = false;
    
    this.collided = "";
    this.colDir = new Vector2(0,0);
}

function CheckAllColisions() 
{
    if (collisions.length > 1) 
    {
        for (let i = 0; i < collisions.length; i++) 
        {
            //move collisions
            collisions[i].col.offset.x = collisions[i].pos.x + collisions[i].col.offset.x;
            collisions[i].col.offset.y = collisions[i].pos.y + collisions[i].col.offset.y;
        }

        for (let A = 0; A < collisions.length; A++) 
        {
            //Check collisions
            for (let B = 0; B < collisions.length - 1; B++) 
            {
                if (A != B) 
                {
                    let colA = collisions[A];
                    let colB = collisions[B];
                    //collisions[A].col.isColliding = CheckColision(collisions[A].col, collisions[B].col);
                    
                    //A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.height + A.y > B.y
                    //A.y + A.height < B.y || A.y > B.y + B.height || A.x + A.width < B.x || A.x > B.x + B.width
                    //collisions[A].col.x < collisions[B].col.x + collisions[B].col.width && collisions[A].col.x + collisions[A].col.width > collisions[B].col.x && collisions[A].col.y < collisions[B].col.y + collisions[B].col.height && collisions[A].col.height + collisions[A].col.y > collisions[B].col.y
                    if (colB.pos.x > colA.col.w + colA.pos.x || colA.pos.x > colB.col.w + colB.pos.x || colB.pos.y > colA.col.h + colA.pos.y || colA.pos.y > colB.col.h + colB.pos.y) 
                    {
                        collisions[A].col.isColliding = false;         
                    }
                    else 
                    {                        
                        console.log("colision");

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
                        collisions[A].collided = collisions[B].name;
                        console.log(collisions[A].collided);                             
                    }
                }
            }            
        }        
    }
}

function RigidBody()
{

}