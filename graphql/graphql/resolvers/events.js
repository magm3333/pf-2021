const Event = require('../../models/event');
const User = require('../../models/user');

const { transformEvent } = require('./merge');

module.exports = {
    events: async () => {
        try {
            const events= await Event.find();
            return events.map(
                event => {
                return transformEvent(event);
                });
        } catch(err) {
            throw err;
        }
    },createEvent: async (args, req)=> {
        if(!req.isAuth) {
            throw new Error('No authenticado');
        }
        args=args.eventInput;
        const event = new Event({
            title: args.title,
            description: args.description,
            price: +args.price,
            date: new Date(args.date),
            creator: req.userId
        });
        let createdEvent;
        try {
            const result=await event.save();
            createdEvent=transformEvent(result);
            const creator=await User.findById(req.userId);    
            if(!creator) {
                throw new Error('No existe el usuario');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    }
};