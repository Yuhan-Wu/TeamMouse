class StupidCat extends Cat{
    constructor(config){
        super(config);
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);

    }

}