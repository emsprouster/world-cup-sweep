import { kv } from "@vercel/kv";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { key } = req.body;
    if (!key || typeof key !== "string") {
      return res.status(400).json({ error: "Missing or invalid key" });
    }
    const current = (await kv.get("eliminations")) || [];
    const set = new Set(current);
    if (set.has(key)) {
      set.delete(key);
    } else {
      set.add(key);
    }
    const next = Array.from(set);
    await kv.set("eliminations", next);
    res.status(200).json({ eliminations: next });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update eliminations" });
  }
}
