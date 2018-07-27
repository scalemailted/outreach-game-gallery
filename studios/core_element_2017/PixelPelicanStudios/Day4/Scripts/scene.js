var scene = new Scene();

function Scene()
{
  this.hazards = new Array();
  this.blocks = new Array(); //#new
  this.height = null;
  this.width = null;

  this.draw = function()
  {
    this.blocks.forEach((blocks) => blocks.draw());
    this.hazards.forEach((hazard) => hazard.draw());
    exit.draw();
    
  };
    
  this.setScene = function(worldData)
  {
    this.height = worldData.length;
    this.width = worldData [0].length;
      
    for(var j=0; j<this.height; j++)
    {
      var textRow = worldData[j];
      for (var i=0; i<this.width; i++)
      {
        var titleID = textRow[i];
        if (titleID == '#')
        {
          var x = i*32;
          var y = j*32;
          var w = 32;
          var h = 32;
          var block = new Block(x,y,w,h);
          this.blocks.push(block);
        }
        else if (titleID == '@')
        {
          player.x = i*32;
          player.y = j*32;
        }
        else if (titleID == '!')
        {
          exit.x = i*32;
          exit.y = j*32;
        }
        else if (titleID == 'A')
        {
          var hazard = new FloorHazard(); 
          hazard.x= i*32;
          hazard.y= j*32;
          this.hazards.push(hazard);
        }
        else if (titleID == 'V')
        {
          var hazard = new CeilingHazard(); 
          hazard.x= i*32;
          hazard.y= j*32;
          this.hazards.push(hazard); 
        }
    }
  }
  }
};
 
 