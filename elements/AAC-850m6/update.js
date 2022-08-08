function(instance, properties, context) {
    //Load any data 
    var camSrc = instance.data.camSrc;
    var StartCamera = instance.data.StartCamera;
    
    instance.data.linewidth  = properties.linewidth;
    instance.data.linecolor  = properties.linecolor;
    instance.data.autostart  = properties.autostart;
    
    height = properties.bubble.height();
    width  = properties.bubble.width();
    
    //Do the operation
    
    if(height != instance.data.drawCanvas.height || width != instance.data.drawCanvas.width){
        instance.data.drawCanvas.height = properties.bubble.height();
    	instance.data.drawCanvas.width  = properties.bubble.width();
    }
    
    if(properties.source != camSrc){
        instance.data.camSrc = properties.source;
        
        if(properties.autostart){
            StartCamera(true);
        }
    }
}