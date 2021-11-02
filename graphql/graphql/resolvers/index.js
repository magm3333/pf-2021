const bcrypt = require('bcryptjs');
const Event = require('../../models/event');
const User = require('../../models/user');
const Booking = require('../../models/booking');

const events = async (eventsIds) => {
    try {
        const events=await Event.find({_id: { $in: eventsIds }});    
        events.map(event => {
            return {
                ...event._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, event.creator)
            }
        });
        return events;
    } catch(err) {
        throw err;
    }
};

const user = async (userId) => {
    try {
        const user = await User.findById(userId);
        return {
            ...user._doc,
            createdEvents: events.bind(this, user._doc.createdEvents)
        };
    } catch(err) {
        throw err;
    }
};

const singleEvent = async (eventId) => {
    try {
        const event= await Event.findById(eventId);
        return {
            ...event._doc,
            creator: user.bind(this, event.creator)
        };
    } catch (error) {
        throw error;
    }
};


module.exports = {
    events: async () => {
        try {
            const events= await Event.find();
            return events.map(
                event => {
                return { 
                    ...event._doc,
                    date: new Date(event._doc.date).toISOString(),
                    creator: user.bind(this, event._doc.creator)
                    };
                });
        } catch(err) {
            throw err;
        }
    },
    bookings: async () => {
        try {
            const bookings = await Booking.find();
            return bookings.map(booking => {
                return {
                    ...booking._doc,
                    user: user.bind(this, booking._doc.user),
                    event: singleEvent.bind(this, booking._doc.event),
                    createdAt: new Date(booking._doc.createdAt).toISOString(),
                    updatedAt: new Date(booking._doc.updatedAt).toISOString()
                };
            });
        } catch (error) {
            throw error;
        }
    },
    bookEvent: async (args) => {

        try {
            const fetchedEvent=await Event.findOne({_id: args.eventId});
            const booking = new Booking({
                event: fetchedEvent,
                user: '617836192e850be55431fb15'
            });
            const result = await booking.save();
            return {
                ...result._doc,
                user: user.bind(this, result._doc.user),
                event: singleEvent.bind(this, result._doc.event),
                createdAt: new Date(result._doc.createdAt).toISOString(),
                updatedAt: new Date(result._doc.updatedAt).toISOString()
            };
        } catch (error) {
            throw error;
        }
    },
    createEvent: async (args)=> {
        args=args.eventInput;
        const event = new Event({
            title: args.title,
            description: args.description,
            price: +args.price,
            date: new Date(args.date),
            creator: '617836192e850be55431fb15'
        });
        let createdEvent;
        try {
            const result=await event.save();
            createdEvent={
                ...result._doc,
                date: new Date(event._doc.date).toISOString(),
                creator: user.bind(this, result._doc.creator)
            };
            const creator=await User.findById('617836192e850be55431fb15');    
            if(!creator) {
                throw new Error('No existe el usuario');
            }
            creator.createdEvents.push(event);
            await creator.save();
            return createdEvent;
        } catch (err) {
            throw err;
        }
    },
    cancelBooking: async (args)=> {
        try {
            const booking = await Booking.findById(args.bookingId).populate('event');
            const event = {
                ...booking.event._doc,
                creator: user.bind(this, booking._doc.creator)
            };
            await Booking.deleteOne({_id: args.bookingId});
            return event;
        } catch (error) {
            throw error;
        }
    },
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
    }
};