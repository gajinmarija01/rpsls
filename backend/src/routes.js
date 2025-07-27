const express = require("express");
const gameLogic = require("./gameLogic");

const router = express.Router();

// GET /choices - Get all available choices
router.get("/choices", (req, res) => {
  try {
    res.json(gameLogic.choices);
  } catch (error) {
    console.error("Error getting choices:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET /choice - Get random choice
router.get("/choice", (req, res) => {
  try {
    const randomChoiceId = Math.floor(Math.random() * 5) + 1;
    const choice = gameLogic.getChoiceById(randomChoiceId);
    res.json(choice);
  } catch (error) {
    console.error("Error getting random choice:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /play - Play a round against the computer
router.post("/play", (req, res) => {
  try {
    const { player } = req.body;

    // Get computer's choice
    const computerChoiceId = Math.floor(Math.random() * 5) + 1;

    // Determine the winner
    const results = gameLogic.determineWinner(player, computerChoiceId);

    // Return the game result
    res.json({
      results: results,
      player: player,
      computer: computerChoiceId,
    });
  } catch (error) {
    console.error("Error playing game:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
