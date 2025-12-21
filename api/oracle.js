// api/oracle.js  (ESM / Vercel style)

import ORACLE_SYMBOLS from "../data/shustah-cards.js";
import ORACLE_TEXTS from "../data/shustah-texts.js";

export default function handler(req, res) {
  try {
    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") return res.status(200).end();

    const card = Math.floor(Math.random() * 70) + 1;

    const symbol = ORACLE_SYMBOLS?.[card];
    const text = ORACLE_TEXTS?.[card];

    if (!symbol || !text) {
      return res.status(500).json({
        error: `Missing oracle data for card ${card}`,
        hasSymbol: !!symbol,
        hasText: !!text
      });
    }

    // Image path served from /public/symbol-images/
    const imageUrl = `/symbol-images/${card}.jpg`;

    return res.status(200).json({
      card,
      symbol,
      text,
      imageUrl
    });

  } catch (err) {
    console.error("Oracle API error:", err);
    return res.status(500).json({
      error: "Internal Server Error",
      detail: String(err?.message || err)
    });
  }
}
