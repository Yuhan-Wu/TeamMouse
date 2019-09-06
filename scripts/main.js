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
				gravity: {y:400},
				debug: true
			}
		},
		scene:[InitializationScene,ExampleScene]
	};
	
	var game = new Phaser.Game(config);
}