import { useEffect, useState } from "react";
import { assignments, people } from "./data";
import "./App.css";

const PERSON_ACCENTS = ["#B5D4F4", "#9FE1CB", "#FAC775", "#F4C0D1"];
const PERSON_TEXT =    ["#0C447C", "#085041", "#633806", "#72243E"];

export default function App() {
  const [eliminations, setEliminations] = useState(null);
  const [pending, setPending] = useState(null);

  useEffect(() => {
    fetch("/api/eliminations")
      .then((r) => r.json())
      .then((d) => setEliminations(new Set(d.eliminations)))
      .catch(() => setEliminations(new Set()));
  }, []);

  async function toggle(key) {
    if (pending) return;
    setPending(key);
    try {
      const res = await fetch("/api/toggle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key }),
      });
      const data = await res.json();
      setEliminations(new Set(data.eliminations));
    } catch {
      // optimistic fallback
      setEliminations((prev) => {
        const next = new Set(prev);
        next.has(key) ? next.delete(key) : next.add(key);
        return next;
      });
    } finally {
      setPending(null);
    }
  }

  if (!eliminations) {
    return (
      <div className="page-loading">
        <span>Loading draw…</span>
      </div>
    );
  }

  const activeCount = assignments.flatMap((a) => a).filter(
    (a) => !eliminations.has(a.key)
  ).length;

  return (
    <div className="page">
      <header className="header">
        <p className="eyebrow">Studio Odea · FIFA World Cup 2026</p>
        <h1>Sweepstakes</h1>
        <p className="subhead">
          {activeCount} of 48 teams still in the running
        </p>
      </header>

      <main className="grid">
        {people.map((person, pi) => {
          const teams = assignments[pi];
          const alive = teams.filter((t) => !eliminations.has(t.key)).length;
          return (
            <div className="card" key={person}>
              <div className="card-header">
                <div
                  className="avatar"
                  style={{
                    background: PERSON_ACCENTS[pi],
                    color: PERSON_TEXT[pi],
                  }}
                >
                  {person[0]}
                </div>
                <div>
                  <div className="person-name">{person}</div>
                  <div className="person-sub">
                    {alive} team{alive !== 1 ? "s" : ""} remaining
                  </div>
                </div>
              </div>

              <ul className="team-list">
                {teams.map((t) => {
                  const out = eliminations.has(t.key);
                  const loading = pending === t.key;
                  return (
                    <li key={t.key}>
                      <button
                        className={`team-row${out ? " eliminated" : ""}${loading ? " loading" : ""}`}
                        onClick={() => toggle(t.key)}
                        aria-label={`${out ? "Restore" : "Eliminate"} ${t.team}`}
                        title={out ? "Click to restore" : "Click to eliminate"}
                      >
                        <span className="team-left">
                          <span className="flag" aria-hidden="true">{t.flag}</span>
                          <span className="team-name-text">{t.team}</span>
                        </span>
                        <span className="group-badge">Group {t.group}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </main>

      <footer className="footer">
        <p>Click any team to mark them eliminated · Changes sync across all devices</p>
      </footer>
    </div>
  );
}
