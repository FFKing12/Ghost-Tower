var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var gamestate="play";
var ib,ibGroup;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
 //spookySound.loop();
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  ibGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
    if(gamestate==="play"){
       if(keyDown("space")){
         ghost.velocityY=-5;
       }
      if(tower.y>400){
         tower.y=300;
         }
      if(keyDown("left")){
        ghost.x=ghost.x-3;         
         }
      if(keyDown("right")){
        ghost.x=ghost.x+3;
       }
      ghost.velocityY=ghost.velocityY+0.4;
      if(climbersGroup.isTouching(ghost)){
         ghost.velocityY=0;
         }
      if(ibGroup.isTouching(ghost)||ghost.y>600){
         ghost.destroy();
        gamestate="end";
         }
       
  
spawnDoors();
drawSprites();
    }
if(gamestate==="end"){
   stroke("red");
   fill("orange");
   textSize(30);
   text("Game Over",300,300);
   }

}
function spawnDoors() {
  //write code here to spawn the doors in the tower
  if (frameCount % 140 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    ib = createSprite(200,15,climber.width,10);
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    ib.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    ib.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   
    //assign lifetime to the variable
    door.lifetime = 800;
    climber.lifetime = 800;
    

    
    //add each door to the group
    doorsGroup.add(door);
    ibGroup.add(ib); 
    ib.debug=true;
    
    climbersGroup.add(climber);
   
  }
}

