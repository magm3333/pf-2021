const net =require('net');
const fs = require('fs');

net.bytesWritten=300000;
net.writableLength=30000;

/*
> list path --> server envía lista de archivos de una careta cualquiera
> get path -> server envía archivo y cliente guarda archivo
*/


const cliente=net.connect({port: 5555, address:'localhost'},()=>{
    console.log('Conexión exitosa!');
    cliente.write('get file');
});

const partes=[];

cliente.on('data', parte=>{ partes.push(parte);  })

cliente.on('end', ()=>{
    const archivoDestino='/home/mariano/Descargas/copiaLinux.jpg';
    const contenido=Buffer.concat(partes);
    fs.writeFile(archivoDestino,contenido, err => {
        if(!err) {
            console.log(`El archivo ${archivoDestino}, se almacenó correctamente!`);
        } else {
            console.log('Error: '+err);
        }
    });
});