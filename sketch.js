/*
Suhail's second p5 Project
Bird flying simulation with space bar
*/

let canvas;
let message1;
let button1;

NoOfBirds = 1;

var myWidth = 600, myHeight = 400;
let c1 = [];

class circle{
	constructor(){
		this.radius=20;
		this.x=50,this.y=0;
		this.status = true;
		this.score=0;
	}
	draw(){
		fill(180);
		ellipse(this.x,this.y,this.radius);
		this.score++;
	}
	updateLoc(){
		if(this.status==true)
		this.y+=4;

		if((this.y>myHeight || this.y<0) && this.status == true){
			this.status=false;
			message1.html("You Died. Your score : " +this.score);
			//message.colour(255);
		}
	}
	resetThis(){
		this.radius=20;
		this.x=50,this.y=0;
		this.status = true;
		this.score=0;
	}
};

function keyPressed(){
	if(key ==' '){
		if(c1[0].status == true)
		c1[0].y-=20;
	}
}

function resetGame(){
	background(255);
	message1.html("");
	c1[0].resetThis();
}

function setup() {
	//createCanvas(windowWidth, windowHeight);
	createP("Flappy Bird Project.");
	message1 = createP("");
	message1.position(myWidth/2-50,myHeight/2);
	createCanvas(myWidth, myHeight);
	button1 = createElement("Button","RESET");
	button1.mousePressed(resetGame);

	for(let i=0;i<NoOfBirds;i++){
		let c = new circle();
		c1.push(c);
	}
}

function draw() {
	background(255);
	//background(0);
	for(let i=0;i<(c1.length);i++){
		c1[i].draw();
		c1[i].updateLoc();
	}
}
