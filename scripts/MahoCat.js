class MahoCat extends Cat{
    constructor(config){
        super(config);
        this.henShinShiMaShiTaKa=false;
    }

    move(){
        if(this.left){
            this.body.velocity.x=-80;
            this.anims.play('left', true);
        }else{
            this.body.velocity.x=80;
            this.anims.play('right', true);
        }
    }

    climb(){

    }

    catAlgorithm(mouse){
        if(this.currentStory!=this.ladder.story){
            if(this.currentStory-mouse.currentStory==0){
                this.isClimbing=false;
            }else if(this.currentStory-mouse.currentStory==1){
                // alert(4);
                if((this.left&&this.body.position.x<=mouse.body.position.x)||(!this.left&&this.body.position.x>=mouse.body.position.x)){
                    // alert(5);
                    this.isClimbing=true;
                }else{
                    this.isClimbing=this.left^mouse.left;
                }
            }else{
                this.isClimbing=false;
            }
        }
    }
}