var balloon,database,position;


function preload() {
  backgroundImg = loadImage("Hot Air Ballon-01.png");
  balloonImg = loadAnimation("Hot Air Ballon-02.png","Hot Air Ballon-03.png","Hot Air Ballon-04.png");

}

function setup() {
  database = firebase.database();
  createCanvas(800,400);
  balloon = createSprite(400, 200, 50, 50);
  balloon.addAnimation("running",balloonImg)
  balloon.scale = 0.5;
var balloonPosition = database.ref('balloon/height');
balloonPosition.on("value",readPosition,showError);
}
function draw() {
  background(backgroundImg);  
  drawSprites();
  
  textSize(25)
  fill("grey")
  stroke("gold")
  text("Use arrow keys to play!",50,50)

  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10;
  }

  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10;
  }

  else if(keyDown(UP_ARROW)){
    balloon.y = balloon.y-10;
  }

  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10;
  }
}
function readPosition(data){
position = data.val();
console.log(position.x);
balloonPosition.x = position.x;
balloonPosition.y = position.y;
}

function updateHeight(x,y){
database.ref('balloon/height').set({
'x' : height.x+x ,
"y" :height.y+y
})
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database")
}