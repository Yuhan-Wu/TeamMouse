class Mouse extends Phaser.Physics.Arcade.Sprite {

    //TODO change anything you want, but remeber to inform us all of new interfaces
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

        this.alive = true;
        this.anims.play('stand');
		this.isOnLadder = false;
        this.isClimbing = false;
		this.lastPosition = 0;
		this.snapTo = null;

		//Mouse lives
		this.lives = 3;
		
		this.body.setSize(50, 62);

		this.originalWidth = this.body.width;
		this.body.setSize(this.body.width + 2, this.body.height);

        this.cursors = this.scene.input.keyboard.createCursorKeys();
    }

    update(cursors) {
		this.cursors = cursors;
		if(!this.isClimbing)
		{
			this.normalMovement();
		}
		
		if(this.isClimbing)
		{
			this.climbingMovement();
		}
    }
	
	normalMovement()
	{
		this.body.allowGravity = true;
		if (this.cursors.left.isDown)
		{
			this.lastDir = true;
			this.body.velocity.x = -80;

			this.anims.play('left', true);
		}
		else if (this.cursors.right.isDown)
		{
			this.lastDir = false;
			this.body.velocity.x = 80;

			this.anims.play('right', true);
		}
		else
		{
			this.body.velocity.x = 0;
			if (this.lastDir == null || this.lastDir === false)
			{
				this.anims.play('leftStop');

			}
			else
			{
				this.anims.play('rightStop');
			}
		}

		if(this.isOnLadder && this.body.velocity.y == 0)
		{
			if(this.cursors.up.isDown)
			{
				//Offset the player's position, to check if we're at the top of a ladder.
				this.body.position.y -= 2;
				if(this.scene.physics.overlap(this.scene.mouse, this.scene.ladders))
				{
					this.body.position.x = this.snapTo;
					this.body.velocity.x = 0;
					this.isClimbing = true;
				}
				else
				{
					this.body.velocity.y = -150;
				}
				this.body.position.y += 2;
			}
			else if(this.cursors.down.isDown)
			{
				this.body.position.x = this.snapTo;
				this.body.velocity.x = 0;
				this.isClimbing = true;
			}
		}
		//Otherwise, we can jump
		else if(this.cursors.up.isDown && this.body.touching.down && this.body.velocity.y == 0)
		{
			this.body.velocity.y = -150;
		}
	}
	
	climbingMovement()
	{
		this.body.allowGravity = false;
		this.body.setSize(this.originalWidth, this.body.height);
		if(this.cursors.up.isDown)
		{
			this.body.velocity.y = -80;
		}
		else if(this.cursors.down.isDown)
		{
			this.body.velocity.y = 80;
		}
		else if(!this.cursors.down.isDown && !this.cursors.up.isDown)
		{		
			this.body.velocity.y = 0;
		}


		if (this.lastDir == null || this.lastDir === false)
		{
			this.anims.play('leftStop');

		}
		else
		{
			this.anims.play('rightStop');
		}
	}

    attack(weapon,enemy){

    }

    //Takes damage from an enemy
    hurtBy(enemy) {
    	this.lives -= 1;
    	if (this.lives <= 0)
    		this.alive = false;
    }

    //Probably play a death animation
    die() {
    }
	
	climbOff()
	{
		this.isClimbing = false;
		this.body.setSize(this.originalWidth + 2, this.body.height);
	}
	
	saveLadderPos(object1, object2)
	{
		object1.snapTo = object2.body.position.x;
	}
}
