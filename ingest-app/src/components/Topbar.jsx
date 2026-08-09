export default function Topbar({ onUploadClick, onRecordClick }) {
  return (
    <div className="topbar">
      <div className="search">Search conversations…</div>
      <div className="topbar-actions">
        <button className="btn btn-ghost" onClick={onRecordClick}>
          🔴 Record
        </button>
        <button className="btn btn-primary" onClick={onUploadClick}>
          ⬆ Upload audio/video
        </button>
      </div>
    </div>
  );
}
