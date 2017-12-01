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
    {char:"8", morseString:"11100"}, {char:"9", morseString:"11110"}, {char:"0", morseString:"11111"},
    {char: ".", morseString: "010101"}, {char: ",", morseString: "110011"}, {char: ":", morseString: "111000"},
    {char: "?", morseString: "001100"}, {char: "'", morseString: "011110"}, {char: "-", morseString: "100001"},
    {char: "/", morseString: "10010"}, {char: '"', morseString: "010010"}, {char: "@", morseString: "011010"},
    {char: "=", morseString: "10001"}, {char: "!", morseString: "1110"}
];
var newMessageText = document.getElementById("new-message");
var morseBtn = document.getElementById("key");
var cheatsheetBtn = document.getElementById("cheatsheet-toggle");
var cheatsheetBtnIsPressed = false;
var cheatsheet = document.getElementById("cheatsheet");
var isHidden = false;
var pressed = {};
var isPressed = false;
var signalOff = {};
var spaced = true;
var character = "";
var word = "";
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
window.onkeydown = function(e){if(e.which == SPACE || e.which == 0){morseSignalOn(e)};};
window.onkeyup = function(e){if(e.which == SPACE || e.which == 0){morseSignalOff(e)};};

function morseSignalOn(e){
    e.preventDefault();
    if (pressed[e.which]) return;
    pressed[e.which] = e.timeStamp;
    var signalOffDuration = ( e.timeStamp - signalOff[e.which] ) / 1000;
    time = 0;
    signalOff[e.which] = 0;
    isPressed = true; 
    morseBtn.style.backgroundColor = "rgba(0,0,0,0.20)";
}

function testFunction(){
    while(isPressed == true){
        morseBtn.style.width += 10;
        morseBtn.style.width += 10;
    }
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
            newMessageText.value += '.';
        }else{
            character += "1";
            newMessageText.value +="-";
        }
    isPressed = false;
    pressed[e.which] = 0;
    morseBtn.style.backgroundColor = "rgba(0,0,0,0.10)";
}

function isMorse(morseInputStr){
    for(var i = 0; i < MORSE.length; i++){
        if(MORSE[i].morseString == morseInputStr){
            word += MORSE[i].char;
            spaced = false;
            character = "";
            newMessageText.value = word;
            return true;
        }
    }
    character = "";
    newMessageText.value = word;
    return false;
}


document.getElementById("morse-input-clear").addEventListener("click", function(){word = ""; character=""; newMessageText.value = ""; spaced = true;});
cheatsheetBtn.addEventListener("click", function(){
    if(cheatsheet.style.display != "none"){
        cheatsheet.style.display = "none";
    }else{
        cheatsheet.style.display = "block";
    }
});
resize();
// dot duration is one time unit
// dash duration is three time units
// inter-element gap between the dots and dashes within a character is one unit long
// short gap (between letters) three time units long
// medium gap (between words) seven time units long
// one~three~seven