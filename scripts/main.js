let platforms;

function load()
{
	let config = 
	{
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		physics:{
			default: 'arcade',
			arcade:
			{
				gravity: {y:300},
				debug: false
			}
		},
		scene:
		{
			preload: preload,
			create: create,
			update: update
		}
	};
	
	let game = new Phaser.Game(config);
	
}

function preload()
{
	this.load.image('background', '../images/background.jpg');
	this.load.image('ground', '../images/platform.png');
}

function create()
{
	this.add.image(400, 300, 'background');
	
	platforms = this.physics.add.staticGroup();
	
	platforms.create(400, 568, 'ground').setScale(2).refreshBody();
}

function update()
{
	
}
