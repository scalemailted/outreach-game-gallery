class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene,0,0,'player');
        let start = scene.map.findObject('items', obj => obj.name == 'start');
        this.x = start.x;
        this.y = start.y;
        this.setOrigin(0.5,1);
        this.depth = 1;
        this.speed = 200;
        
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.arrow_keys = scene.input.keyboard.addKeys('up,left,right');
    }
    
    move()
    {
        if (this.body === undefined)
        {
            return;
        }
        
        this.body.velocity.x = 0;
        
        if (this.arrow_keys.up.isDown && this.body.onFloor() )
        {
            this.body.velocity.y = -this.speed*2;
        }
        if (this.arrow_keys.left.isDown)
        {
            this.body.velocity.x = -this.speed;
        }
        if (this.arrow_keys.right.isDown)
        {
            this.body.velocity.x = this.speed;
        }
    }
}