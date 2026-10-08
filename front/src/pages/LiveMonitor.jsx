import { useState, useEffect } from "react";
import "./LiveMonitor.css";
import { API_URL } from "../api";

const CHILD_ID = 1;

// مؤقتاً: تسجيل دخول تلقائي بالحساب التجريبي لحد ما نربط شاشة الدخول
async function getToken(force = false) {
  const saved = localStorage.getItem("token");
  if (saved && !force) return saved;
  const res = await fetch(`${API_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "test@example.com", password: "test1234" }),
  });
  const data = await res.json();
  localStorage.setItem("token", data.token);
  return data.token;
}

async function fetchCurrent(retry = true) {
  const token = await getToken(!retry);
  const res = await fetch(`${API_URL}/api/children/${CHILD_ID}/current`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (res.status === 401 && retry) return fetchCurrent(false);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error("Server error");
  return res.json();
}

const LEVELS = {
  calm: { label: "Calm", level: "ok" },
  early: { label: "A bit stressed", level: "warn" },
  distress: { label: "Needs attention", level: "alert" },
};

export default function LiveMonitor() {
  const [reading, setReading] = useState(null);
  const [message, setMessage] = useState("Loading...");
  const battery = 76; // الباك اند مش بيرجّع بطارية لسه

  useEffect(() => {
    let stop = false;
    const load = async () => {
      try {
        const r = await fetchCurrent();
        if (stop) return;
        if (r) setReading(r);
        else setMessage("No readings yet");
      } catch {
        if (!stop) setMessage("Cannot reach the server");
      }
    };
    load();
    const id = setInterval(load, 3000);
    return () => { stop = true; clearInterval(id); };
  }, []);

  const status = reading
    ? LEVELS[reading.status] || { label: reading.status, level: "ok" }
    : { label: message, level: "ok" };

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
          <p className="lm-sub">
            {reading ? `Last reading: ${reading.time}` : message}
          </p>
        </div>
        <span className={`lm-badge ${status.level}`}>{status.label}</span>
      </header>

      <section className="lm-cards">
        <div className="lm-card">
          <span className="lm-label">Temperature</span>
          <span className="lm-value">
            {reading ? reading.temperature : "--"}<small>°C</small>
          </span>
        </div>
        <div className="lm-card">
          <span className="lm-label">Heart rate</span>
          <span className="lm-value">
            {reading ? reading.heart_rate : "--"}<small>bpm</small>
          </span>
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
