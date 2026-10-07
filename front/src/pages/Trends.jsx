import { useState } from "react";
import "./Trends.css";

const data = {
  day: {
    labels: ["06", "08", "10", "12", "14", "16", "18"],
    temp: [36.6, 36.8, 37.4, 37.1, 36.9, 36.8, 36.7],
    heart: [78, 86, 112, 98, 90, 84, 80],
  },
  week: {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    temp: [37.2, 36.8, 36.9, 37.5, 36.7, 36.6, 36.8],
    heart: [95, 88, 90, 108, 86, 82, 85],
  },
};

function LineChart({ values, labels, min, max, color }) {
  const W = 600;
  const H = 220;
  const padL = 36;
  const padR = 16;
  const padT = 16;
  const padB = 28;

  const x = (i) => padL + (i * (W - padL - padR)) / (values.length - 1);
  const y = (v) => padT + (1 - (v - min) / (max - min)) * (H - padT - padB);

  const points = values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
  const gridValues = [0, 1, 2, 3].map((i) => min + ((max - min) * i) / 3);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="tr-svg">
      {gridValues.map((g) => (
        <g key={g}>
          <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="#e3eae8" />
          <text x={padL - 8} y={y(g) + 4} textAnchor="end" className="tr-axis">
            {Number.isInteger(g) ? g : g.toFixed(1)}
          </text>
        </g>
      ))}

      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {values.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r="4.5" fill="#fff" stroke={color} strokeWidth="2.5" />
      ))}

      {labels.map((l, i) => (
        <text key={l} x={x(i)} y={H - 6} textAnchor="middle" className="tr-axis">
          {l}
        </text>
      ))}
    </svg>
  );
}

function Stats({ values, unit }) {
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const fmt = (n) => (unit === "°C" ? n.toFixed(1) : Math.round(n));
  return (
    <div className="tr-stats">
      <div><span>Average</span><b>{fmt(avg)}{unit}</b></div>
      <div><span>Highest</span><b>{fmt(Math.max(...values))}{unit}</b></div>
      <div><span>Lowest</span><b>{fmt(Math.min(...values))}{unit}</b></div>
    </div>
  );
}

export default function Trends() {
  const [range, setRange] = useState("day");
  const d = data[range];

  return (
    <div className="tr">
      <header className="tr-header">
        <div>
          <h1 className="tr-title">Trends</h1>
          <p className="tr-sub">Track changes over time</p>
        </div>

        <div className="tr-toggle">
          <button
            className={range === "day" ? "active" : ""}
            onClick={() => setRange("day")}
          >
            Today
          </button>
          <button
            className={range === "week" ? "active" : ""}
            onClick={() => setRange("week")}
          >
            This week
          </button>
        </div>
      </header>

      <section className="tr-panel">
        <h2 className="tr-panel-title">Temperature</h2>
        <Stats values={d.temp} unit="°C" />
        <LineChart values={d.temp} labels={d.labels} min={36} max={38.5} color="#d9822b" />
      </section>

      <section className="tr-panel">
        <h2 className="tr-panel-title">Heart rate</h2>
        <Stats values={d.heart} unit=" bpm" />
        <LineChart values={d.heart} labels={d.labels} min={60} max={130} color="#1f7a72" />
      </section>
    </div>
  );
}