const net =require('net');
const fs = require('fs');

net.bytesWritten=300000;
net.writableLength=30000;

var puerto=process.env.PUERTO || 5555;

var cliName=function(socket){
    return `${socket.remoteAddress}:${socket.remotePort}`;
};

const server=net.createServer( c => {
    
    
    console.log(`Se conectó el cliente: ${cliName(c)}`);
    //c.write("Hola cliente!\n");
    //c.write("Comandos:\n");
    //c.write("\tget file\n");
    
    c.on('end',()=>{
        console.log(`Se desconectó el cliente: ${cliName(c)}`);
    });

   c.on('data', data=>{
       console.log(data)
       if(data.toString().startsWith('get file')) {
           const nombreArchivo='/home/mariano/Descargas/linux.jpg';
           console.log(`Enviando ${nombreArchivo}...`);
           fs.readFile(nombreArchivo, (err,d) =>{
               if(!err) {
                c.write(d);
                c.end();
               }else{
                console.log(`Error: ${err}`);
               }
           });

       }
   });

});

server.listen(puerto);
console.log(`Server escuchando en ${puerto}`);

