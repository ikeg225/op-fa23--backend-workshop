import mongoose from 'mongoose';
const contestantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    hasBoat: {
        type: Boolean,
        required: true
    },
    fishCaught: {
        type: [Number],
        default: []
    }
});
const Contestant = mongoose.model('Contestant', contestantSchema);
export { Contestant };
