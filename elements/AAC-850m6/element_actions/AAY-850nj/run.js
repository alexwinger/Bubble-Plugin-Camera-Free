function(instance, properties, context) {

    //Load any data 
    var player = instance.canvas.find("video")[0];

  //Do the operation

    if(player!=null){
    	player.pause();
        instance.publishState("open_camera", false);
    }
    
    if(instance.data.cameraLocalStream != null){
        instance.data.cameraLocalStream.getTracks().forEach(function(track) {
          track.stop();
        });
        instance.data.cameraLocalStream=null;
        instance.publishState("open_camera", false);
    }
}