const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');



const graphqlHttp = require('express-graphql').graphqlHTTP;


const mongoose = require('mongoose');

const graphQlSchema=require('./graphql/schema/index');
const graphQlResolvers=require('./graphql/resolvers/index');
const isAuth=require('./middleware/is-auth');

const Event = require('./models/event')
const User = require('./models/user')

const app = express();

app.use(express.json());
//app.use(logger('dev'));
app.use(logger(chalk`:method (:url) {yellow :status} :response-time ms - :res[content-length] bytes`));



app.get('/', (req, res, next)=>{
    //res.write('Hola');
    console.log(chalk.red('Hola desde el backend!'));
    res.send('Hola desde el backend!');
});


app.use(isAuth);
app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true 
}));

const port = process.env.PORT | 3000;
const connectString = `mongodb://${process.env.MONGO_USER || 'admin'}:${process.env.MONGO_PASSWORD || 'password'}@${process.env.MONGO_HOST || 'localhost'}/${process.env.MONGO_DB_NAME || 'eventos'}?authSource=admin`;
console.log(connectString);

mongoose.connect(connectString)
    .then( ()=>{
        app.listen(port);
        console.log(`Conectado a mongo!\nHTTPServer en puerto ${port}`);
    })
    .catch( err => {
        console.log(err);
    });

