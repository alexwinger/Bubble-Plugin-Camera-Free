function(instance, properties, context) {


    
  //Load any data 
	var player      = instance.canvas.find("video")[0];

  //Do the operation
    var imageCanvas = document.createElement('canvas');
    imageCanvas.width = player.width;
    imageCanvas.height = player.height;
    var drawContext = imageCanvas.getContext('2d');
    
    var mousemove = function(e){
            /// correct mouse position so it's relative to canvas
    var r = imageCanvas.getBoundingClientRect(),
        x = e.clientX - r.left,
        y = e.clientY - r.top;

    	/// draw background image to clear previous line
    	ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);

        /// update line object and draw it
        line.x1 = x;
        line.y1 = 0;
        line.x2 = x;
        line.y2 = imageCanvas.height;
        line.draw();
    };
    
    imageCanvas.onmousemove = mousemove;
    
}