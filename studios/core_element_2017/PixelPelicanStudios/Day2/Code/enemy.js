
var enemy = new Enemy();

function Enemy()
{
	this.x = Math.random() * (viewport.width - 32);
	this.y = Math.random() * (viewport.height - 32) ;
	this.image = new Image();
	this.image.src = "assets/RadRacoonStudios_5_point_target.png";
	this.width = 32;
	this.height = 32;
	this.age = Date.now();

	this.draw = function()
	{
		renderer.ctx.drawImage( this.image, this.x, this.y, this.width, this.height ); 
	};

	this.isTouching = function(gameObject)
	{
		return (this.x <= gameObject.x + gameObject.width &&
				this.y <= gameObject.y + gameObject.height &&
				gameObject.x <= this.x + this.width &&
				gameObject.y <= this.y + this.height);
	};

	this.attack = function()
	{

	}

	this.move = function() 
	{
		this.x= Math.random() * (viewport.width - this.width);
		this.y= Math.random() * (viewport.height - this.height);
		this.age = Date.now();
	

	};

}
