function(instance, context) {
    instance.data.linewidth = 5;
    instance.data.linecolor = "red";
    instance.data.isdrawable = false;

    
    instance.canvas.append("<canvas> </canvas>");
    instance.data.drawCanvas = instance.canvas.find("canvas")[0];
    var ctx = instance.data.drawCanvas.getContext("2d");
    
    
        function draw(e, justclicked){
        
        canvaspos = instance.data.drawCanvas.getBoundingClientRect();
        x = e.clientX - canvaspos.left;
        y = e.clientY - canvaspos.top;
        
        if(justclicked)
            ctx.moveTo(x,y);
        
        ctx.lineWidth = instance.data.linewidth;
        ctx.strokeStyle = instance.data.linecolor;
        ctx.lineCap = 'round';

        ctx.lineTo(x, y);
        ctx.stroke();
    }
    
    function button_handler(e){
        
        if(e.buttons&1==1 && instance.data.isdrawable){
            draw(e, true);
        }else if(instance.data.painting){
        }
    }

    instance.data.drawCanvas.addEventListener("mousemove", (e) => {
        if(e.buttons&1 == 1 && instance.data.isdrawable){
            draw(e, false);
        }
    });

    instance.data.drawCanvas.addEventListener("mousedown", button_handler);
    instance.data.drawCanvas.addEventListener("mouseup", button_handler);

}