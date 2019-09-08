import { Scene } from 'phaser'

class menu_scene extends  Scene {
    constructor() {
        super('menu')
    }

    preload() {
        this.load.image('background', 'images/background.jpg')
    }

    create() {
        this.add.image(400, 300, 'background')
        this.input.on('pointerdown', () => this.scene.start('InitializationScene'))

    }
}

export default  menu_scene