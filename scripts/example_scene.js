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
        this.ladders.create(400, 509, 'ladder');
        Phaser.Actions.Call(this.ladders.getChildren(), function (ladder) {
            ladder.body.allowGravity = false;
        },this);

        this.grounds=this.physics.add.staticGroup();
        this.grounds.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms = this.physics.add.staticGroup();
		this.platforms.create(625, 435, 'ground');
		this.platforms.create(175,435,'ground');

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:100,
            y:510
        });
        this.mouse.body.collideWorldBounds=true;

        this.cursors = this.input.keyboard.createCursorKeys();

		let that = this;

		this.physics.add.collider(this.mouse,this.grounds);
		// this.physics.add.collider(this.mouse,this.platforms, () =>{
		// 	if(that.mouse.isClimbing)
		// 	{
			    // that.mouse.body.x=400;
				// if(that.mouse.body.touching.up)
				// {
				// 	that.mouse.body.position.y -= 75;
				// }
				// else
				// {
				// 	that.mouse.isClimbing = false;
				// 	that.mouse.body.allowGravity = true;
				// }
			// }
		// });

    }

    update()
    {
		let that = this;
		this.mouse.isOnLadder = false;
		this.physics.overlap(this.mouse,this.ladders,(d) => {
			that.mouse.isOnLadder = true;
		});
        this.mouse.update(this.cursors);
    }
	
}