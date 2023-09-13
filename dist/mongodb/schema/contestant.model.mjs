import mongoose from 'mongoose';
const contestantSchema = new mongoose.Schema({
    name: String,
    age: Number,
    hasBoat: Boolean
});
const Contestant = mongoose.model('Contestant', contestantSchema);
export { Contestant };
