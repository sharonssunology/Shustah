// api/oracle.js (CommonJS)

const SHUSTAH-CARDS = require("../data/shustah-cards.js");
const SHUSTAH-TEXTS = require("../data/shustah-texts.js");

module.exports = (req, res) => {
  try {
    const card = Math.floor(Math.random() * 70) + 1;

    const symbol = SHUSTAH_CARDS[card];
    const text = SHUSTAH_TEXTS[card];

    if (!symbol || !text) {
      return res.status(500).json({
        error: `Missing oracle data for card ${card}`
      });
    }

    const imageUrl = `/symbol-images/${card}.jpg`;

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    return res.status(200).json({
      card,
      symbol,
      text,
      imageUrl
    });

  } catch (err) {
    console.error("Oracle API error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
