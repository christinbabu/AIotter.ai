export default function DetailPane({ conversation }) {
  if (!conversation) {
    return (
      <div className="detail-pane">
        <div className="detail-empty">
          <div className="big">No conversation selected</div>
          <div>Upload an audio file or select one from the list to see its transcript and summary.</div>
        </div>
      </div>
    );
  }

  const c = conversation;

  if (c.status !== "ready") {
    return (
      <div className="detail-pane">
        <div className="detail-title">{c.title}</div>
        <div className="detail-meta">
          {c.date} · {c.duration} · <span className="status-pill status-processing">Processing</span>
        </div>
        <div className="card">
          <h4>Status</h4>
          <div className="summary-text">
            Your file is running through the pipeline: transcription → summarization → storage → notification.
            This view will update automatically once it's ready.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-pane">
      <div className="detail-title">{c.title}</div>
      <div className="detail-meta">
        {c.date} · {c.duration} · <span className="status-pill status-ready">Ready</span>
      </div>

      <div className="tabs">
        <div className="tab active">Summary</div>
        <div className="tab">Transcript</div>
      </div>

      <div className="card">
        <h4>Summary</h4>
        <div className="summary-text">{c.summary}</div>
        <div style={{ marginTop: 12 }}>
          {c.tags.map((t) => (
            <span className="tag" key={t}>
              #{t}
            </span>
          ))}
        </div>
      </div>

      <div className="card">
        <h4>Action Items</h4>
        {c.actionItems.map((a, i) => (
          <div className="action-item" key={i}>
            <input type="checkbox" />
            <div>{a}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <h4>Transcript</h4>
        {c.transcript.map((t, i) => (
          <div className="transcript-line" key={i}>
            <div className="transcript-time">{t.time}</div>
            <div>
              <div className="transcript-speaker">{t.speaker}</div>
              <div className="transcript-text">{t.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
