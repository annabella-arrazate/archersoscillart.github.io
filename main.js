const input = document.getElementById('input');





//define canvas variables

var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d") 
var width = ctx.canvas.width;
var height = ctx.cnavas.height;
var amplitude = 40;
var interval = null;

//create web audio api elements and shiz
const audioCtx = new AudioContext();
const gainNode = audioCtx.createGain();


//create Oscillator mode
const oscillator = audioCtx.createOscillator();
oscillator.connect(gainNode);
gainNode.connect(audioCtx.destination);
oscillator.type = "sine";
oscillator.start();
gainNode.gain.value = 0;

staffnames = new Map();
staffnames.set("C", 261.6);
staffnames.set("D", 293.7);
staffnames.set("E", 329.6);
staffnames.set("F", 349.2);
staffnames.set("G", 392.0);
staffnames.set("A", 440);
staffnames.set("B", 493.9);



function frequency(pitch){
    freq = pitch / 10000;
    gainNode.gain.setValueAtTime(100, audioCtx.currentTime);
    oscillator.frequency.setValueAtTime(pitch, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime + 1);

}




function handle(){
    audioCtx.resume();
    gainNode.gain.value = 0;
    var usernotes = String(input.value);
    frequency(staffnames.get(usernotes));


}


var counter = 0;

function line(){
    y = height/2 + (amplitude * Math.sin(x * 2 * Math.PI * freq));
    ctx.lineTo(x, y);
    ctx.stroke();
    x = x + 1;
    counter++;
}



function drawWave(){
    ctx.clearRect(0, 0, width, height);
    x = 0;
    y = height/2;
    ctx.moveTo(x, y);
    ctx.beginPath();
    counter = 0;
    interval = setInterval(line, 20);
    if (counter > 50 ){
        clearInterval(interval);
    }
}
