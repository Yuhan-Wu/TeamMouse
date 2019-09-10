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

        this.life1 = this.add.image(75, 80, 'MarioSprite');
        this.life2 = this.add.image(100, 80, 'MarioSprite');
        this.life3 = this.add.image(125, 80, 'MarioSprite');


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
        this.livesScore = this.add.text(0, 30, ''+ 0, styleWhiteCenter);
        this.highScoreText = this.add.text(300, 30, "", styleWhiteCenter);

    }


    update(mouseLives)
    {
    }

    updateMouseLives(mouseLives)
    {
        if (mouseLives == 3)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(true);
            this.life3.setVisible(true);
        }
        else if (mouseLives == 2)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(true);
            this.life3.setVisible(false);
        }
        else if (mouseLives == 1)
        {
            this.life1.setVisible(true);
            this.life2.setVisible(false);
            this.life3.setVisible(false);
        }
        else if (mouseLives == 0)
        {
            this.life1.setVisible(false);
            this.life2.setVisible(false);
            this.life3.setVisible(false);
        }
        //this.livesText.setText('LIVES: ' + mouseLives);
    }

    updateHighScore(score)
    {
        this.highScoreText.setText(score);
    }




}