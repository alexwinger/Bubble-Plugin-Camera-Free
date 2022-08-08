function(instance, context){
    //Setup variables
    instance.data.linewidth = 5;
    instance.data.linecolor = "red";
    instance.data.iscameraopen = false;
    instance.data.isdrawable = false;
    instance.data.ismousedrawing = false;
    instance.data.istouchdrawing = false;
    instance.data.camSrc = "";
    
    var localstream = null;
    var height = instance.canvas.height();
    var width = instance.canvas.width();
    var player = document.createElement('video');
    var timer=null;
    
    instance.canvas.append("<canvas> </canvas>");
    instance.data.drawCanvas = instance.canvas.find("canvas")[0];
    
    var ctx = instance.data.drawCanvas.getContext("2d");
    

    instance.data.ImageUpdate = function(){
        if(player)
            ctx.drawImage(player, 0, 0, width, height);
    }
    
    
    ////Camera Functions
    function PlayStream(src){
        //Play stream
        player.srcObject = src;
        player.play();
        instance.data.iscameraopen = true;
        instance.publishState("drawing_enabled", false);
        instance.publishState("open_camera", true);
        timer = setInterval( instance.data.ImageUpdate, 50);
    }
    
    function OpenCamera(url){
        var cameraNumber = parseInt(url);
        if(Number.isNaN(cameraNumber))
        {
            localstream = null;
            PlayStream(url);
        }
        else if(cameraNumber >= 0)
        {
            //Select a local camera index
            if(!localstream)
            {
                //List devices
                var devices = navigator.mediaDevices.enumerateDevices().then(
                    function(devices)
                    {
                        var videoDevices = []
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

                        if(videoDevices.length > cameraNumber )
                        {
							var constraint = {video:{exact:videoDevices[cameraNumber]}};
                            
                            //Select the cameraLocalNumber from the list of devices
                            navigator.mediaDevices.getUserMedia(constraint).then
                            (
                                function(stream)
                                {
                                    if(stream != null)
                                    {
                                        localstream = stream;
                                        PlayStream(stream);
                                    }
                                }
                            );
                        }
                    }).catch( function(err) { });
            }
        }
    }

    function CloseCamera(){
        if(timer != null){
            clearInterval(timer);
        	timer=null;
        }

        if(player)
        	player.pause();

        if(localstream != null){
            localstream.getTracks().forEach(
                function(track) {
                	track.stop();
            	}
            );
            localstream=null;
        }

        instance.data.iscameraopen = false;
        instance.publishState("open_camera", false);
        
        if(instance.data.isdrawable)
        	instance.publishState("drawing_enabled", true);
    }
    
    instance.data.StartCamera=function(){
        if(!instance.data.iscameraopen && instance.data.camSrc != null && instance.data.camSrc != "")
           OpenCamera(instance.data.camSrc);
    }
    
    instance.data.StopCamera = function(){
         if(instance.data.iscameraopen)
             CloseCamera();
    }
    
    /////Drawing functions
        function draw(e, justclicked){
        
        canvaspos = instance.data.drawCanvas.getBoundingClientRect();
        x = e.clientX - canvaspos.left;
        y = e.clientY - canvaspos.top;
        
        if(justclicked){
            ctx.beginPath();
            ctx.moveTo(x,y);
        }
        
        ctx.lineWidth = instance.data.linewidth;
        ctx.strokeStyle = instance.data.linecolor;
        ctx.lineCap = 'round';

        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    function button_handler(e){
        
        if(e.buttons&1==1 && instance.data.isdrawable && !instance.data.istouchdrawing && !instance.data.iscameraopen){
            instance.data.ismousedrawing=true;
            draw(e, true);
        }else if(instance.data.ismousedrawing){
            instance.data.ismousedrawing=false;
        }
    }
    
    
    instance.data.drawCanvas.addEventListener("mousedown", button_handler);
    instance.data.drawCanvas.addEventListener("mouseup", button_handler);


    instance.data.drawCanvas.addEventListener("mousemove", (e) => {
        if(e.buttons&1 == 1 && instance.data.isdrawable && instance.data.ismousedrawing && !instance.data.iscameraopen){
            draw(e, false);
        }
    });

    
    instance.data.drawCanvas.addEventListener("touchmove",(e) => {
        if(instance.data.isdrawable && instance.data.istouchdrawing && !instance.data.iscameraopen){
            e.clientY=e.changedTouches[0].clientY;
            e.clientX=e.changedTouches[0].clientX;
            draw(e, false);
        }
    });
    
    instance.data.drawCanvas.addEventListener("touchstart",(e)=>{
        if(instance.data.isdrawable && !instance.data.ismousedrawing && !instance.data.iscameraopen){
            e.clientY=e.changedTouches[0].clientY;
            e.clientX=e.changedTouches[0].clientX;
            instance.data.istouchdrawing=true;
            draw(e, true);
            console.log("Touch start");
        }
    });
        
    instance.data.drawCanvas.addEventListener("touchend",(e)=>{
        if(instance.data.istouchdrawing){
            instance.data.istouchdrawing=false;
            console.log("Touch end");
        }
    });

}