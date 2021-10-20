const readLine=require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readLine.question('Ingrese su edad ', (edad)=>{
    console.log(
    `
        Edad: ${edad}
        bla bla bla
    `
    );
    readLine.close();
});