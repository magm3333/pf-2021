const fs=require('fs');

fs.readFile('/etc/hosts',(err,contenido)=>{
    if(!err) {
        console.log(contenido.toString());
    }
});

console.log('Otras instrucciones..');