class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene,325,235,'player');
        this.depth = 1;
        this.speed = 750;
        
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setCollideWorldBounds(true);
        
        this.arrow_keys = scene.input.keyboard.addKeys('up,down,left,right');
    }
    move()
    {
     this.body.velocity.x=0;
     this.body.velocity.y=0;
     if(this.arrow_keys.up.isDown)
     {
         this.body.velocity.y = -this.speed;
     }
     if(this.arrow_keys.down.isDown)
     {
         this.body.velocity.y = this.speed;
     }
     if(this.arrow_keys.left.isDown)
     {
         this.body.velocity.x = -this.speed;
     }
     if(this.arrow_keys.right.isDown)
     {
         this.body.velocity.x = this.speed;
     }
    }
    
}