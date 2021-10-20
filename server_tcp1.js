const net=require('net');

var puerto=process.env.PUERTO || 7777;

var cliName=function(socket){
    return `${socket.remoteAddress}:${socket.remotePort}`;
};

var serverTCP=net.createServer( socketCliente => {
    socketCliente.write("Hola cliente!\n");
    console.log(`Se conectó el cliente: ${cliName(socketCliente)}`);

    socketCliente.on('data', datos => {

        console.log(`${cliName(socketCliente)}: "${datos}"`);

        socketCliente.write("Eco: "+datos);

    })
   
});

serverTCP.listen(puerto);

console.log(`Server escuchando en ${puerto}`);

/*

//Versión Java o Python
ServerSocket.listen(7777);

while(true) {
    Socket socketCliente=ServerSocket.accept(); <--- Bloqueante
    //Lógica de atención al cliente (10 segundos)
    Atencion atencion=new Atencion(socketCliente);
    atencion.start();
}

// Versión node.js
socketCliente.on('commandoRemoto', comando => { lógica });
socketCliente.on('otraCosa', loQueSea => { lógica });

*/


