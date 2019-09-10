class ExampleScene extends Phaser.Scene{
    constructor(test) {
        super({
            key: 'ExampleScene'
        });
        this.stupid_loop_count=0;
        this.stupid_config={
            scene:this,
            key:'stupid_cat',
            x:100,
            y:100,
            originalStory:2
        };
        this.cat_factory=CatFactory.getInstance();

    }

    create()
    {
        //TODO after colliding with another platform, this should be set to false

        // this.isClimbing=false;

        this.add.image(400, 300, 'background');

        this.ladders = this.physics.add.group();
        let ladder_configuration={
            scene:this,
            key: 'ladder',
            x:400,
            y:445,
            setScale:false,
            setSize:true,
            width:32,
            height:182,
            story:0
        };
        let ladd=new Ladder(ladder_configuration);
        this.ladders.add(ladd);

        ladder_configuration={
            scene:this,
            key: 'ladder',
            x:200,
            y:265,
            setScale:false,
            setSize:true,
            width:32,
            height:181,
            story:1
        };
        ladd=new Ladder(ladder_configuration);
        this.ladders.add(ladd);

        let sematary_config={
            scene:this,
            key:'cat_sematary',
            x:700,
            y:511
        };
        this.catSematary=new CatSematary(sematary_config);

        this.platforms = this.physics.add.staticGroup();
        let platform_configuration={
            scene:this,
            key: 'ground',
            x:398,
            y:568,
            setScale:true,
            setSize:false,
            scale:2,
            story:0
        };
        let platform= new Platform(platform_configuration);
        this.platforms.add(platform);

        platform_configuration={
            scene:this,
            key: 'ground',
            x:234,
            y:360,
            setScale:false,
            setSize:true,
            width:300,
            height:10,
            story:1
        };
        platform= new Platform(platform_configuration);
        this.platforms.add(platform);

        platform_configuration={
            scene:this,
            key: 'ground',
            x:517,
            y:360,
            setScale:false,
            setSize:true,
            width:200,
            height:10,
            story:1
        };
        platform= new Platform(platform_configuration);
        this.platforms.add(platform);

        platform_configuration={
            scene:this,
            key: 'ground',
            x:84,
            y:180,
            setScale:false,
            setSize:true,
            width:200,
            height:10,
            story:2
        };
        platform= new Platform(platform_configuration);
        this.platforms.add(platform);

        platform_configuration={
            scene:this,
            key: 'ground',
            x:317,
            y:180,
            setScale:false,
            setSize:true,
            width:200,
            height:10,
            story:2
        };
        platform= new Platform(platform_configuration);
        this.platforms.add(platform);

        this.physics.add.collider(this.ladders,this.platforms);

        this.mouse=new Mouse({
            scene:this,
            key:'mouse',
            x:625,
            y:400
        });
        this.mouse.body.collideWorldBounds=true;

        //TODO create cats
        this.cats=[];

        // let cur_cat=CatFactory.getInstance().createCat(CatType,config);
        // cur_cat.body.collideWorldBounds=true;
        // this.cats.push(cur_cat);

        this.cursors = this.input.keyboard.createCursorKeys();

		let that = this;

		this.physics.add.collider(this.mouse,this.platforms, (mouse,platform) =>
	    {
			mouse.climbOff();
			mouse.currentStory=platform.story;
			// if(mouse.currentStory==1){
			//     alert(1);
            // }
		});

		this.physics.add.collider(this.mouse,this.catSematary);
		this.physics.add.collider(this.cats,this.catSematary,(cat,catSematary)=>{
		    this.enter_sematary(cat);
        });
        this.physics.add.collider(this.cats,this.platforms,(cat,platform)=>{
            if(cat.currentStory!=platform.story){
                cat.left=cat.left? false: true;
                cat.currentStory=platform.story;
                if(cat.isClimbing){
                    cat.climbOff();
                }
            }
            cat.currentStory=platform.story;
            cat.body.velocity.x=0;
        });

        //TODO: kill mouse
        this.physics.add.overlap(this.mouse,this.cats,(mouse,cat)=>{
            mouse.hurtBy(cat);
        });
    }

    update()
    {
		let that = this;
		this.stupid_loop_count=(this.stupid_loop_count+1)%100;
		if(!this.stupid_loop_count){
		    let cur_cat=this.cat_factory.createCat(CatType.STUPID,this.stupid_config);
		    if(cur_cat){
		        cur_cat.body.collideWorldBounds=true;
                this.cats.push(cur_cat);
            }
        }
		if(this.physics.overlap(this.mouse,this.ladders, this.mouse.saveLadderPos))
		{
			this.mouse.isOnLadder = true;
		}
		else
		{
			this.mouse.isOnLadder = false;

			this.mouse.snapTo = null;
			this.mouse.climbOff();
		}
        this.mouse.update(this.cursors);
        this.physics.overlap(this.cats,this.ladders,(cat,ladder)=>{
            // alert(2);
            // if(ladder.story==0){
            //     alert(2);
            // }
            cat.climbOrNot(ladder);
        });
		this.cats.forEach(function (cat) {
           cat.update();
        });

    }

    enter_sematary(cat){
        if(cat instanceof StupidCat){
            CatFactory.getInstance().killCat(cat);
            var pos = this.cats.indexOf(cat);
            this.cats.splice(pos,1);
            cat.visible=false;
            cat.destroy();
        }
    }
	
}