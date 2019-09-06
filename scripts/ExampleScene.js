class ExampleScene extends Phaser.Scene {
    constructor(){
        super({key:"ExampleScene"});
    }

    //load your assets
    preload(){
        this.load.image('background','../images/background.jpg');
        this.load.image('grassland','../images/example_platform.png');
        this.load.image('zelda','../images/linku.png');

        //add platforms

    }

    create(){
        //number should be the center of this picture
        this.image=this.add.image(450,300,'background');

        this.platforms=this.physics.add.staticGroup();
        this.platforms.create(450,400,'grassland');

        this.player=this.physics.add.sprite(300,550,'zelda');
        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);
    }

}