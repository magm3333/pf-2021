//sudo apt install fswebcam

//http://manpages.ubuntu.com/manpages/bionic/man1/fswebcam.1.html

var procExterno=require('child_process').spawn;

// -S frames -> la cantidad de frames a saltar, antes de tomar la foto
var p=procExterno('fswebcam',['-r 640x480','--no-banner', '-s brightness=70%','-S 20', 'pepe.jpg']);

p.stdout.setEncoding('utf-8');

p.stdout.on('data', (data)=>{
    console.log(data.toString());
});


p.on('close',(errorLevel)=>{
    console.log(`Fin del proceso, error level=${errorLevel}`)
});