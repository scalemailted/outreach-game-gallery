class Player extends Phaser.Physics.Arcade.Sprite
{
    constructor(scene)
    {
        super(scene,0,0,'player');
        var start = scene.map.findObject('items', obj => obj.name ==='player');
        this.x = start.x;
        this.y = start.y;
        this.depth = 1;
        this.speed = 200;
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.arrow_keys = scene.input.keyboard.addKeys('up,left,right');
        
        this.setup_animations(scene);
    }
    
    move()
    {
        var move_animation = 'idle';
        
        if(this.body === undefined)
            return;
        this.body.velocity.x = 0;
        
        if(this.arrow_keys.up.isDown && this.body.onFloor())
        {
            this.body.velocity.y = -this.speed * 2;
        }
        if(this.arrow_keys.left.isDown)
        {
            this.body.velocity.x = -this.speed;
            move_animation = 'left';
        }
        if(this.arrow_keys.right.isDown)
        {
            this.body.velocity.x = this.speed;
            move_animation = 'right';
        }
        this.anims.play(move_animation, true);
    }
    
    setup_animations(scene)
    {
        var idle = new Object();
        idle.key = 'idle'
        idle.frameRate = 0;
        idle.frames = {start: 0, end: 0};
        scene.anims.create({
            key: 'idle',
            frames: scene.anims.generateFrameNumbers('player',{start: 0, end: 0 }),
            frameRate: 6
        }); 
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers('player',{start: 4, end: 6 }),
            frameRate: 6
        });
        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers('player',{start: 1, end: 3 }),
            frameRate: 6
        });
    }
    
}