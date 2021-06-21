function(instance, context) {
    const constraints = {
			video: true,
		  };
    var height = instance.canvas.height();
    var width = instance.canvas.width();
    
    var dimensions = "width='"+width+"' height='"+height+"' ";
	instance.canvas.append("<video "+dimensions+" controls autoplay></video>");
}