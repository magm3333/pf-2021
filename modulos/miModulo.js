var a=0;
var b=0;

var setA=function(aValue){
    a=aValue;
};

var setB=function(bValue){
    b=bValue;
};

var suma=function() {
    return a+b;
};

var restador=function() {
    return a-b;
};

module.exports = {
    setA:setA,
    setB:setB,
    suma:suma,
    resta:restador
};

