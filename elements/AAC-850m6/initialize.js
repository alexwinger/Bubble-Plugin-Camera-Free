function(instance, context) {
        const constraints = {
            kind: "videoinput",
		  };
    var height = instance.canvas.height();
    var width = instance.canvas.width();
    var dimensions = "width='"+width+"' height='"+height+"' ";
	instance.canvas.append("<video "+dimensions+" controls autoplay></video>");
    
    if(!instance.data.cameras)
    	instance.data.cameras = null;
    
    props=context.currentUser.listProperties();
    debugger;
}