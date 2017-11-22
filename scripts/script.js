var SPACE = 32;
var TIMEUNIT = .15;
var MORSE = [
    {char:"A", morseString:"01"}, {char:"B", morseString:"1000"}, {char:"C", morseString:"1010"}, 
    {char:"D", morseString:"100"}, {char:"E", morseString:"0"}, {char:"F", morseString:"0010"}, 
    {char:"G", morseString:"110"}, {char:"H", morseString:"0000"}, {char:"I", morseString:"00"}, 
    {char:"J", morseString:"0111"}, {char:"K", morseString:"101"}, {char:"L", morseString:"0100"}, 
    {char:"M", morseString:"11"}, {char:"N", morseString:"10"}, {char:"O", morseString:"111"}, 
    {char:"P", morseString:"0110"}, {char:"Q", morseString:"1101"}, {char:"R", morseString:"010"}, 
    {char:"S", morseString:"000"}, {char:"T", morseString:"1"}, {char:"U", morseString:"001"}, 
    {char:"V", morseString:"0001"}, {char:"W", morseString:"011"}, {char:"X", morseString:"1001"}, 
    {char:"Y", morseString:"1011"}, {char:"Z", morseString:"1100"}, {char:"1", morseString:"01111"}, 
    {char:"2", morseString:"00111"}, {char:"3", morseString:"00011"}, {char:"4", morseString:"00001"}, 
    {char:"5", morseString:"00000"}, {char:"6", morseString:"10000"}, {char:"7", morseString:"11000"}, 
    {char:"8", morseString:"11100"}, {char:"9", morseString:"11110"}, {char:"0", morseString:"11111"} 
]
var INPUTTEXT = document.getElementById("morseInput");
var pressed = {};
var isPressed = false;
var signalOff = {};
var spaced = true;
var character = "";
var word = "";
var morseBtn = document.getElementById("morseBtn");
var time = 0;
var timer = setInterval(inputCheck, TIMEUNIT*1000);

function inputCheck(){
    time += TIMEUNIT;
    // End of character
    if( time > (TIMEUNIT * 3) && time < (TIMEUNIT * 7) && !isPressed){
            if(isMorse(character)){
                time = 0;
            }
    }
    // End of word
    if ( time > TIMEUNIT * 7 && !spaced && !isPressed){
        if(!isMorse(character)){
            word += " ";
            time = 0;
            spaced = true;
        }
    }
}

addMultiEventListeners(morseBtn, "touchstart mousedown", function(e){morseSignalOn(e);});
addMultiEventListeners(morseBtn, "touchend mouseup", function(e){morseSignalOff(e);});


function addMultiEventListeners(obj, types, fn){
    var i = 0;
    var typesArray = types.split(" ");
    while(i < typesArray.length){
        obj.addEventListener(typesArray[i], fn);
        i++;
    }

}

function morseSignalOn(e){
    e.preventDefault();
    if ( pressed[e.which] ) return;
    pressed[e.which] = e.timeStamp;
    var signalOffDuration = ( e.timeStamp - signalOff[e.which] ) / 1000;
    time = 0;
    signalOff[e.which] = 0;
    isPressed = true; 
}

function morseSignalOff(e){
    e.preventDefault();
    if ( !pressed[e.which] ) return;
    var duration = ( e.timeStamp - pressed[e.which] ) / 1000;
    signalOff[e.which] = e.timeStamp;
    time = 0;
        // Dot or dash
        if( duration < TIMEUNIT * 3){
            character += "0";
            INPUTTEXT.innerHTML += '.';
        }else{
            character += "1";
            INPUTTEXT.innerHTML +="_";
        }
    isPressed = false;
    pressed[e.which] = 0;
}


function isMorse(morseInputStr){
    for(var i = 0; i < MORSE.length; i++){
        if(MORSE[i].morseString == morseInputStr){
            word += MORSE[i].char;
            spaced = false;
            character = "";
            INPUTTEXT.innerHTML = word;
            INPUTTEXT.innerHTML = word;
            return true;
        }
    }
    character = "";
    INPUTTEXT.innerHTML = word;
    return false;
}

document.getElementById("clearBtn").addEventListener("click", function(){word = ""; character=""; INPUTTEXT.innerHTML = "";});

// dot duration is one time unit
// dash duration is three time units
// inter-element gap between the dots and dashes within a character is one unit long
// short gap (between letters) three time units long
// medium gap (between words) seven time units long
// one~three~seven