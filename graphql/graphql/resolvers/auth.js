const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');


module.exports = {
    createUser: async (args) => {
        args=args.userInput;
        try {
            const existingUser=await User.findOne({email:args.email});
            if(existingUser) {
                throw new Error(`Ya existe el user con email '${existingUser.email}'`);
            }
            const hashedPwd=await bcrypt.hash(args.password, 12);
            const user=new User({
                email:args.email,
                password: hashedPwd
            });    
            const result=await user.save();
            return {...result._doc, password: null };
        } catch(err){
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user= await User.findOne({email: email});
        if(!user) {
            throw new Error(`Usuario '${email}', no existe!`);
        }
        const isEquals = await bcrypt.compare(password, user.password);
        if(!isEquals) {
            throw new Error('Clave incorrecta!');
        }
        const privateKey="algunaclaveimposiblederomper!";
        const token=jwt.sign({userId: user.id, email: user.email}, privateKey, {expiresIn: '1h'});
        return { userId: user.id, token: token, tokenExpiration: 1};
    }
};
