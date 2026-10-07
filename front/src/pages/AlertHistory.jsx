import { useState } from "react";
import "./AlertHistory.css";

const alerts = [
  { id: 1, type: "temp", level: "alert", title: "High temperature", detail: "37.9°C detected", time: "Today, 09:20" },
  { id: 2, type: "location", level: "ok", title: "Arrived at school", detail: "Entered the safe zone", time: "Today, 08:05" },
  { id: 3, type: "heart", level: "warn", title: "High heart rate", detail: "112 bpm for 3 minutes", time: "Today, 07:50" },
  { id: 4, type: "location", level: "warn", title: "Left the safe zone", detail: "Moved 150 m away from home", time: "Yesterday, 16:30" },
  { id: 5, type: "battery", level: "warn", title: "Low battery", detail: "Band battery at 15%", time: "Yesterday, 14:10" },
  { id: 6, type: "temp", level: "alert", title: "High temperature", detail: "38.1°C detected", time: "Mon, 11:45" },
];

const filters = [
  { key: "all", label: "All" },
  { key: "temp", label: "Temperature" },
  { key: "heart", label: "Heart rate" },
  { key: "location", label: "Location" },
  { key: "battery", label: "Battery" },
];

export default function AlertHistory() {
  const [filter, setFilter] = useState("all");

  const visible =
    filter === "all" ? alerts : alerts.filter((a) => a.type === filter);

  return (
    <div className="ah">
      <header className="ah-header">
        <h1 className="ah-title">Alert history</h1>
        <p className="ah-sub">All alerts from the band, newest first</p>
      </header>

      <div className="ah-filters">
        {filters.map((f) => (
          <button
            key={f.key}
            className={filter === f.key ? "ah-chip active" : "ah-chip"}
            onClick={() => setFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="ah-list">
        {visible.map((a) => (
          <li key={a.id} className="ah-item">
            <span className={`ah-dot ${a.level}`} />
            <div className="ah-info">
              <span className="ah-item-title">{a.title}</span>
              <span className="ah-item-detail">{a.detail}</span>
            </div>
            <span className="ah-time">{a.time}</span>
          </li>
        ))}

        {visible.length === 0 && (
          <li className="ah-empty">No alerts in this category</li>
        )}
      </ul>
    </div>
  );
}