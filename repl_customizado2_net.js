const editor=require('repl');
const red=require('net');


//var replServer=red.createServer(function(socket){
//	repl.start('lejano> ',socket);
//});
//replServer.listen(9999);

red.createServer(function(socket) {
	editor.start('lejano> ',socket);
}).listen(9999);

console.log('REPL escuchando en 9999');

