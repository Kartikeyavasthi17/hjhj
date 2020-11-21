//Create variables here

var dog, happyDog, database, foodS, foodStock;
var dogImg,happyDogImg;

var database;

var foood,foodObj;

var feed,addFood;
var fedtime,lastfed;

function preload()
{
  //load images here
  dogImg =loadImage("dogImg.png");
  happyDogImg =loadImage("dogImg1.png");
}

function setup() {
	createCanvas(1000,500);
  
  database =firebase.database();

  foood =new food();
  foodObj =new food();

  dog =createSprite(850,300,5,5);
  dog.scale =0.3;
  dog.addImage(dogImg);

  feed =createButton("Feed the dog");
  feed.position(700,60);
  feed.mousePressed(feedDog);

  addFood =createButton("Add Food");
  addFood.position(800,60);
  addFood.mousePressed(addFoods);

  foood.getfood();

}


function draw() {  

  background(46, 139, 87)
  //add styles here

  fedtime =database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastfed=data.val();
  })

  if(lastfed >=12)
  {
    fill("red");
    text("LAST FEED :" + lastfed%12 + "PM",250,40);
  }else if(lastfed == 0)
  {
    fill("red");
    text("LAST FEED : 12 AM",250,40);
  }else{
    fill("red");
    text("LAST FEED : "+ lastfed + "AM",250,50);
  }

  foodObj.display();
  dog.display();

  textSize(15);

 
  drawSprites();

}

function addFoods()
{
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function feedDog()
{
  dog.addImage(happyDogImg);

  foodObj.updateFood(foodObj.getfood()-1);
  database.ref('/').update({
    Food:foodObj.getfood(),
    fedtime:hour()
  })
}