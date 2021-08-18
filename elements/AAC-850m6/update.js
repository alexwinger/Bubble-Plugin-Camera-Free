function(instance, properties, context) {
    
    if(properties.source){
        cameraNumber = parseInt(properties.source)
        if(Number.isNaN(cameraNumber))
        {
        	player.srcObject = properties.source;
        }
        else
        {
            instance.data.cameraNumber = cameraNumber
			navigator.mediaDevices.enumerateDevices().then(
				function(devices) {
					if(!instance.data.cameras){
						instance.data.cameras = []
						devices.forEach(
							function(device){
								if(device.kind == "videoinput"){
									instance.data.cameras.push(device)
								}
							});
						
						var player = instance.canvas.find("video")[0];
						player.srcObject = null;
                        cameraNumber = instance.data.cameraNumber;
                        if(instance.data.cameras.length>cameraNumber && cameraNumber >=0 ){
                            var constraint ={video:{deviceId:{exact:instance.data.cameras[cameraNumber].deviceId}}};
                            var userMedia = navigator.mediaDevices.getUserMedia(constraint);
                            userMedia.then((stream) => {player.srcObject = stream;});
                        }
					}
				}).catch(function(err) {
					console.log(err.name + ": " + err.message);
				});
        }
    }else{
    	var mediaDevices = navigator.mediaDevices;
    	var userMedia = mediaDevices.getUserMedia(constraints);
    	userMedia.then((stream) => {player.srcObject = stream;});
    }
}