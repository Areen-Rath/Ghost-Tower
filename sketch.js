var tower, towerImage;
var ghost, ghostImage;
var doorImage, climberImage, spookySound;
var doorGroup, climberGroup, invisibleBlockGroup;

var gameState = "play";

var score = 0;

function preload(){

    ghostImage = 
      loadAnimation("ghost-standing.png", "ghost-jumping.png");
    towerImage = loadImage("tower.png");
    climberImage = loadImage("climber.png");
    doorImage = loadImage("door.png");
    spookySound = loadSound("spooky.wav");

}

function setup(){

    createCanvas(600, 600);
  
    tower = createSprite(300, 300, 10, 20);
    tower.addImage(towerImage);
  
    ghost = createSprite(300, 300, 10, 20);
    ghost.addAnimation("ghost", ghostImage);
    ghost.scale = 0.5; 
  
    doorGroup = new Group();
    climberGroup = new Group();
    invisibleBlockGroup = new Group();
  
    spookySound.play();

}

function draw(){

    background("white");
  
    if(gameState === "play"){
      tower.velocityY = 1;
      if(tower.y > 600){
        tower.y = tower.height/2;
      }
      
      if(keyDown("space")){
        ghost.velocityY = -5;
      }
      
      ghost.velocityY = ghost.velocityY + 0.8;
      
      if(keyDown("RIGHT_ARROW")){
        ghost.x = ghost.x + 5;
      }
      
      if(keyDown("LEFT_ARROW")){
        ghost.x = ghost.x - 5;
      }
      
      spawnDoors();
      
      if(climberGroup.isTouching(ghost)){
        ghost.velocityY = 0;
      }
      
      if(invisibleBlockGroup.isTouching(ghost) || ghost.y > 600){
        ghost.destroy();
        gameState = "end";
      }
      
      score = score + Math.round(getFrameRate()/60);
      
      drawSprites();
      
      textSize(20);
      fill("lightblue");
      text("Score : " + score, 350, 100);
      
    } else if(gameState === "end"){
      textSize(30);
      fill("green");
      text("GAME OVER", 200, 300);
    }
}

function spawnDoors(){

    if(World.frameCount % 200 === 0){
      var door = createSprite(300, 0, 10, 20);
      door.addImage(doorImage);
      door.x = Math.round(random(100, 500));
      door.velocityY = 1;
      door.lifetime = 600;
      doorGroup.add(door);
      
      var climber = createSprite(300, 60, 10, 20);
      climber.addImage(climberImage);
      climber.x = door.x;
      climber.velocityY = 1;
      climber.lifetime = 600;
      climberGroup.add(climber);
      
      var invisibleBlock = createSprite(300, 65, 20, 1);
      invisibleBlock.width = climber.width;
      invisibleBlock.x = door.x;
      invisibleBlock.velocityY = 1;
      invisibleBlock.lifetime = 600;
      invisibleBlockGroup.add(invisibleBlock);
      
      ghost.depth = door.depth + 1;
    }

}