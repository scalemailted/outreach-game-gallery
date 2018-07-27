var friction = 0.8;                 
var gravity = 0.3;
const TERMINAL = 8;                 

player = new Object();

player.x = null;        
player.y = null;
player.width = 32;                  
player.height = 32;                 
player.image = new Image();
player.image.src = "Assets/player_jump0.png";
player.health = 100;
player.speed = 4;
player.velX = 0;                    
player.velY = 0;                    
player.isJumping = false;   

player.poses = {};
player.poses['right'] = new Animation(["Assets/sprite_right0.png",
                                       "Assets/sprite_right1.png",
                                       "Assets/sprite_right2.png"]);
                                       
player.poses['left'] = new Animation (["Assets/sprite_0.png",
                                       "Assets/sprite_1.png",
                                       "Assets/sprite_0.png"]);
player.currentPose = 'right';                                       


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
        player.currentPose = 'left';
    }
    // player holding right
    if (input.keysDown.has(39) && player.velX < player.speed) 
    { 
        player.velX++;
        player.currentPose = 'right';
    }
    player.velX *= friction;

    /*Jumping*/
    if ( (input.keysDown.has(38) || input.keysDown.has(32) ) && !player.isJumping) 
    { 
        player.isJumping = true;
        player.velY = -player.speed*2;
        var audio=new Audio("Assets/sfx_movement_jump2.wav");
            console.log(audio);
            audio.play();
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


