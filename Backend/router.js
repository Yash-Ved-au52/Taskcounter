import express from "express";
import Counter from "./model.js";
const router = express.Router();

// Create a new counter
router.post('/counters', async (req, res) => {
  try {
    const counter = new Counter();
    await counter.save();
    res.status(201).json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all counters
router.get('/counters', async (req, res) => {
  try {
    const counters = await Counter.find();
    res.json(counters);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a counter by ID
router.put('/counters/:id', async (req, res) => {
  const id = req.params.id;
  const { count } = req.body;

  try {
    const counter = await Counter.findById(id);
    if (!counter) {
      return res.status(404).json({ message: 'Counter not found' });
    }

    counter.count = count;
    await counter.save();
    res.json(counter);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a counter by ID
router.delete('/counters/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const counter = await Counter.findByIdAndRemove(id);
    if (!counter) {
      return res.status(404).json({ message: 'Counter not found' });
    }

    res.json({ message: 'Counter deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
