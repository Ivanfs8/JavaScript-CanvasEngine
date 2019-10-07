const delay = ms => new Promise(res => setTimeout(res, ms));

class Vector2 
{
    constructor(x,y)
    {
        this.x = x;
        this.y = y;
    }
}

class GameObject 
{
    constructor(sprite = new Image(), position = new Vector2(), width, height, collider = new Collider(position.x, position.y, width, height), update)
    {
        this.type = "GameObject";
        this.sprite = sprite;
        this.position = new Vector2();
        this.width = width;
        this.height = height;
        //this.start = start;
        this.update = update;

        this.collider = collider;
    }

}

class Collider 
{
    constructor(x = Number, y = Number, width = Number, height = Number, isColliding = false, collisionDirection = new Vector2 (0,0), collided = null)
    {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.isColliding = isColliding;
        this.collided = collided;
        this.collisionDirection = collisionDirection
    }
}

function CheckColision() 
{
    if (collisions.length > 1) 
    {
        for (let i = 0; i < collisions.length; i++) 
        {
            //move collisions
            collisions[i].collider.x = collisions[i].position.x;
            collisions[i].collider.y = collisions[i].position.y;
        }

        for (let A = 0; A < collisions.length; A++) 
        {
            //Check collisions
            for (let B = 0; B < collisions.length - 1; B++) 
            {
                if (A != B) 
                {
                    //collisions[A].collider.isColliding = CheckColision(collisions[A].collider, collisions[B].collider);
                    
                    //A.x < B.x + B.width && A.x + A.width > B.x && A.y < B.y + B.height && A.height + A.y > B.y
                    //A.y + A.height < B.y || A.y > B.y + B.height || A.x + A.width < B.x || A.x > B.x + B.width
                    if (collisions[A].collider.x < collisions[B].collider.x + collisions[B].collider.width && collisions[A].collider.x + collisions[A].collider.width > collisions[B].collider.x && collisions[A].collider.y < collisions[B].collider.y + collisions[B].collider.height && collisions[A].collider.height + collisions[A].collider.y > collisions[B].collider.y) 
                    {
                        console.log("colision");

                        if (collisions[A].collider.x < collisions[B].collider.x) 
                        {
                            collisions[A].collider.collisionDirection.x = -1;
                        }
                        else if (collisions[A].collider.x > collisions[B].collider.x) 
                        {
                            collisions[A].collider.collisionDirection.x = 1;
                        }

                        if (collisions[A].collider.y < collisions[B].collider.x) 
                        {
                            collisions[A].collider.collisionDirection.y = -1;
                        }
                        else if (collisions[A].collider.y > collisions[B].collider.y) 
                        {
                            collisions[A].collider.collisionDirection.y = 1;
                        }

                        collisions[A].collider.isColliding = true;
                        collisions[A].collided = toString(collisions[B]); //no funca                       
                    }
                    else 
                    {
                        collisions[A].collider.isColliding = false;
                    }
                }
            }            
        }        
    }
}