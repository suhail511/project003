/*
Suhail's second p5 Project
Bird flying simulation with space bar
*/

let canvas1;
let message1;
let button1;

NoOfBirds = 1;
NoOfBlocks = 3;

var myWidth = 700, myHeight = 400;
let c1 = [];
let b1 = [];

// function keyPressed(){
// 	if(key ==' '){
// 		if(c1[0].status == true)
// 		c1[0].jump();
// 	}
// }

function resetGame(){
	background(255);
	message1.html("");
	c1[0].resetThis();
	b1 = [];
	let b = new block();
	b1.push(b);
}

function setup() {
	message1 = createP("");
	message1.position(myWidth/2-50,myHeight/2+90);

	canvas1 = createCanvas(myWidth, myHeight);
	canvas1.style("border-style","solid");
	canvas1.style("border-width","3px");

	createElement("p","");
	button1 = createElement("Button","RESET");
	button1.style("font-size","150%");
	button1.mousePressed(resetGame);

	for(let i=0;i<NoOfBirds;i++){
		let c = new circle();
		c1.push(c);
	}
	let b = new block();
	b1.push(b);

}

function draw() {
	background(255);

	for(let i=0;i<(c1.length);i++){
		c1[i].think(b1);
		c1[i].draw();
		c1[i].updateLoc();
	}

	updateBlocks();
}
