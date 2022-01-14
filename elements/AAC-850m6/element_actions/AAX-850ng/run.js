function(instance, properties, context) {


  //Load any data 
    var player = instance.canvas.find("video")[0];
    var camera = instance.data.camera;


  //Do the operation

    if(instance.data.cameraRemoteUrl != ""){
        player.srcObject = instance.data.cameraRemoteUrl;
        player.play();
        instance.publishState("open_camera", true);
    }else if(instance.data.cameraLocalNumber >= 0){
        if(!instance.data.cameraLocalStream)
        {
            devices = navigator.mediaDevices.enumerateDevices().then(
                function(devices)
                {
                    videoDevices = []
                    devices.forEach
                    (
                        function(device)
                        {
                            if(device.kind == "videoinput")
                            {
                                videoDevices.push(device);
                            }
                        }
                    );

                    if(videoDevices.length > instance.data.cameraLocalNumber && instance.data.cameraLocalNumber >=0 )
                    {
                        var constraint ={video:{deviceId:{exact:videoDevices[instance.data.cameraLocalNumber].deviceId}}};
                        navigator.mediaDevices.getUserMedia(constraint).then
                        (
                            function(stream)
                            {
                                if(stream != null)
                                {
                                    player.srcObject = stream;
                                    instance.data.cameraLocalStream = stream;
                                    player.play();
                                    instance.publishState("open_camera", true);
                                }
                            }
                        );
                    }
                }).catch( function(err) { });
        }
    }
}