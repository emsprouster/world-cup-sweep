import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const eliminations = (await kv.get("eliminations")) || [];
    res.status(200).json({ eliminations });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch eliminations" });
  }
}
