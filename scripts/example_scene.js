class ExampleScene extends Phaser.Scene{
    preload(){
        this.load.image('background', '../images/background.jpg');
        this.load.image('ground', '../images/platform.png');
        this.load.image('ladder', '../images/ladder.png');
        this.load.spritesheet('dude', '../images/dude.png', { frameWidth: 32, frameHeight: 48 });
    }

    create()
    {
        this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        this.ladders.create(400, 400, 'ladder');

        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);


        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 510, 'dude');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();


        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
            frameRate:10,
            repeat: -1
        });

        this.anims.create({
            key: 'leftStop',
            frames: [ {key: 'dude', frame: 5}],
            frameRate: 20
        });
        this.anims.create({
            key: 'rightStop',
            frames: [ {key: 'dude', frame: 0}],
            frameRate: 20
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
        });

        this.physics.add.collider(this.player, this.platforms);
    }

    update()
    {
        this.isOnLadder = false;
        this.isClimbing=false;
        this.physics.overlap(this.player,this.ladders,this.ladderCheck,null,this);

        if(this.isOnLadder)
        {
            if(this.cursors.up.isDown)
            {
                this.player.setVelocityY(-40);
                this.isClimbing=true;
            }
            else if(this.cursors.down.isDown)
            {
                this.player.setVelocityY(40);
                this.isClimbing=true;
            }
            else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
            {
                this.player.setGravity(0);
                this.player.setVelocityY(-5);
            }

        }
        else if(this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-200);
        }

        if(!this.isClimbing) {
            if (this.cursors.left.isDown) {
                this.lastDir = true;
                this.player.setVelocityX(-80);

                this.player.anims.play('left', true);
            } else if (this.cursors.right.isDown) {
                this.lastDir = false;
                this.player.setVelocityX(80);

                this.player.anims.play('right', true);
            } else {
                this.player.setVelocityX(0);
                if (this.lastDir == null || this.lastDir === false) {
                    this.player.anims.play('leftStop');

                } else {
                    this.player.anims.play('rightStop');
                }
            }
        }
    }

    ladderCheck()
    {
        this.isOnLadder = true;
    }
}