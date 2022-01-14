function(instance, properties, context) {

    if(properties.source){
        cameraNumber = parseInt(properties.source)
        if(Number.isNaN(cameraNumber))
        {
            instance.data.cameraRemoteUrl = properties.source;
            if(properties.autostart == true){
                var player = instance.canvas.find("video")[0];
                player.srcObject = instance.data.cameraRemoteUrl;
                player.play();
                instance.publishState("open_camera", true);
            }
        }
        else
        {
            instance.data.cameraLocalNumber = cameraNumber;
        }
    }else{
        instance.data.cameraLocalNumber=0;
    }

    if(instance.data.cameraLocalNumber >= 0 && properties.autostart == true)
    {
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
                                    var player = instance.canvas.find("video")[0];
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