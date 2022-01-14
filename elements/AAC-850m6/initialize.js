function(instance, context){
    var height = instance.canvas.height();
    var width = instance.canvas.width();
    var dimensions = "width='"+width+"' height='"+height+"' ";
	instance.canvas.append("<video "+dimensions+"></video>");

    instance.data.cameraRemoteUrl = "";
    instance.data.cameraLocalNumber  = -1;
    instance.data.cameraLocalStream = null;
}