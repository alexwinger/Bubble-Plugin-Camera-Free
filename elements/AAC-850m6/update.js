function(instance, properties, context) {
    var player = instance.canvas.find("video")[0];
    
    if(properties.source){
        player.srcObject = properties.source;
    }else{
    	var mediaDevices = navigator.mediaDevices;
    	var userMedia = mediaDevices.getUserMedia({video:true});
    	userMedia.then((stream) => {player.srcObject = stream;});
    }
}