
class circle{
	constructor(){
		this.resetThis();

		this.brain = new NeuralNetwork(8,8,1);
	}

	think(b1){
		let closest,secondClosest;
		closest = b1[0];
		if(b1.length > 1)
			secondClosest = b1[1];
		if(closest.x < this.x - this.radius/3){
			closest = b1[1];
			if(b1.length > 1)
			secondClosest = b1[2];
		}

		let inputs = [];
		inputs[0] = this.y / myHeight;
		inputs[1] = this.velocity / 25;
		inputs[2] = closest.holeStart / myHeight;
		inputs[3] = closest.holeEnd/ myHeight;
		inputs[4] = closest.pos/ myWidth;
		if(b1.length > 1){
			inputs[5] = secondClosest.holeStart / myHeight;
			inputs[6] = secondClosest.holeEnd/ myHeight;
			inputs[7] = secondClosest.pos/ myWidth;
		}
		else {
			inputs[5] = closest.holeStart / myHeight;
			inputs[6] = closest.holeEnd/ myHeight;
			inputs[7] = closest.pos/ myWidth;
		}

		//let inputs = [1.0,1.0,1.0,1.0,1.0,1.0,1.0,1.0];
		let output = this.brain.predict(inputs);
		if(output > 0.5){
			this.jump();
		}
	}

	draw(){
		fill(180);
		ellipse(this.x,this.y,this.radius);
	}
	updateLoc(){
		if(this.status==true){
			this.y+=this.velocity;
			this.velocity+=this.gravity;
			this.velocity*=0.98;
			if(this.velocity>25){
				this.velocity = 25;
			}

			this.score++;
		}
		if((this.y>myHeight || this.y<0))
		this.status=false;
		if(this.status == false)
		message1.html("You Died. Your score : " +this.score);


		for(let i=0;i<b1.length;i++)
		if(this.collision(b1[i]))
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
	}
	collision(b){
		if(b.pos-b.width/2 > this.x+this.radius/3 || b.pos+b.width/2 < this.x-this.radius/3)
		return false;
		else if(this.y-this.radius/2 > b.holeStart && this.y+this.radius/2 < b.holeEnd){
			return false;

		}
		return true;
	}
};
