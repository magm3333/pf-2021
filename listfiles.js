// Sintaxis:
//   listfiles path


// 1) recibir un parámetro que indique el directorio a leer
// 2) leer ese directorio y listar los archivos y carpetas que contenga,
// 3) discriminando si trata de una carpeta o un archivo
// 4) Si no se recibe el paámetro mostrar en pantalla la sintáxis de
//    ejecución del programa


// TIPs: librería fs (ver: readdir())

var args = process.argv.slice(2);
if(args.length==0) {
    console.log(`
    Sintáxis:
        ${process.argv[1]} path 
    `);
    process.exit(-1);
}
var dir=args[0];
var fs = require('fs');

fs.readdir(dir,(err,files) => {
    if(!err) {
        files.forEach(item => {
            fs.lstat(dir+"/"+item,(err,stats)=>{
                console.log(dir+"/"+item+" ("+( stats.isDirectory()?'Dir':'File' )+")")
            });
        });
    } else {
        console.log(`Problemas leyendo '${dir}'`);
    }
});
