import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { router as contestantRouter } from './mongodb/routes/contestant.router.mjs';
dotenv.config();
async function connectToMongoDB(connectionString) {
    await mongoose.connect(connectionString);
}
try {
    await connectToMongoDB(process.env.MONGODB_URI || '');
}
catch (e) {
    console.log(`Error connecting to MongoDB: `, e);
}
const PORT = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', contestantRouter);
app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`);
});
