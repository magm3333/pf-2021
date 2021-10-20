const express = require('express');
const logger = require('morgan');
const chalk = require('chalk');

const graphqlHttp = require('express-graphql').graphqlHTTP;
const { buildSchema, isNullableType } = require('graphql');

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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



app.use('/graphql', graphqlHttp({
    schema: buildSchema(`
        type User {
            _id: ID!
            email: String!
            password: String
        }
        input UserInput {
            email: String!
            password: String
        }
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: () => {
            return Event.find().then(
                events => {
                    return events.map(
                        event => {
                           return { ...event._doc};
                        }
                    )
                }
            ).catch(err=>{
                throw err;
            });
        },
        createEvent: (args)=> {
            args=args.eventInput;
            const event = new Event({
                title: args.title,
                description: args.description,
                price: +args.price,
                date: new Date(args.date)
            });
            
            return event.save().then(
                result=> {
                    console.log(result);
                    return {...result._doc};
                }
            ).catch(
                err=> {
                    throw err;
                }
            );
        },
        createUser: (args) => {
            args=args.userInput;
            return bcrypt.hash(args.password, 12).then(hashedPwd => {
                const user=new User({
                    email:args.email,
                    password: hashedPwd
                });
                return user.save();
            })
            .then(result => {
                return {...result._doc, password: null };
            })
            .catch(err=>{
                return err;
            });
        }
    },
    graphiql: true 
}));

const port = process.env.PORT | 3000;
const connectString = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?authSource=admin`;
console.log(connectString);

mongoose.connect(connectString)
    .then( ()=>{
        app.listen(port);
        console.log(`Conectado a mongo!\nHTTPServer en puerto ${port}`);
    })
    .catch( err => {
        console.log(err);
    });

