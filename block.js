class block{
  constructor(){
    this.resetThis();
  }

  draw(){
    rectMode(CORNERS);
    fill(100);
    rect(this.pos-this.width/2,0,this.pos+this.width/2,this.holeStart);
    rect(this.pos-this.width/2,this.holeEnd,this.pos+this.width/2,myHeight);

  }

  updateLoc(){
    if(this.status==true){
      this.pos-=this.velocity;
    }
    if((this.pos<-this.width/2) && this.status == true){
      this.status=false;
    }
  }

  resetThis(){
    this.holeStart = random(1,myHeight*0.5);
    this.holeEnd = this.holeStart+random(myHeight*0.3,myHeight*0.5);
    this.width = 15;
    this.pos = myWidth+this.width/2;
    this.velocity = 5;
    this.status=true;
  }

};

function updateBlocks(){

  for(let i=0;i<(blocks.length);i++){

    blocks[i].updateLoc();


    if(blocks[blocks.length-1].pos < myWidth - myWidth/NoOfBlocks){
      let b = new block();
      blocks.push(b);
    }

    if(blocks[0].status==false){
      blocks.shift();
      blocks[0].pos-=blocks[0].velocity;
    }
    blocks[i].draw();

  }

}

function newBlocks(){
  blocks = [];
  let b = new block();
  blocks.push(b);
  return blocks;
}
