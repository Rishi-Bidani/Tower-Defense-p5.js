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
			var bool = "true";
			console.log(bool)
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
			}	

			else if (this.enemy_position[i][1] >= 100 && this.enemy_position[i][0] >= 600)
			{
				this.enemy_position[i][1] -= this.enemy1speed;
			}

			else if (this.enemy_position[i][0] >= 750)
			{
				this.enemy_position[i][0] = 750;
				lives --;
				this.enemy_position.shift();
			}	

			else
			{
				this.enemy_position[i][0] += this.enemy1speed;
			}

		}
	}
}


// initialisation and variables

let classenemy1 = new Enemy1(10);
let towers = new Menu("Towers");

var lives = 150;



function preload() {
	backgroundImg = loadImage("http://127.0.0.1:8080/img/extra/map1.png");
	moneyImg = loadImage("http://127.0.0.1:8080/img/extra/dollar.png");
	livesImg = loadImage("http://127.0.0.1:8080/img/extra/lives.png");
	enemy1 = loadImage("http://127.0.0.1:8080/img/enemies/enemy1.png");

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

// function nothing()
// {
// 	var bool = "true";
// 	console.log(bool)
// }