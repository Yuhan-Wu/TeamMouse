class GameUI extends Phaser.Scene{

    constructor(config) {
        super({key: 'GameUI'});

    }

    preload() {
    }


    create() {


        //Sets BG to black
        //this.cameras.main.setBackgroundColor('#000000');

        var graphics = this.add.graphics();
        var uiRect = new Phaser.Geom.Rectangle(0, 0, 800, 100);
        graphics.fillStyle(0x000000, 1);
        graphics.fillRectShape(uiRect);

        var styleRedCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'Red',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,
        }

        var styleWhiteCenter = {
            fontFamily: 'ArcadeClassic',
            fill: 'White',
            fontSize: 'xx-large',
            align: 'center',
            fixedWidth: 200,
        }

        this.add.text(0, 0, '1UP', styleRedCenter);
        this.add.text(300, 0, 'HIGH SCORE', styleRedCenter);
        this.livesText = this.add.text(0, 45, 'LIVES: ' + 0, styleWhiteCenter);
        this.highScoreText = this.add.text(300, 45, "", styleWhiteCenter);

    }


    update(mouseLives)
    {
    }

    updateMouseLives(mouseLives)
    {
        this.livesText.setText('LIVES: ' + mouseLives);
    }

    updateHighScore(score)
    {
        this.highScoreText.setText(score);
    }




}