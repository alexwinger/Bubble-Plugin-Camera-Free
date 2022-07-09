function(instance, properties, context) {
    
    instance.data.linewidth = properties.linewidth;
    instance.data.isdrawable = properties.isdrawable;
    
    height = properties.bubble.height();
    width  = properties.bubble.width();
    
    if(height != instance.data.drawCanvas.height || width != instance.data.drawCanvas.width){
        instance.data.drawCanvas.height = properties.bubble.height();
    	instance.data.drawCanvas.width  = properties.bubble.width();
    }
    
    if(instance.data.bgimage != properties.bgimage){
    	instance.data.bgimage = properties.bgimage;
        const imageCanvas = instance.data.drawCanvas;
    	var ctx = instance.data.drawCanvas.getContext("2d");
    	var img = new Image;

        
        img.addEventListener("load", function(){
        	ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
    	});
        
        img.crossOrigin="anonymous";
        img.src = properties.bgimage;
    }
}