var SPACE = 32;
var TIMEUNIT = .15;
var pressed = {};
var isPressed = false;
var signalOff = {};
var spaced = true;
var character = "";
var word = "";
//edit
var morseBtn = document.getElementById("morseBtn");
var time = 0;
var timer = setInterval(inputCheck, TIMEUNIT*1000);
function inputCheck(){
    time += TIMEUNIT;
    // End of character
    if( time > (TIMEUNIT * 3) && time < (TIMEUNIT * 7) && !isPressed){
            if(isMorse(character)){
                character = "";
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

var MORSELIST = ["01", "1000", "1010", "100", "0", "0010", "110", "0000", "00", 
                "0111", "101", "0100", "11", "10", "111", "0110", "1101", "010", 
                "000", "1", "001", "0001", "011", "1001", "1011", "1100", "01111", 
                "00111", "00011", "00001", "00000", "10000", "11000", "11100", "11110", "11111"];
var MORSEREFERENCE = ["A","B","C","D","E","F","G","H","I",
                    "J","K","L","M","N","O","P","Q","R",
                    "S","T","U","V","W","X","Y","Z","1",
                    "2","3","4","5","6","7","8","9","0"];

morseBtn.addEventListener("touchstart", function(e){morseBtnDown(e);});
morseBtn.addEventListener("touchend",  function(e){morseBtnUp(e);});

function morseBtnDown(e){
    if ( pressed[e.which] ) return;
    pressed[e.which] = e.timeStamp;
    var signalOffDuration = ( e.timeStamp - signalOff[e.which] ) / 1000;
    time = 0;
    signalOff[e.which] = 0;
    isPressed = true; 
}

function morseBtnUp(e){
    if ( !pressed[e.which] ) return;
    var duration = ( e.timeStamp - pressed[e.which] ) / 1000;
    signalOff[e.which] = e.timeStamp;
    time = 0;
        // Dot or dash
        if( duration < TIMEUNIT * 3){
            character += "0";
            document.querySelector("input").placeholder += '.';
        }else{
            character += "1";
            document.querySelector("input").placeholder +="_";
        }
    isPressed = false;
    pressed[e.which] = 0;
}

function isMorse(morseStr){
    for(var i = 0; i < MORSELIST.length; i++){
        if(MORSELIST[i] == morseStr){
            word += MORSEREFERENCE[i];
            spaced = false;
            return true;
        }
    }
    character = "";
    document.querySelector("input").placeholder = word;
    return false;
}

document.getElementById("clearBtn").addEventListener("click", function(){word = ""; character=""; document.querySelector("input").placeholder = "";});

// dot duration is one time unit
// dash duration is three time units
// inter-element gap between the dots and dashes within a character is one unit long
// short gap (between letters) three time units long
// medium gap (between words) seven time units long
// one~three~seven