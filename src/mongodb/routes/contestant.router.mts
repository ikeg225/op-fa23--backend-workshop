import express from 'express';
const router = express.Router();
import { Contestant } from '../models/contestant.model.mjs';

// Register an Angler
router.post('/angler', async (req, res) => {
    try {
        const data = await Contestant.create(req.body);
        res.status(200).json(data);
    } catch (e) {
        res.status(400).send(`Error creating a contestant: ${e}`);
    }
});

// Get all Anglers
router.get('/anglers', async (req, res) => {
    try {
        const data = await Contestant.find({}, {"name": 1, "age": 1, "_id": 0});
        res.status(200).json({"contestants": data});
    } catch (e) {
        res.status(400).send(`Error occurred getting all anglers: ${e}`);
    }
});

// Add a New Fish Caught
router.post('/newFishy', async (req, res) => {
    try {
        const { contestantName, fishWeight } = req.body;
        if (fishWeight < 0) {
            throw new Error("Fish weight cannot be negative.");
        }
        const angler = await Contestant.findOne({ name: contestantName });
        if (!angler) {
            throw new Error("Angler not found.");
        }
        angler.fishCaught.push(fishWeight);
        await angler.save();
        res.status(200).json({ fishWeights: angler.fishCaught });
    } catch (e) {
        res.status(400).send(`Error cannot add new fish: ${e}`);
    }
});

// Get Highest Score
router.get('/winner', async (req, res) => {
    try {
        const result = await Contestant.aggregate([
            {
                $addFields: {
                    score: { $sum: '$fishCaught' },
                },
            },
            {
                $sort: { score: -1 },
            },
            {
                $limit: 1,
            },
            {
                $project: {
                    _id: 0,
                    name: 1,
                    score: 1,
                },
            },
        ]);
        if (result.length === 0) {
            throw new Error("No contestants found.");
        }
        res.status(200).json(result[0]);
    } catch (e) {
        res.status(400).send(`Error cannot get winner: ${e}`);
    }
});

export { router };