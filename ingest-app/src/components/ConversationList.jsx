export default function ConversationList({ conversations, activeId, onSelect }) {
  return (
    <div className="list-pane">
      <div className="list-header">Recent Conversations</div>
      {conversations.map((c) => (
        <div
          key={c.id}
          className={"conv-item" + (c.id === activeId ? " active" : "")}
          onClick={() => onSelect(c.id)}
        >
          <div className="conv-title">
            {c.title}
            {c.status === "ready" ? (
              <span className="status-pill status-ready">Ready</span>
            ) : (
              <span className="status-pill status-processing">Processing</span>
            )}
          </div>
          <div className="conv-meta">
            {c.date} · {c.duration}
          </div>
          <div className="conv-snippet">
            {c.status === "ready"
              ? c.summary.slice(0, 90) + "…"
              : "Transcription and summary in progress…"}
          </div>
        </div>
      ))}
    </div>
  );
}
