import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const { key } = req.body;
    if (!key || typeof key !== "string") {
      return res.status(400).json({ error: "Missing or invalid key" });
    }

    // Is this team already eliminated?
    const { data: existing, error: selErr } = await supabase
      .from("eliminations")
      .select("key")
      .eq("key", key)
      .maybeSingle();
    if (selErr) throw selErr;

    if (existing) {
      const { error } = await supabase.from("eliminations").delete().eq("key", key);
      if (error) throw error;
    } else {
      const { error } = await supabase.from("eliminations").insert({ key });
      if (error) throw error;
    }

    // Return the full current list
    const { data, error } = await supabase.from("eliminations").select("key");
    if (error) throw error;
    res.status(200).json({ eliminations: data.map((r) => r.key) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update eliminations" });
  }
}
