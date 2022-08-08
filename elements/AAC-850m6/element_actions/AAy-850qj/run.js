function(instance, properties, context) {


  //Load any data 


  //Do the operation
    if(instance.data.isdrawable != properties.isdrawable){
        instance.data.isdrawable = properties.isdrawable;

        if(!instance.data.iscameraopen && instance.data.isdrawable){
            instance.publishState("drawing_enabled", true);
        }

        if(!instance.data.isdrawable)
            instance.publishState("drawing_enabled", false);
    }

}