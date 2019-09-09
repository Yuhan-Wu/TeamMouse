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
		scene:[MenuScene,InitializationScene, ExampleScene, GameUI]

	};
	var game = new Phaser.Game(config);
}