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
        this.col = [new BoxCollider(this.w, this.h)];
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

function boxCollisions(a, b)
{
    for (let i = 0; i < a.col.length; i++) 
    {
        let A1 = new Vector2( (a.pos.x + a.col[i].offset.x) - a.col[i].w * 0.5, (a.pos.y + a.col[i].offset.y) - a.col[i].h * 0.5);
        let A2 = new Vector2( (a.pos.x + a.col[i].offset.x) + a.col[i].w * 0.5, (a.pos.y + a.col[i].offset.y) + a.col[i].h * 0.5);

        let B1 = new Vector2( (b.pos.x + b.col[0].offset.x) - b.col[0].w * 0.5, (b.pos.y + b.col[0].offset.y) - b.col[0].h * 0.5);
        let B2 = new Vector2( (b.pos.x + b.col[0].offset.x) + b.col[0].w * 0.5, (b.pos.y + b.col[0].offset.y) + b.col[0].h * 0.5);

        if (A1.x < B2.x &&
            A2.x > B1.x &&
            A1.y < B2.y &&
            A2.y > B1.y) {

            a.col[i].isColliding = true;
            a.col[i].collided = b.name;

            ctx.beginPath();
            ctx.rect(A1.x, A1.y, a.col[i].w, a.col[i].h);
            ctx.strokeStyle = "green";
            ctx.stroke();
            ctx.closePath();
            //return true;
        }
        else {
            a.col[i].isColliding = false;
            a.col[i].collided = "";

            ctx.beginPath();
            ctx.rect(A1.x, A1.y, a.col[i].w, a.col[i].h );
            ctx.strokeStyle = "red";
            ctx.stroke();
            ctx.closePath();            
            //return false;
        }

    }
}

function CheckAllColisions() 
{
    if (collisions.length > 0) 
    {
        for (let A = 0; A < collisions.length; A++) 
        {
            let xA = collisions[A].pos.x - collisions[A].w*0.5 + collisions[A].col.offset.x;
            let yA = collisions[A].pos.y + collisions[A].h*0.5 + collisions[A].col.offset.y;
            let wA = collisions[A].col.w;
            let hA = collisions[A].col.h;
            //Check collisions
            for (let B = 0; B < collisions.length; B++) 
            {
                if (A != B)
                {
                    //let colA = collisions[A];
                    //let colB = collisions[B];                    
                    
                    let xB = collisions[B].pos.x - collisions[B].w*0.5 + collisions[B].col.offset.x;
                    let yB = collisions[B].pos.y - collisions[B].h*0.5 + collisions[B].col.offset.y;
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
                        collisions[A].col.colDir.x = 0;
                        collisions[A].col.colDir.y = 0;
                    }
                    else 
                    {
                        xA = collisions[A].pos.x + collisions[A].col.offset.x;
                        yA = collisions[A].pos.y + collisions[A].col.offset.y;
                        xB = collisions[B].pos.x + collisions[B].col.offset.x;
                        yB = collisions[B].pos.y + collisions[B].col.offset.y;

                        let A1 = new Vector2(xA - wA*0.5, yA + hA *0.5);
                        let A2 = new Vector2(xA + wA*0.5, yA + hA *0.5);
                        let A3 = new Vector2(xA + wA*0.5, yA - hA *0.5);
                        let A4 = new Vector2(xA - wA*0.5, yA - hA *0.5);

                        let B1 = new Vector2(xB - wB*0.5, yB + hB *0.5);
                        let B2 = new Vector2(xB + wB*0.5, yB + hB *0.5);
                        let B3 = new Vector2(xB + wB*0.5, yB - hB *0.5);
                        let B4 = new Vector2(xB - wB*0.5, yB - hB *0.5);
                        //console.log("colision");

                        if (A2.x >= B1.x && A2.y <= B1.y && A3.x >= B4.x && A3.y >= B4.y && xA-wA*0.5 < xB-wB*0.5) 
                        {
                            //console.log("izquierda")
                            collisions[A].col.colDir.x = -1;
                        }
                        else if (A1.x <= B2.x && A1.y <= B2.y && A4.x <= B3.x && A4.y >= B3.y && xA+wA*0.5 > xB+wB*0.5) 
                        {
                            //console.log("derecha")
                            collisions[A].col.colDir.x = 1;
                        }
                        else
                        {
                            collisions[A].col.colDir.x = 0;
                        }

                        if (A4.x >= B1.x && A4.y <= B1.y && A3.x <= B2.x && A3.y <= B2.y && yA+hA*0.5 > yB+hB*0.5) 
                        {
                            //console.log("arriba")
                            collisions[A].col.colDir.y = 1;
                        }
                        else if (A1.x >= B4.x && A1.y >= B4.y && A2.x <= B3.x && A2.y >= B3.y && yA-hA*0.5 < yB-hB*0.5) 
                        {
                            //console.log("abajo")
                            collisions[A].col.colDir.y = -1;
                        }
                        else
                        {
                            collisions[A].col.colDir.y = 0;
                        }

                        collisions[A].col.isColliding = true;
                        collisions[B].col.isColliding = true;
                        collisions[A].col.collided = collisions[B].name;
                        console.log(collisions[A].name + "x" + collisions[B].name);
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