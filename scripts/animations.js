function animations(scene) {
    let config = {
        key: 'left',
        frames: scene.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'leftStop',
        frames: [{key: 'dude', frame: 5}],
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'rightStop',
        frames: [{key: 'dude', frame: 0}],
        frameRate: 20
    };
    scene.anims.create(config);

    config = {
        key: 'right',
        frames: scene.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
        frameRate: 10,
        repeat: -1
    };
    scene.anims.create(config);

    config = {
        key: 'stand',
        frames: [{key: 'dude', frame: 4}],
        frameRate: 0
    };
    scene.anims.create(config);
}
