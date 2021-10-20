const fs = require('fs');

var contenido=fs.readFileSync('/etc/hosts');
console.log(contenido.toString());
console.log('Otras instrucciones..');