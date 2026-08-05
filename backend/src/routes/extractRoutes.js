const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const response = await fetch(`${process.env.LLM_SERVICE_URL}/extract`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to reach LLM service', error: error.message });
  }
});

module.exports = router;