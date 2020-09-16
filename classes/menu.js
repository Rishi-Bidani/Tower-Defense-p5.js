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
		firetower_button.onPress = nothing();
		firetower_button.draw();
	}

}
