var friction = 0.8;                 
var gravity = 0.3;
const TERMINAL = 8;                 

player = new Object();

player.x = null;        
player.y = null;
player.width = 32;                  
player.height = 32;                 
player.image = new Image();
player.image.src = "Assets/carlos-ide/idle0.png";
player.health = 100;
player.speed = 4;
player.velX = 0;                    
player.velY = 0;                    
player.isJumping = false;   

player.poses = {};
player.poses['right'] = new Animation(['Assets/walkright0.png',
                                        'Assets/walkright1.png',
                                        'Assets/walkright2.png',
                                        'Assets/walkright3.png',
                                        'Assets/walkright4.png',
                                        'Assets/walkright5.png',
                                        'Assets/walkright6.png',
                                        'Assets/walkright7.png']);
player.poses['left'] = new Animation(['Assets/walkleft0.png',
                                      'Assets/walkleft1.png',
                                      'Assets/walkleft2.png',
                                      'Assets/walkleft3.png',
                                      'Assets/walkleft4.png',
                                      'Assets/walkleft5.png',
                                      'Assets/walkleft6.png',
                                      'Assets/walkleft7.png']);
player.poses['front'] = new Animation(['Assets/carlos-ide/idle0.png']);
player.currentPose='front';


player.draw = function()
{

    if (input.keysDown.size > 0)
    {
        var sprite = player.poses[player.currentPose];
        player.image = sprite.getImage();
    }
    renderer.ctx.drawImage( player.image, player.x, player.y, player.width, player.height ); 
};

player.isTouching = function( gameObject )
{ 
    return ( player.x <= (gameObject.x + 24) 
             && gameObject.x <= (player.x + 24)
             && player.y <= (gameObject.y + gameObject.height)
             && gameObject.y <= (player.y + player.height) ); 
};

player.move = function(x, y)
{
    /*Left/Right Movement*/

    // player holding left
    if (input.keysDown.has(37) && player.velX > -player.speed) 
    { 
        player.velX--; 
        player.currentPose = "left";
    }
    // player holding right
    if (input.keysDown.has(39) && player.velX < player.speed) 
    { 
        player.velX++;
        player.currentPose = "right";
    }
    player.velX *= friction;

    /*Jumping*/
    if ( (input.keysDown.has(38) || input.keysDown.has(32) ) && !player.isJumping) 
    { 
        player.isJumping = true;
        player.velY = -player.speed*2;
    }

    //Apply terminal velocity
    if (player.velY < TERMINAL)
    {
        player.velY += gravity;
    }

    //Check for collisons --> affects player velocity
    for (var i=0; i<scene.blocks.length; i++)
    {
        var block = scene.blocks[i];
        if (player.isTouching(block) )
        {
            //check for bottom collisions
            if (player.y+24 < block.y && player.velY >= 0)
            {
                player.isJumping = false;
                player.velY = 0;
            }
            //check for top collisions
            else if (player.y > block.y+24 && player.velY < 0)
            {
                player.velY = 0;
                player.y = block.y + 24 + 1
            }
            //check for left collisions
            if (player.x < block.x+32 && player.velX < 0 && Math.abs(block.y - player.y) < 8 )
            {
                player.velX = 0;
                player.x = block.x+32+1
            }

            //check for right collisions
            else if (player.x+32 > block.x && player.velX > 0 && Math.abs(block.y - player.y) < 8 )
            {
                player.velX = 0;
                player.x = block.x - 32 - 1
            }
        }
    }

    //Velocity affects player position
    player.x += player.velX ;
    player.y += player.velY;
};


