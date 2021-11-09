const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');

    if(!authHeader) {
        req.isAuth=false;
        return next();
    }
    //                                  |-------------------------------|
    //                                                                  |
    const token = authHeader.split(" ")[1]; // Authorization: Bearer 8925t9v954t9v8357t893np8

    if(!token || token=="") {
        req.isAuth=false;
        return next();
    }
    const privateKey="algunaclaveimposiblederomper!";
    let decodedToken;
    try {
        decodedToken=jwt.verify(token, privateKey);
    } catch (error) {
        req.isAuth=false;
        return next();
    }
    if(!decodedToken) {
        req.isAuth=false;
        return next();
    }
    console.log()
    req.isAuth=true;
    req.userId=decodedToken.userId;
    next();

};