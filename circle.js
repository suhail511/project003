
class circle{
	constructor(){
		this.resetThis();
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
