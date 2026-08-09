const NAV_ITEMS = [
  { icon: "🏠", label: "Home" },
  { icon: "💬", label: "Chat" },
  { icon: "📁", label: "Folders" },
  { icon: "📡", label: "Channels" },
  { icon: "🔌", label: "Apps & Integrations" },
  { icon: "⚙️", label: "Settings" },
];

export default function Sidebar({ userEmail }) {
  return (
    <div className="sidebar">
      <div className="brand">
        <span className="dot" /> Ingest
      </div>
      <div className="nav">
        {NAV_ITEMS.map((item, i) => (
          <div key={item.label} className={"nav-item" + (i === 0 ? " active" : "")}>
            <span className="nav-icon">{item.icon}</span> {item.label}
          </div>
        ))}
      </div>
      <div className="sidebar-footer">Signed in as {userEmail}</div>
    </div>
  );
}
