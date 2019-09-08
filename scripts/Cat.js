class Cat extends Phaser.Physics.Arcade.Sprite{
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.anims.play('stand');
        this.isOnLadder = false;
        this.isClimbing = false;

        this.originalWidth = this.body.width;
        this.body.setSize(this.body.width + 2, this.body.height);
    }

    update(){

    }
}
