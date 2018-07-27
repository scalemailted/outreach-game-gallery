
var enemy = new Enemy();

function Enemy()
{
	
	this.image = new Image();
	this.image.src = "assets/Fusion_Frogs_Fly.png"
	this.width = 64;
	this.height = 64;
	this.x = Math.random() * (viewport.width - this.width);
	this.y = Math.random() * (viewport.height - this.height);
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

	};

	this.move = function() 
	{
		this.age = Date.now();
		this.x = Math.random() * (viewport.width - this.width);
		this.y = Math.random() * (viewport.width - this.width);
	};

}
