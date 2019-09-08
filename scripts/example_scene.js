class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
    }

    create()
    {
        //TODO after colliding with another platform, this should be set to false

        // this.isClimbing=false;

        this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        let ladd = this.ladders.create(400, 445, 'ladder');
		ladd.displayHeight = 181;
        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);
		
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(398, 568, 'ground').setScale(2).refreshBody();
		let platform = this.platforms.create(283, 372, 'ground');
		platform.displayWidth = 200;
		platform.refreshBody();
		platform = this.platforms.create(517, 372, 'ground');
		platform.displayWidth = 200;
		platform.refreshBody();

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:510
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        //     frameRate:10,
        //     repeat: -1
        // });
        //
        // this.anims.create({
        //     key: 'leftStop',
        //     frames: [ {key: 'dude', frame: 5}],
        //     frameRate: 20
        // });
        // this.anims.create({
        //     key: 'rightStop',
        //     frames: [ {key: 'dude', frame: 0}],
        //     frameRate: 20
        // });
        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        //     frameRate: 10,
        //     repeat: -1
        // });
		let that = this;

		this.physics.add.collider(this.mouse,this.platforms, (d) =>
	    {
			that.mouse.climbOff();
		});

    }

    update()
    {
		let that = this;
		if(this.physics.overlap(this.mouse,this.ladders, this.mouse.saveLadderPos))
		{
			this.mouse.isOnLadder = true;
		}
		else
		{
			this.mouse.isOnLadder = false;

			this.mouse.snapTo = null;
			this.mouse.climbOff();
		}
        this.mouse.update(this.cursors);
    //     this.isOnLadder = false;
    //     this.physics.overlap(this.player,this.ladders,this.ladderCheck,null,this);
    //
    //     if(this.isOnLadder)
    //     {
    //         if(this.cursors.up.isDown)
    //         {
    //             this.player.setVelocityY(-40);
    //             this.isClimbing=true;
    //         }
    //         else if(this.cursors.down.isDown)
    //         {
    //             this.player.setVelocityY(40);
    //             this.isClimbing=true;
    //         }
    //         else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
    //         {
    //             this.player.setGravity(0);
    //             this.player.setVelocityY(-5);
    //         }
    //
    //     }
    //     else if(this.cursors.up.isDown && this.player.body.touching.down)
    //     {
    //         this.player.setVelocityY(-200);
    //     }
    //
    //     if(!this.isClimbing) {
    //         if (this.cursors.left.isDown) {
    //             this.lastDir = true;
    //             this.player.setVelocityX(-80);
    //
    //             this.player.anims.play('left', true);
    //         } else if (this.cursors.right.isDown) {
    //             this.lastDir = false;
    //             this.player.setVelocityX(80);
    //
    //             this.player.anims.play('right', true);
    //         } else {
    //             this.player.setVelocityX(0);
    //             if (this.lastDir == null || this.lastDir === false) {
    //                 this.player.anims.play('leftStop');
    //
    //             } else {
    //                 this.player.anims.play('rightStop');
    //             }
    //         }
    //     }
    }
	
}