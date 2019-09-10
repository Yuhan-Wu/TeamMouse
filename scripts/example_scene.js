class ExampleScene extends Phaser.Scene{
    constructor(config) {
        super({key: 'ExampleScene'});


	}

	preload()
	{
		this.scene.launch('GameUI');
		this.uiOverlay = this.scene.get('GameUI');
		this.highScore = 0; //TODO: Add to high score whenever you jump over a cat (For Tuesday)
	}

    create()
    {
        //this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        this.ladders.create(250, 704, 'ladder');
		this.ladders.create(100, 604, 'ladder');
		this.ladders.create(399, 604, 'ladder');
		this.ladders.create(699, 704, 'ladder');
		this.ladders.create(250, 504, 'ladder');
		this.ladders.create(649, 504, 'ladder');
		this.ladders.create(100, 404, 'ladder');
		this.ladders.create(330, 404, 'ladder');
		this.ladders.create(524, 404, 'ladder');
		this.ladders.create(160, 304, 'ladder');
		this.ladders.create(649, 304, 'ladder');
		this.ladders.create(300, 204, 'ladder');
		this.ladders.create(500, 204, 'ladder');



		
        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
			ladder.displayHeight = 101;
			ladder.displayWidth = 50;
        },this);
		
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(398, 785, 'ground').setScale(2).refreshBody();
		
		let plat = this.platforms.create(100, 660, 'ground');
		plat.displayWidth = 250;
		plat.displayHeight = 10;

		plat = this.platforms.create(475, 660, 'ground');
		plat.displayWidth = 400;
		plat.displayHeight = 10;

		plat = this.platforms.create(250, 560, 'ground');
		plat.displayWidth = 250;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(550, 560, 'ground');
		plat.displayWidth = 250;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(100, 460, 'ground');
		plat.displayWidth = 250;
		plat.displayHeight = 10;

		plat = this.platforms.create(450, 460, 'ground');
		plat.displayWidth = 350;
		plat.displayHeight = 10;

		plat = this.platforms.create(750, 460, 'ground');
		plat.displayWidth = 150;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(750, 460, 'ground');
		plat.displayWidth = 150;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(215, 360, 'ground');
		plat.displayWidth = 180;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(428, 360, 'ground');
		plat.displayWidth = 144;
		plat.displayHeight = 10;

		plat = this.platforms.create(613, 360, 'ground');
		plat.displayWidth = 125;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(405, 260, 'ground');
		plat.displayWidth = 439;
		plat.displayHeight = 10;
		
		plat = this.platforms.create(400, 160, 'ground');
		plat.displayWidth = 150;
		plat.displayHeight = 10;

		Phaser.Actions.Call(this.platforms.getChildren(), function (platform) {
			platform.refreshBody();
        },this);

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:700
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

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
		this.uiOverlay.updateMouseLives(this.mouse.lives);

		//Lose condition
		if (this.mouse.lives <= 0)
		{
			this.scene.launch('GameOverScene');
			this.scene.pause();
		}

		//Win condition
		var highestPlat = 160;
		if (this.mouse.y <= highestPlat - 30)
		{
			//TODO: transition to the next level, play any animations
			this.scene.launch('GameOverScene');
			this.scene.pause();
		}

		this.uiOverlay.updateHighScore(this.highScore); //TODO: use a HighScore text class to store and update high score
    }

	
}