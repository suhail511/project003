

function nextGen(){
  //CalculateFitness();
  //console.log(savedc1);

  // Normalize the fitness values 0-1
  CalculateFitness();
  // Generate a new set of Circles
  c1 = generate(savedc1);
  // Copy those Circles to another array
  //savedc1 = c1.slice();
  savedc1 = [];
}

function CalculateFitness(){

  let sum=0, highestScore = 0, birdCircleThisGen;

  for (let i = 0; i < savedc1.length; i++) {
    if(savedc1[i].score > highestScore){
      highestScore = savedc1[i].score;
      birdCircleThisGen = savedc1[i];

    }
    savedc1[i].score = pow(savedc1[i].score, 3);
  }

  for (let c of savedc1)
  sum += c.score;
  for(let c of savedc1){
    c.fitness = c.score / sum;
  }
  console.log(sum);
  if(highestScore > bestScore){
    bestScore = highestScore;
    message4.html("Best Score : " + bestScore);
    bestCircle = birdCircleThisGen;
  }
  console.log(bestCircle);


}

// Generate a new population of Circles
function generate(oldCircles) {
  let newCircles = [];
  for (let i = 0; i < oldCircles.length; i++) {
    // Select a Circle based on fitness
    let Circle = poolSelection(oldCircles);
    newCircles[i] = Circle;
  }
  return newCircles;
}


// An algorithm for picking one circle from an array
// based on fitness
function poolSelection(Circles) {
  // Start at 0
  let index = 0;

  // Pick a random number between 0 and 1
  let r = random(1);

  // Keep subtracting probabilities until you get less than zero
  // Higher probabilities will be more likely to be fixed since they will
  // subtract a larger number towards zero
  while (r > 0) {
    r -= Circles[index].fitness;
    //console.log(Circles[index].fitness);
    // And move on to the next
    index += 1;
  }

  // Go back one
  index -= 1;

  // Make sure it's a copy!
  // (this includes mutation)
  return Circles[index].copy();
}
