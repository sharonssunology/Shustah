// api/shustahs.js
import { SHUSTAH } from '../shustah.js';
import { INTERPRETATIONS } from '../interpretations.js';

export default function handler(req, res) {

  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  const degree = parseInt(req.query.degree);

  if (!card || card < 1 || card > 70) {
    return res.status(400).json({ error: "Invalid card." });
  }

  const shustah = SHUSTAH[card] || "Shustah card unavailable.";
  const interp = INTERPRETATIONS[card] || "Interpretation unavailable.";

  // 🔥 Auto-generate the correct image URL
  const image = `https://shustah.vercel.app/symbol-images/${card}.jpg`;

  res.status(200).json({
    card,
    shustah,
    interpretations: interp,
    image
  });
}
