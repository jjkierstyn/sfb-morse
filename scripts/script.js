var SPACE = 32;
var TIMEUNIT = .15;
var MORSELIST = ["01", "1000", "1010", "100", "0", "0010", "110", "0000", "00", 
                "0111", "101", "0100", "11", "10", "111", "0110", "1101", "010", 
                "000", "1", "001", "0001", "011", "1001", "1011", "1100", "01111", 
                "00111", "00011", "00001", "00000", "10000", "11000", "11100", "11110", "11111"];
var MORSEREFERENCE = ["A","B","C","D","E","F","G","H","I",
                    "J","K","L","M","N","O","P","Q","R",
                    "S","T","U","V","W","X","Y","Z","1",
                    "2","3","4","5","6","7","8","9","0"];
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

function isMorse(morseStr){
    for(var i = 0; i < MORSELIST.length; i++){
        if(MORSELIST[i] == morseStr){
            word += MORSEREFERENCE[i];
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