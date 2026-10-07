import { useState } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

const features = [
  ["Live monitoring", "Heart rate and skin temperature from the bracelet, updated in real time."],
  ["Instant alerts", "Parents are notified when readings suggest possible distress."],
  ["Trends for the doctor", "Patterns over time that can be shared in a clear report."],
];

const braceletSteps = [
  {
    step: "01",
    title: "Sensory-Safe Sensing",
    desc: "A non-invasive, soft fabric bracelet engineered specifically for sensory sensitivity. Continuous micro-sensors read optical pulse (PPG) and skin surface temperature without causing tactile discomfort.",
    icon: "⌚",
  },
  {
    step: "02",
    title: "Encrypted Wireless Telemetry",
    desc: "Sensory data is encrypted immediately on the device and transmitted via ultra-low-power wireless protocol to the CalmiSense gateway and cloud pipeline.",
    icon: "📡",
  },
  {
    step: "03",
    title: "Proactive Distress Detection",
    desc: "Automated baseline comparison analyzes sudden physiological spikes against the child's personalized calm baseline, detecting agitation minutes before external distress shows.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Collaborative Care Insights",
    desc: "Sends real-time proactive prompts to parents and teachers to de-escalate anxiety early, while generating longitudinal clinical reports for the child's doctor.",
    icon: "🩺",
  },
];

const demoScenarios = {
  calm: {
    statusText: "Calm",
    statusClass: "ok",
    temp: "36.6",
    heart: "82",
    battery: "94",
    zone: "Sensory Room · Safe Zone",
    recentLog: "Baseline normal. Child has been calm and engaged for 40 mins.",
    heartChange: "Stable (+1 bpm/hr)",
    tempChange: "Normal baseline",
  },
  alert: {
    statusText: "Needs attention",
    statusClass: "alert",
    temp: "37.8",
    heart: "119",
    battery: "94",
    zone: "School Cafeteria · High Stimulus",
    recentLog: "Rapid heart rate & elevated skin temp detected. Early sensory alert sent.",
    heartChange: "Spike (+37 bpm in 4m)",
    tempChange: "Elevated (+1.1 °C)",
  },
};

export default function Landing() {
  const [demoState, setDemoState] = useState("calm");
  const currentDemo = demoScenarios[demoState];

  return (
    <div className="landing">

      {/* ── Fixed Navbar ── */}
      <header className="landing-nav">
        <strong className="landing-logo">🧠 CalmiSense</strong>
        <nav className="landing-nav-links">
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#bracelet" className="landing-nav-link">Smart Bracelet</a>
          <a href="#demo" className="landing-nav-link">Demo</a>
          <a href="#privacy" className="landing-nav-link">Privacy & Access</a>
          <a href="#about" className="landing-nav-link">About</a>
          <Link to="/login" className="landing-btn">Sign in</Link>
        </nav>
      </header>

      {/* ── Hero Section ── */}
      <section className="landing-hero" id="about">
        <div className="landing-hero-overlay" />
        <div className="landing-hero-text">
          <span className="landing-badge">Smart Autism Care</span>
          <h1>Understand your child's calm, before it turns into distress</h1>
          <p>
            A smart bracelet and a simple dashboard that help parents and
            doctors follow the wellbeing of children with autism.
          </p>
          <Link to="/login" className="landing-btn landing-btn-big">Get started →</Link>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="landing-features" id="features">
        {features.map(([title, text]) => (
          <div className="landing-card" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      {/* ── Smart Bracelet Explanation Section ── */}
      <section className="landing-section" id="bracelet">
        <div className="landing-section-header">
          <span className="landing-badge">Wearable Technology</span>
          <h2>How The Smart Bracelet Works</h2>
          <p>
            CalmiSense bridges physiological response and supportive care with a non-invasive
            wearable designed specifically for autistic children.
          </p>
        </div>

        <div className="bracelet-grid">
          {braceletSteps.map((b) => (
            <div className="bracelet-card" key={b.step}>
              <div className="bracelet-card-top">
                <span className="bracelet-step-num">{b.step}</span>
                <span className="bracelet-icon">{b.icon}</span>
              </div>
              <h3 className="bracelet-card-title">{b.title}</h3>
              <p className="bracelet-card-desc">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Stakeholder Benefits Breakdown */}
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-header">
              <span className="benefit-tag">For Parents & Caregivers</span>
              <h3>Peace of Mind & Early Intervention</h3>
            </div>
            <ul className="benefit-list">
              <li>Receive real-time mobile notifications before meltdowns become severe.</li>
              <li>Know when your child enters or leaves defined safe zones like school or home.</li>
              <li>Understand specific environments that trigger sensory overload.</li>
            </ul>
          </div>
          <div className="benefit-card">
            <div className="benefit-header">
              <span className="benefit-tag">For Doctors & Therapists</span>
              <h3>Objective Clinical Telemetry</h3>
            </div>
            <ul className="benefit-list">
              <li>Access verified heart rate variability and temperature trends over weeks and months.</li>
              <li>Evaluate behavioral therapies and medical interventions with concrete physiological data.</li>
              <li>Review automated summary reports to tailor individual care plans.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Demo / Example Child Status Section ── */}
      <section className="landing-section landing-section-alt" id="demo">
        <div className="landing-section-header">
          <span className="landing-badge landing-badge-demo">Simulated System Preview</span>
          <h2>Interactive Demo Dashboard</h2>
          <p>
            Experience how caregivers monitor child wellbeing in real time. 
            Try switching scenarios below to see how the system responds to calm versus elevated states.
          </p>
        </div>

        {/* Prominent Demo / Example Notice */}
        <div className="demo-disclaimer-card">
          <div className="demo-disclaimer-badge">EXAMPLE / DEMO DATA ONLY</div>
          <p className="demo-disclaimer-text">
            <strong>Notice for Evaluators & Visitors:</strong> All values, child statuses, and vitals shown in this interactive preview are 
            <strong> 100% simulated example data</strong> for demonstration purposes. No real patient or child data is stored, collected, or displayed on this public page.
          </p>
        </div>

        {/* Interactive Scenario Switcher */}
        <div className="demo-controls">
          <span className="demo-controls-label">Select Demo Scenario:</span>
          <button
            type="button"
            className={`demo-toggle-btn ${demoState === "calm" ? "active" : ""}`}
            onClick={() => setDemoState("calm")}
          >
            🟢 Normal / Calm State
          </button>
          <button
            type="button"
            className={`demo-toggle-btn ${demoState === "alert" ? "active" : ""}`}
            onClick={() => setDemoState("alert")}
          >
            🔴 Elevated Sensory Distress
          </button>
        </div>

        {/* Demo Dashboard Card */}
        <div className="demo-dashboard">
          <div className="demo-dash-header">
            <div className="demo-child-info">
              <div className="demo-avatar">AK</div>
              <div>
                <div className="demo-child-name">
                  Sample Profile (Alex K. · Age 8)
                  <span className="demo-tag">DEMO</span>
                </div>
                <div className="demo-child-meta">CalmiSense Band #CS-049 · Firmware v2.4 (Simulated)</div>
              </div>
            </div>

            <div className="demo-status-wrap">
              <span className={`lm-badge ${currentDemo.statusClass}`}>
                {currentDemo.statusText}
              </span>
            </div>
          </div>

          {/* Vitals telemetry cards */}
          <div className="demo-vitals-grid">
            <div className="demo-vital-card">
              <div className="demo-vital-header">
                <span className="demo-vital-label">Heart rate</span>
                <span className="demo-vital-icon">❤️</span>
              </div>
              <div className="demo-vital-val">
                {currentDemo.heart} <small>bpm</small>
              </div>
              <div className="demo-vital-sub">{currentDemo.heartChange}</div>
            </div>

            <div className="demo-vital-card">
              <div className="demo-vital-header">
                <span className="demo-vital-label">Skin temperature</span>
                <span className="demo-vital-icon">🌡️</span>
              </div>
              <div className="demo-vital-val">
                {currentDemo.temp} <small>°C</small>
              </div>
              <div className="demo-vital-sub">{currentDemo.tempChange}</div>
            </div>

            <div className="demo-vital-card">
              <div className="demo-vital-header">
                <span className="demo-vital-label">Band battery</span>
                <span className="demo-vital-icon">🔋</span>
              </div>
              <div className="demo-vital-val">
                {currentDemo.battery} <small>%</small>
              </div>
              <div className="demo-vital-sub">Wireless BLE Connected</div>
            </div>
          </div>

          {/* Location & Log Preview */}
          <div className="demo-details-grid">
            <div className="demo-detail-panel">
              <h4 className="demo-panel-title">Current Safe Zone & Location</h4>
              <div className="demo-location-box">
                <span className="demo-location-icon">📍</span>
                <div>
                  <strong>{currentDemo.zone}</strong>
                  <p>Geofenced location verified via GPS & Bluetooth beacon</p>
                </div>
              </div>
            </div>

            <div className="demo-detail-panel">
              <h4 className="demo-panel-title">Latest Telemetry Note</h4>
              <div className="demo-log-box">
                <span className="demo-log-time">{currentDemo.time}</span>
                <p className="demo-log-text">{currentDemo.recentLog}</p>
              </div>
            </div>
          </div>

          <div className="demo-card-footer">
            <span>ℹ️ Real dashboards provide continuous live updating and historical graphs upon caregiver sign in.</span>
            <Link to="/login" className="demo-sign-in-link">Sign in to view real dashboard →</Link>
          </div>
        </div>
      </section>

      {/* ── Privacy & Data Access Section ── */}
      <section className="landing-section" id="privacy">
        <div className="landing-section-header">
          <span className="landing-badge">Data Ethics & Security</span>
          <h2>Privacy, Confidentiality & Access Control</h2>
          <p>
            Children's health and behavioral telemetry is deeply personal. CalmiSense is engineered 
            with privacy-by-design principles to ensure data remains strictly protected.
          </p>
        </div>

        <div className="privacy-grid">
          <div className="privacy-card">
            <div className="privacy-icon">🛡️</div>
            <h3>Zero Public Exposure</h3>
            <p>
              Real child medical, location, and physiological records are 
              <strong> never shown publicly</strong> on this landing page or to unauthenticated users. 
              Only anonymous product features and simulated demo data are accessible here.
            </p>
          </div>

          <div className="privacy-card">
            <div className="privacy-icon">🔐</div>
            <h3>Authentication & Session Protection</h3>
            <p>
              Every access request to a child’s live stream, event alerts, or profile requires 
              authenticated login. Sessions are securely guarded and unauthenticated attempts 
              are immediately redirected to sign in.
            </p>
          </div>

          <div className="privacy-card">
            <div className="privacy-icon">👥</div>
            <h3>Role-Based Access Control (RBAC)</h3>
            <p>
              Access is segregated by caregiver permissions. Parents retain ownership of alerts and settings, 
              while authorized doctors receive clinical trend analytics strictly through parental authorization.
            </p>
          </div>
        </div>

        {/* Highlight Box for Evaluation Committee */}
        <div className="committee-box">
          <div className="committee-header">
            <span className="committee-badge">Project Presentation & Evaluation Standard</span>
            <h3>Compliance & Data Protection Architecture</h3>
          </div>
          <p>
            CalmiSense complies with pediatric confidentiality and ethical IoT health guidelines. 
            All simulated telemetry presented on public surfaces preserves complete privacy, and authentic 
            wearable data is restricted strictly to authorized family guardians and designated clinical specialists.
          </p>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <strong className="landing-logo">🧠 CalmiSense</strong>
          <p>Supporting children with autism through smart technology.</p>
          <p className="landing-footer-copy">© {new Date().getFullYear()} CalmiSense. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}