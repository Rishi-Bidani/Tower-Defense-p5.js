class Menu
{
	constructor(heading)
	{
		this.heading = heading;
	}

	ShowHeading()
	{
		textSize(28);
		var textwidth;
		textwidth = textWidth(this.heading);
		text(this.heading, 845 + textwidth/2, 150);
	}

	ShowTower()
	{
		var button_size = {
			width: 120,
			height: 40
		}
		let firetower_button = new Clickable();
		firetower_button.text = "Fire Tower";
		firetower_button.locate(780 + button_size.width/2, 180);
		firetower_button.color = "#F14848";
		firetower_button.onPress = function nothing(){
			isFireTowerPressed = true;
		};
		firetower_button.draw();
	}

}


class Enemy1
{
	constructor(number_of_enemies)
	{
		this.number_of_enemies = number_of_enemies;
		this.enemy_position = [];
		this.enemy1speed = 4;

	}
	enemy1_spawn()
	{
		let randomx = random(-300, -100);
		for(var i=0; i<this.number_of_enemies; i++)
		{
			var positionx = randomx;
			var positiony = 100;

			this.enemy_position.push([positionx + (-i*50), positiony]);
			globalenemy1position.push([positionx + (-i*50), positiony]);
			image(enemy1, this.enemy_position[i][0], this.enemy_position[i][1]);
		}

	}

	enemy1_move()
	{
		for(var i = 0; i < this.enemy_position.length; i++)
		{
			image(enemy1, this.enemy_position[i][0], this.enemy_position[i][1]);

			if (this.enemy_position[i][0] >= 200 && this.enemy_position[i][1] <= 450 && this.enemy_position[i][0] < 599)
			{
				this.enemy_position[i][1] += this.enemy1speed;
				globalenemy1position[i][1] += this.enemy1speed;
			}	

			else if (this.enemy_position[i][1] >= 100 && this.enemy_position[i][0] >= 600)
			{
				this.enemy_position[i][1] -= this.enemy1speed;
				globalenemy1position[i][1] -= this.enemy1speed;
			}

			else if (this.enemy_position[i][0] >= 750)
			{
				this.enemy_position[i][0] = 750;
				lives --;
				this.enemy_position.shift();
				globalenemy1position.shift();
			}	

			else
			{
				this.enemy_position[i][0] += this.enemy1speed;
				globalenemy1position[i][0] += this.enemy1speed;
			}

		}
	}
}





class FireTowerControl extends Enemy1
{
	constructor(enemy_position, firetowerpos)
	{
		super(enemy_position);
		this.firetowerpos = firetowerpos;
		// this.enemylist = enemylist;
		this.bestDistance = FireTowerRange;
		this.bestTarget = null;
	}

	pointTowardsEnemy()
	{
		for (var i = 0; i < this.enemy_position.length; i++) 
		{
			for (var j = 0; j < this.firetowerpos.length; j++) 
			{
				if (dist(this.enemy_position[i][0], this.enemy_position[i][1], this.firetowerpos[j][0], this.firetowerpos[j][1]) < this.bestDistance)
				{
					gunangle = atan2(this.enemy_position[i][1] - this.firetowerpos[j][1], this.enemy_position[i][0] - this.firetowerpos[j][0]) + radians(90);

				}
				else
			    {
					image(firetowerturretImg, this.firetowerpos[j][0], this.firetowerpos[j][1]-20);
					print('1')
			    }
					push();
					translate(this.firetowerpos[j][0], this.firetowerpos[j][1]);
				    // rect(-25, -20, 50, 40) // Draw the gun base
				    // ellipse(0, 0, gun.range*2) // display the gun range
				    rotate(gunangle);
				    image(firetowerturretImg, -28, -45); // Set the offset of the gun sprite and draw the gun
				    pop();
				    print("reached")

			}
		}
	}
}




// initialisation and variables

var numberOfEnemy1 = 100

let classenemy1 = new Enemy1(numberOfEnemy1);
let towers = new Menu("Towers");

var lives = 150;

var globalenemy1position = [];


var isFireTowerPressed = false;
var FireTowerPos = [];    // Position of all FireTowers => [x,y]
var FireTowerRange = 300;
var FireTowerAngle = 0;
// var FireTowerPlaced = true;


var firetowercontrol = new FireTowerControl(FireTowerPos);


function preload() 
{
	backgroundImg = loadImage("http://127.0.0.1:8080/img/extra/map1.png");
	moneyImg = loadImage("http://127.0.0.1:8080/img/extra/dollar.png");
	livesImg = loadImage("http://127.0.0.1:8080/img/extra/lives.png");
	enemy1 = loadImage("http://127.0.0.1:8080/img/enemies/enemy1.png");
	firetowerbaseImg = loadImage("http://127.0.0.1:8080/img/towers/firetowerbase.png");
	firetowerturretImg = loadImage("http://127.0.0.1:8080/img/towers/firetowergun.png");

}


function setup() {
	createCanvas(1000, 600);
	livesImg.resize(40, 40);
	classenemy1.enemy1_spawn();
}


function draw() 
{

	background(60, 238, 161);
	image(backgroundImg,0,0);
	image(moneyImg, 790, 0);
	image(livesImg, 805, 60);
	// ShowTowers();
	towers.ShowTower();
	towers.ShowHeading();
	classenemy1.enemy1_move();
	rect(750, 70, 50, 100);
	ShowLives();
	if (isFireTowerPressed == true) 
	{
		image(firetowerbaseImg, mouseX - 28, mouseY - 28);
		noFill();
		stroke(0,0,0);
		strokeWeight(1);
		circle(mouseX, mouseY, 300);
	}
	for (var i = 0; i < FireTowerPos.length; i++) 
	{
		image(firetowerbaseImg, FireTowerPos[i][0], FireTowerPos[i][1]);
		// image(firetowerturretImg, FireTowerPos[i][0], FireTowerPos[i][1]-20);

		if (globalenemy1position.length >= 1)
		{
			var gunx = FireTowerPos[i][0] +28;
			var guny = FireTowerPos[i][1]+25;
			var gunrange = FireTowerPos[i][3];
			// pointEnemy(globalenemy1position[0][0], globalenemy1position[0][1], FireTowerPos[i][0] +28, FireTowerPos[i][1]+25, FireTowerPos[i][2], FireTowerPos[i][3]);

			for (j=0; j<globalenemy1position.length; j++)
			{
				
				// pointEnemy(globalenemy1position[j][0], globalenemy1position[j][1], FireTowerPos[i][0] +28, FireTowerPos[i][1]+25, FireTowerPos[i][2], FireTowerPos[i][3]);
				
				let checkDist = dist(globalenemy1position[j][0], globalenemy1position[j][1], gunx, guny) 
				if (checkDist < gunrange) 
				{
				pointEnemy(globalenemy1position[j][0], globalenemy1position[j][1], gunx, guny, FireTowerPos[i][2], FireTowerPos[i][3]);

				}
				else if(checkDist > gunrange){
					image(firetowerturretImg, FireTowerPos[i][0], FireTowerPos[i][1]-20);
				}
			
			}
		}
		else
		{
			image(firetowerturretImg, FireTowerPos[i][0], FireTowerPos[i][1]-20);
		}

		pointEnemy(mouseX, mouseY, FireTowerPos[i][0] +28, FireTowerPos[i][1]+25, FireTowerPos[i][2], FireTowerPos[i][3]);
		// firetowercontrol.pointTowardsEnemy();
	}

}


function mouseClicked()
{

	if (isFireTowerPressed==true && mouseX+28 <= 750)
	{
		FireTowerPos.push([mouseX-28, mouseY-28, FireTowerAngle, FireTowerRange]);
		isFireTowerPressed = false;
	}
}


function ShowTowers()
{
	let firetowerbase_button;
	var button_size = 
	{
		width: 120,
		height: 40
	}

	textSize(28);
	var textwidth;
	textwidth = textWidth("Towers");

	text("Towers", 800 + textwidth/2, 150);
	// firetowerbase_button = createButton('Fire Tower');
	// firetowerbase_button.size(button_size.width, button_size.height);
	// firetowerbase_button.position(780 + button_size.width/2, 180);

	firetower_button = new Clickable();
	firetower_button.text = "Fire Tower";
	firetower_button.locate(780 + button_size.width/2, 180);
	firetower_button.color = "#F14848";
	firetower_button.draw();
}

function ShowLives()
{
	textSize(25);
	text(lives, 870, 85);

}

function pointEnemy(enemyx, enemyy, gunx, guny, gunangle, gunrange)
{
	const isWithinRange = dist(enemyx, enemyy, gunx, guny) < gunrange;
	if(isWithinRange)
	{
		gunangle = atan2(enemyy - guny, enemyx - gunx) + radians(90);
	}
		push();
		translate(gunx, guny);
	    // rect(-25, -20, 50, 40) // Draw the gun base
	    // ellipse(0, 0, gun.range*2) // display the gun range
	    rotate(gunangle);
	    image(firetowerturretImg, -28, -45); // Set the offset of the gun sprite and draw the gun
	    pop();
}


