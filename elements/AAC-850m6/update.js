function(instance, properties, context) {
    //Load any data 
    
    instance.data.linewidth  = properties.linewidth;
    instance.data.linecolor  = properties.linecolor;
    instance.data.autostart  = properties.autostart;
    
    height = properties.bubble.height();
    width  = properties.bubble.width();
    
    //Do the operation
    
    if(properties.source && (instance.data.camSrc != properties.source) ){
        instance.data.camSrc = properties.source;
    }
    
    if(height != instance.data.drawCanvas.height || width != instance.data.drawCanvas.width){
        if(height > 0)
        	instance.data.drawCanvas.height = height;
        
        if(width > 0)
    		instance.data.drawCanvas.width  = width;
    }
    

}