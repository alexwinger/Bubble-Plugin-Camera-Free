function(instance, properties, context) {
  //Load any data 
    var imageCanvas = instance.data.drawCanvas;
    
    
  //Do the operation
    
    var imageData = imageCanvas.toDataURL("image/png").split(';base64,')[1];
    
    //instance.publishState("pic",imageData);
    
    var contentUploaded = (err,url) => {
        instance.publishState("pic",url);
    };
    
	context.uploadContent("foto.png",imageData, contentUploaded);
}