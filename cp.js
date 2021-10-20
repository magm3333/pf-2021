const fs=require('fs');

var args = process.argv.slice(2);
if(args.length<2) {
    console.log(`
    Sintáxis:
        ${process.argv[1]} path_origen path_destino
    `);
    process.exit(-1);
}
var origen=args[0];
var destino=args[1];

try {
    fs.accessSync(origen);
} catch(err) {
    console.log(`Problemas accediendo a origen '${origen}'`);
    process.exit(-1);
}

try {
    fs.accessSync(destino);
    console.log(`El destino '${destino}' existe!`);
    process.exit(-2);
} catch(err) {
}

var origenReader=fs.createReadStream(origen);
var destinoWriter=fs.createWriteStream(destino);
origenReader.pipe(destinoWriter);

/*
origen =============> (proceso) --+
                                  |
destino <============ (proceso) --+
*/