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
      console.log(this.status);
    }
  }

  resetThis(){
    this.holeStart = random(1,myHeight*0.6);
    this.holeEnd = this.holeStart+random(myHeight*0.2,myHeight*0.4);
    this.width = 15;
    this.pos = myWidth+this.width/2;
    this.velocity = 5;
    this.status=true;
  }



};

function updateBlocks(){

	for(let i=0;i<(b1.length);i++){

		if(c1[0].status == true)
			b1[i].updateLoc();


		if(b1[b1.length-1].pos < myWidth - myWidth/NoOfBlocks){
			let b = new block();
			b1.push(b);
		}

		if(b1[0].status==false){
			b1.shift();
			b1[0].pos-=b1[0].velocity;
		}
		b1[i].draw();

	}

}
