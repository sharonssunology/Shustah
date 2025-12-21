// api/oracle.js (CommonJS)

const SHUS_CARDS = require("../data/shus-cards.js");
const SHUS_TEXTS = require("../data/shus-texts.js");

module.exports = (req, res) => {
  try {
    const degree = Math.floor(Math.random() * 360) + 1;

    const symbol = SHUS_CARDS[card];
    const text = SHUS_TEXTS[card];

    if (!symbol || !text) {
      return res.status(500).json({
        error: `Missing data for card ${card}`
      });
    }

    const imageUrl = `/shustah-images/${degree}.jpg`;

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
