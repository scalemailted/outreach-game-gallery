game = new Object();

game.score = 0;
game.timer = 0;
game.start = function()
{
	input.start();
	renderer.start();
	game.main();
};

// The main game loop
game.main = function() 
{ 
	game.update();
	renderer.draw();
	window.requestAnimationFrame(game.main);
};

// Update game objects
game.update = function() 
{
	player.move(input.x, input.y)
	var now = Date.now();
	if (now - enemy.age> 1000)
	{
		enemy.move();
	}
	if (player.isTouching(enemy) && player.isAttacking)
	{
		
		game.score++;
		enemy.move();
	}
	player.isAttacking = false;
};