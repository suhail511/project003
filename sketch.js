/*
Suhail's second p5 Project
Bird flying simulation with space bar
*/

let canvas1;
let message1, message2, message3, message4, message5, message6;
let button1;
let slider1;

NoOfBirds = 500;
NoOfBlocks = 4;

//Count Generation number
let generationNumber = 1;

//Best Score
let bestScore = 0;

//Current score
let currentScore=0;

//Best Circle ever!!
let bestCircle;

var myWidth = 900, myHeight = 400;
let c1 = [], savedc1 = [];
let blocks = [];

// function keyPressed(){
// 	if(key ==' '){
// 		if(c1[0].status == true)
// 		c1[0].jump();
// 	}
// }

// function resetGame(){
// 	background(255);
// 	//message1.html("");
// 	for(let c of c1)
// 		c.resetThis();
// 	blocks = [];
// 	let b = new block();
// 	blocks.push(b);
// }

function setup() {
	message1 = createP("");
	message1.position(myWidth/2-50,myHeight/2+90);




	slider1 = createSlider(1,1000,1);
	slider1.width = "100%";
	message2 = createElement("p","Move bar above to control Speed : " + slider1.value());
	message3 = createElement("p","Generation : " + generationNumber);
	message4 = createElement("p","Best Score : ");
	message5 = createElement("p","Current Score : ");
	message6 = createElement("p","Number of Circles alive : ");

	canvas1 = createCanvas(myWidth, myHeight);
	canvas1.style("border-style","solid");
	canvas1.style("border-width","3px");
	// button1 = createElement("Button","RESET");
	// button1.style("font-size","150%");
	// // button1.mousePressed(resetGame);

	for(let i=0;i<NoOfBirds;i++){
		let c = new circle();
		c1.push(c);
	}
	blocks = newBlocks();

}

function draw() {


	message2.html("Move bar above to control Speed : " + slider1.value());
	for(let k=0;k<slider1.value();k++){
		background(255);
		for(let j=c1.length-1;j>=0;j--){
			// console.log(c1[j].y);
			// console.log(c1[j].x);
			// console.log(c1[j].velocity);
			if(c1[j].status==false)
			savedc1.push(c1.splice(j,1)[0]);
			//console.log(savedc1.length);
		}
		//console.log((c1.length));


		for(let i=0;i<(c1.length);i++){
			c1[i].think(blocks);
			c1[i].draw();
			c1[i].updateLoc();
		}

		if(c1.length == 0){
			nextGen();
			blocks = newBlocks();
			generationNumber++;
			message3.html("Generation : " + generationNumber);

		}
		message5.html("Current Score : " + c1[0].score);
		message6.html("Number of Circles alive : " + c1.length);

		updateBlocks();
	}
}
