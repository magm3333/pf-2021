var miModulo=require('./miModulo');
var restador=require('./miModulo').resta;
var fs=require('fs')

miModulo.setA(3);
miModulo.setB(2);

console.log(`Suma=${miModulo.suma()}`);

console.log(`Resta=${restador()}`);