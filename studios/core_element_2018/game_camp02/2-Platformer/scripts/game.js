var config = {
    type: Phaser.CANVAS,
    width: 32 * 24,
    height: 32 * 16,
    pixelArt: true,
    scene: [ Level1 ],
    physics: { default: 'arcade' }
};

var game = new Phaser.Game(config);