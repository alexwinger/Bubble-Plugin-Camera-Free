function(instance, properties, context) {
  //Load any data 
    const imageCanvas = instance.data.drawCanvas;    
    
  //Do the operation
    var url = imageCanvas.toDataURL("image/png")
    var imageData = url.split(';base64,')[1];
       
    
	context.uploadContent("drawableImage.png",imageData, (err,url) => {
        instance.publishState("pic",url);
		console.log("Created file "+url);
    });

}