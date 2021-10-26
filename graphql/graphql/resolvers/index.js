const bcrypt = require('bcryptjs');
const Event = require('../../models/event')
const User = require('../../models/user')

const events = eventsIds => {
    return Event.find({_id: { $in: eventsIds }})
        .then(events=>{
            return events.map(event => {
                return {
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event.creator)
                }
            });
        })
        .catch(err=>{throw err;})
};

const user = userId => {
    return User.findById(userId)
        .then(user=>{
            return {
                ...user._doc,
                createdEvents: events.bind(this, user._doc.createdEvents)
            }
        })
        .catch(err=> {throw err;})
};


module.exports = {
    events: () => {
        return Event.find().then(
            events => {
                return events.map(
                    event => {
                       return { 
                           ...event._doc,
                           date: new Date(event._doc.date).toISOString(),
                           creator: user.bind(this, event._doc.creator)
                        };
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
            date: new Date(args.date),
            creator: '617836192e850be55431fb15'
        });
        let createdEvent;

        return event.save().then(
            result=> {
                createdEvent={
                    ...result._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, result._doc.creator)
                };
                
                return User.findById('617836192e850be55431fb15');    
            }
        ).then(user=>{
            if(!user) {
                throw new Error('No existe el usuario');
            }
            user.createdEvents.push(event);
            return user.save();
        })
        .then(result=>{
            return createdEvent;
        })
        .catch(
            err=> {
                throw err;
            }
        );
    },
    createUser: (args) => {
        args=args.userInput;
        return User.findOne({email:args.email}).then(user=>{
            if(user) {
                throw new Error(`Ya existe el user con email '${user.email}'`);
            }
            return bcrypt.hash(args.password, 12);
        })
        .then(hashedPwd => {
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
};