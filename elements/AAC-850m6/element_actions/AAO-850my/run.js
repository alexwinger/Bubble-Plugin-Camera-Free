function(instance, properties, context) {
  //Load any data 
    var player      = instance.canvas.find("video")[0];
    var imageCanvas = document.createElement('canvas');
	imageCanvas.width = player.width;
	imageCanvas.height = player.height;
	var drawContext = imageCanvas.getContext('2d');
    
    
  //Do the operation
	drawContext.drawImage(player, 0, 0, imageCanvas.width, imageCanvas.height);
    
    var imageData = imageCanvas.toDataURL("image/png").split(';base64,')[1];
    
    var contentUploaded = (err,url) => {
        instance.publishState("pic",url);
    };
    
	context.uploadContent("foto.png",imageData, contentUploaded);
}