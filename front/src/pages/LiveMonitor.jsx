import { useState, useEffect } from "react";
import "./LiveMonitor.css";

function getStatus(temp, heart) {
  if (temp >= 37.8 || heart >= 120) return { label: "Needs attention", level: "alert" };
  if (temp >= 37.3 || heart >= 105) return { label: "A bit stressed", level: "warn" };
  return { label: "Calm", level: "ok" };
}

export default function LiveMonitor() {
  const [temp, setTemp] = useState(36.8);
  const [heart, setHeart] = useState(88);
  const [battery] = useState(76);

  // بيانات تجريبية بتتغير كل 3 ثواني لحد ما نربط الأسورة الحقيقية
  useEffect(() => {
    const id = setInterval(() => {
      setTemp((t) => +(t + (Math.random() - 0.5) * 0.2).toFixed(1));
      setHeart((h) => Math.round(h + (Math.random() - 0.5) * 6));
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const status = getStatus(temp, heart);

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
          <span className="lm-value">{temp}<small>°C</small></span>
        </div>
        <div className="lm-card">
          <span className="lm-label">Heart rate</span>
          <span className="lm-value">{heart}<small>bpm</small></span>
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
