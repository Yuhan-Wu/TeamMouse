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
		
        ladd = this.ladders.create(200, 265, 'ladder');
		ladd.displayHeight = 181;
		
		ladd = this.ladders.create(600, 265, 'ladder');
		ladd.displayHeight = 181;

        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);
		
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(398, 568, 'ground').setScale(2).refreshBody();
		let platform = this.platforms.create(283, 360, 'ground');
		platform.displayWidth = 200;
		platform.displayHeight = 10;
		platform.refreshBody();
		
		platform = this.platforms.create(517, 360, 'ground');
		platform.displayWidth = 200;
		platform.displayHeight = 10;
		platform.refreshBody();
		
		platform = this.platforms.create(85, 180, 'ground');
		platform.displayWidth = 200;
		platform.displayHeight = 10;
		platform.refreshBody();
		
		platform = this.platforms.create(716, 180, 'ground');
		platform.displayWidth = 200;
		platform.displayHeight = 10;
		platform.refreshBody();



        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:510
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
    }
	
}