import { useState, useEffect } from "react";
import "./LiveMonitor.css";

const API_URL = "https://maryam2005.pythonanywhere.com";

function fromModel(s) {
  const v = String(s).toLowerCase();
  if (v === "calm") return { label: "Calm", level: "ok" };
  if (v.includes("alert") || v.includes("high") || v.includes("meltdown"))
    return { label: "Needs attention", level: "alert" };
  return { label: "A bit stressed", level: "warn" };
}

export default function LiveMonitor() {
  const [temp, setTemp] = useState(null);
  const [heart, setHeart] = useState(null);
  const [battery] = useState(76);
  const [modelStatus, setModelStatus] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_URL}/api/children/1/current`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error(`Server error ${res.status}`);
        const data = await res.json();

        setTemp(data.temperature ?? null);
        setHeart(data.heart_rate ?? null);
        setModelStatus(data.status ?? null);
        setError("");
      } catch (e) {
        setError("Can't reach the server");
      }
    }
    load();
    const id = setInterval(load, 3000);
    return () => clearInterval(id);
  }, []);

  const status = modelStatus
    ? fromModel(modelStatus)
    : { label: error || "Waiting for data...", level: "warn" };

  const activity = [
    { time: "08:05", text: "Arrived at school" },
    { time: "07:40", text: "Left home" },
    { time: "07:15", text: "Heart rate back to normal" },
  ];

  return (
    <div className="lm">
      <header className="lm-header">
        <div>
          <h1 className="lm-title">Live monitor</h1>
          <p className="lm-sub">Updated a few seconds ago</p>
        </div>
        <span className={`lm-badge ${status.level}`}>{status.label}</span>
      </header>

      <section className="lm-cards">
        <div className="lm-card">
          <span className="lm-label">Temperature</span>
          <span className="lm-value">{temp ?? "--"}<small>°C</small></span>
        </div>
        <div className="lm-card">
          <span className="lm-label">Heart rate</span>
          <span className="lm-value">{heart ?? "--"}<small>bpm</small></span>
        </div>
        <div className="lm-card">
          <span className="lm-label">Band battery</span>
          <span className="lm-value">{battery}<small>%</small></span>
        </div>
      </section>

      <section className="lm-grid">
        <div className="lm-panel">
          <h2 className="lm-panel-title">Today</h2>
          <ul className="lm-list">
            {activity.map((a) => (
              <li key={a.time}>
                <span className="lm-time">{a.time}</span>
                <span>{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
