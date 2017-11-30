var width = window.innerWidth;
var height = window.innerHeight;
var dHeight = window.outerWidth;
var resizedForMobile = false;

function resize(){
    var appStyles = document.getElementsByClassName("app-style");
    if(height>width){
        for(var i = 0; i < appStyles.length; i++){
            appStyles[i].style.maxWidth = "100%";
        }
        resizedForMobile = true;
    }else if(height<width){
        for(var i = 0; i < appStyles.length; i++){
            appStyles[i].style.maxWidth = "600px";
        }
        resizedForMobile = false;
    }
}

// Remy Sharp's debounce function. 
function debounce(fn, delay) {
    var timer = null;
    return function () {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

window.onresize = debounce(function(){
    width = window.innerWidth;
    height = window.innerHeight;
    // On mobile with vertical orientation
    if(height>width && !resizedForMobile){
        resize();
    }else if(height<width && resizedForMobile){
        resize();
    }
}, 250);