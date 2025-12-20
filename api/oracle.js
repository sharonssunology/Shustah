const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  try {
    // Load deck JSON from /data/deck.json
    const deckPath = path.join(process.cwd(), "data", "deck.json");
    const raw = fs.readFileSync(deckPath, "utf8");
    const deck = JSON.parse(raw);

    if (!Array.isArray(deck) || deck.length === 0) {
      return res.status(500).json({ error: "Deck is empty or invalid." });
    }

    // Optional: draw by id if ?id=#
    const idParam = req.query.id;
    if (idParam) {
      const idNum = Number(idParam);
      const found = deck.find((c) => Number(c.id) === idNum);
      if (!found) return res.status(404).json({ error: "Card not found." });
      return res.status(200).json(found);
    }

    // Otherwise random draw
    const pick = deck[Math.floor(Math.random() * deck.length)];

    // Return in a format similar to your existing oracle
    return res.status(200).json({
      id: pick.id,
      symbol: pick.title,     // keep naming flexible
      text: pick.text,
      tags: pick.tags || [],
      imageUrl: pick.imageUrl || ""
    });
  } catch (e) {
    console.error("Oracle error:", e);
    return res.status(500).json({ error: "Server error loading deck." });
  }
};

