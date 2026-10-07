import { useState } from "react";
import "./Caregivers.css";

const emptyForm = { name: "", email: "", role: "Parent" };

export default function Caregivers() {
  const [people, setPeople] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const canAdd = form.name.trim() !== "" && form.email.trim() !== "";

  const handleAdd = (e) => {
    e.preventDefault();
    if (!canAdd) return;
    setPeople([...people, { ...form, id: Date.now() }]);
    setForm(emptyForm);
  };

  const handleRemove = (id) => {
    setPeople(people.filter((p) => p.id !== id));
  };

  const initials = (name) =>
    name
      .trim()
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2);

  return (
    <div className="cg">
      <header className="cg-header">
        <h1 className="cg-title">Caregivers</h1>
        <p className="cg-sub">People who can follow the child's wellbeing and get alerts</p>
      </header>

      <section className="cg-panel">
        <h2 className="cg-panel-title">Add a caregiver</h2>
        <form className="cg-form" onSubmit={handleAdd}>
          <input
            className="cg-input"
            placeholder="Full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="cg-input"
            type="email"
            placeholder="name@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <select
            className="cg-input"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Parent</option>
            <option>Doctor</option>
            <option>Teacher</option>
            <option>Other</option>
          </select>
          <button className="cg-btn" type="submit" disabled={!canAdd}>
            Add
          </button>
        </form>
      </section>

      <section className="cg-panel">
        <h2 className="cg-panel-title">
          Your caregivers {people.length > 0 && `(${people.length})`}
        </h2>

        {people.length === 0 ? (
          <p className="cg-empty">No caregivers yet. Add the first one above.</p>
        ) : (
          <ul className="cg-list">
            {people.map((p) => (
              <li key={p.id} className="cg-item">
                <div className="cg-avatar">{initials(p.name)}</div>
                <div className="cg-info">
                  <span className="cg-name">{p.name}</span>
                  <span className="cg-email">{p.email}</span>
                </div>
                <span className="cg-role">{p.role}</span>
                <button
                  className="cg-remove"
                  onClick={() => handleRemove(p.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}