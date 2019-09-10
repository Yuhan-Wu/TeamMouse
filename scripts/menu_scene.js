class MenuScene extends Phaser.Scene{

    constructor(test) {
        super({
            key: 'MenuScene'
        });
    }

    preload() {
        this.load.image('background', '../images/background.jpg');
    }


    create() {

        //Sets BG to black
        this.cameras.main.setBackgroundColor('#000000');

        //Style for red centered text on screen
        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,

        }

        //Style for blue centered text on screen
        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 400,

        }

        //Style  for blue left-justified text on screen
        var styleBlueLeft = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
        }

        //Adds menu text to the screen
        this.add.text(0, 0, '1UP', styleRedCenter);
        this.add.text(300, 0, 'HIGH SCORE', styleRedCenter);
        this.add.text(200, 115, 'PRESS  ENTER  TO  START', styleBlueCenter);
        this.add.text(200, 150, 'PLAYER     COIN', styleBlueCenter);
        this.add.text(0, 350, 'RANK   SCORE   NAME', styleBlueLeft);
        this.add.text(200, 200, '1      ' + 0, styleBlueCenter);


        this.input.keyboard.on('keydown-ENTER', () => {
            this.scene.start('InitializationScene');
        });
    }

    /*
    update()
    {
        var styleBlueCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'DeepSkyBlue',
            fontSize: 'xx-large',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
        }

        function addCoin()
        {
            numCoins = numCoins + 1;
        }




        this.input.keyboard.on('keydown-S', addCoin);

    }
    */



}