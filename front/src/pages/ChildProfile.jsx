import { useState } from "react";
import "./ChildProfile.css";

const empty = {
  name: "",
  age: "",
  school: "",
  bandId: "",
  emergencyName: "",
  emergencyPhone: "",
  notes: "",
};

const fields = [
  { key: "name", label: "Full name", placeholder: "Child's full name" },
  { key: "age", label: "Age", placeholder: "Age" },
  { key: "school", label: "School", placeholder: "School name" },
  { key: "bandId", label: "Band ID", placeholder: "Written on the band" },
  { key: "emergencyName", label: "Emergency contact", placeholder: "Contact name" },
  { key: "emergencyPhone", label: "Emergency phone", placeholder: "Phone number" },
];

export default function ChildProfile() {
  const [profile, setProfile] = useState(empty);
  const [draft, setDraft] = useState(empty);
  const [editing, setEditing] = useState(true);

  const hasProfile = profile.name.trim() !== "";

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const initials = hasProfile
    ? profile.name
        .trim()
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
    : "?";

  return (
    <div className="cp">
      <header className="cp-header">
        <div className="cp-who">
          <div className="cp-avatar">{initials}</div>
          <div>
            <h1 className="cp-title">
              {hasProfile ? profile.name : "Child profile"}
            </h1>
            <p className="cp-sub">
              {hasProfile
                ? profile.school || "No school added"
                : "Add your child's details"}
            </p>
          </div>
        </div>

        {!editing ? (
          <button className="cp-btn primary" onClick={() => setEditing(true)}>
            Edit profile
          </button>
        ) : (
          <div className="cp-actions">
            {hasProfile && (
              <button className="cp-btn" onClick={handleCancel}>
                Cancel
              </button>
            )}
            <button
              className="cp-btn primary"
              onClick={handleSave}
              disabled={draft.name.trim() === ""}
            >
              Save
            </button>
          </div>
        )}
      </header>

      <section className="cp-panel">
        <h2 className="cp-panel-title">Details</h2>
        <div className="cp-grid">
          {fields.map((f) => (
            <div key={f.key} className="cp-field">
              <label className="cp-label">{f.label}</label>
              {editing ? (
                <input
                  className="cp-input"
                  placeholder={f.placeholder}
                  value={draft[f.key]}
                  onChange={(e) =>
                    setDraft({ ...draft, [f.key]: e.target.value })
                  }
                />
              ) : (
                <span className="cp-value">{profile[f.key] || "—"}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="cp-panel">
        <h2 className="cp-panel-title">Notes for caregivers</h2>
        {editing ? (
          <textarea
            className="cp-input cp-textarea"
            placeholder="Anything caregivers should know about your child"
            value={draft.notes}
            onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
          />
        ) : (
          <p className="cp-notes">{profile.notes || "No notes yet"}</p>
        )}
      </section>
    </div>
  );
}