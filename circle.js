
class circle{
	constructor(brain){
		this.resetThis();
		if (brain instanceof NeuralNetwork) {
			this.brain = brain.copy();
			this.brain.mutate(mutate);
		} else {
			this.brain = new NeuralNetwork(11, 13, 2);
		}
	}

	mutate()	{
		this.brain.mutate();
	}

	copy() {
		return new circle(this.brain);
	}

	think(blocks){
		let closest,secondClosest,thirdClosest;
		closest = blocks[0];
		if(blocks.length >1)
		secondClosest = blocks[1];
		else
		secondClosest = blocks[0];
		if(blocks.length >2)
		thirdClosest = blocks[2];
		else
		thirdClosest = blocks[0];

		if(closest.x < this.x - this.radius/3){
			closest = blocks[1];
			if(blocks.length >1 )
			secondClosest = blocks[2];
			if(blocks.length >2)
			thirdClosest = blocks[3];
		}

		let inputs = [0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0,0.0];
		inputs[0] = this.y / myHeight;
		inputs[1] = this.velocity / 25;
		inputs[2] = closest.holeStart / myHeight;
		inputs[3] = closest.holeEnd/ myHeight;
		inputs[4] = closest.pos/ myWidth;
		if(blocks.length > 1){
			inputs[5] = secondClosest.holeStart / myHeight;
			inputs[6] = secondClosest.holeEnd/ myHeight;
			inputs[7] = secondClosest.pos/ myWidth;
		}
		if(blocks.length > 2){
			inputs[8] = thirdClosest.holeStart / myHeight;
			inputs[9] = thirdClosest.holeEnd/ myHeight;
			inputs[10] = thirdClosest.pos/ myWidth;
		}

		//let inputs = [1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
		//console.log(inputs);
		let output = this.brain.predict(inputs);
		if(output[0] > 0.5){
			this.jump();
		}
	}

	draw(){
		fill(0,10);
		ellipse(this.x,this.y,this.radius);
	}

	updateLoc(){
		if(this.status==true){
			this.y+=this.velocity;
			if(this.y>myHeight)
			this.y = myHeight;
			else if (this.y<0)
			this.y =0;
			this.velocity+=this.gravity;
			this.velocity*=0.98;
			if(this.velocity>25){
				this.velocity = 25;
			}
			this.score++;
		}

		for(let i=0;i<blocks.length;i++)
		if(this.collision(blocks[i]))
		this.status=false;
	}

	jump(){
		this.velocity=-7;
	}

	resetThis(){
		this.radius=20;
		this.x=50,this.y=height/2;
		this.velocity = 0;
		this.gravity = 0.3;
		this.status = true;
		this.score=0;
		this.fitness = 0;
	}

	collision(b){

		//Hitting the top or bottom of the screen
		if((this.y>myHeight-this.radius/2 || this.y<this.radius/2))
		 	return true;

		//Hitting the blocks
		if(b.pos-b.width/2 > this.x+this.radius/3 || b.pos+b.width/2 < this.x-this.radius/3)
		return false;
		else if(this.y-this.radius/2 > b.holeStart && this.y+this.radius/2 < b.holeEnd)
		return false;
		return true;
	}
};

function mutate(x) {
	if (random(1) < 0.05) {
		let offset = randomGaussian() * 0.3;
		let newx = x + offset;
		return newx;
	} else {
		return x;
	}
}
