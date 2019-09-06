class Mouse extends Phaser.GameObjects.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.alive = true;
        this.anims.play('stand');
        this.isOnLadder=false;
        this.isClimbing=false;

        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.scene.physics.add.collider(this.body,this.scene.platforms);
    }

    update(cursors) {
        this.isOnLadder = false;
        this.scene.physics.overlap(this.body,this.scene.ladders,this.ladderCheck,null,this.scene);

        if(this.isOnLadder)
        {
            if(cursors.up.isDown)
            {
                this.body.velocity.y=-40;
                this.isClimbing=true;
            }
            else if(cursors.down.isDown)
            {
                this.body.velocity.y=40;
                this.isClimbing=true;
            }
            else if(!cursors.down.isDown && !cursors.up.isDown)
            {
                this.body.gravity.y=0;
                this.body.velocity.y=-5;
            }

        }
        else if(cursors.up.isDown && this.body.touching.down)
        {
            this.body.velocity.y=-200;
        }

        if(!this.isClimbing) {
            if (cursors.left.isDown) {
                this.lastDir = true;
                this.body.velocity.x=-80;

                this.anims.play('left', true);
            } else if (cursors.right.isDown) {
                this.lastDir = false;
                this.body.velocity.x=80;

                this.anims.play('right', true);
            } else {
                this.body.velocity.x=0;
                if (this.lastDir == null || this.lastDir === false) {
                    this.anims.play('leftStop');

                } else {
                    this.anims.play('rightStop');
                }
            }
        }
    }

    ladderCheck()
    {
        alert('success');
        this.isOnLadder = true;
    }

    attack(weapon,enemy){

    }

    hurtBy(enemy) {
    }

    die() {

    }
}
