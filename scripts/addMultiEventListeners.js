// Function to add multiple event listeners to an object
function addMultiEventListeners(obj, types, fn){
    var i = 0;
    var typesArray = types.split(" ");
    while(i < typesArray.length){
        obj.addEventListener(typesArray[i], fn);
        i++;
    }
}