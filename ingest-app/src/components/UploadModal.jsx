import { useEffect, useRef, useState } from "react";
import { PIPELINE_STEPS } from "../data/mockConversations";

export default function UploadModal({ open, onClose, onUploadStart, onComplete }) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [stepIndex, setStepIndex] = useState(-1); // -1 = not started, 0 = "upload" active
  const fileInputRef = useRef(null);
  const timersRef = useRef([]);

  const reset = () => {
    setUploading(false);
    setProgress(0);
    setStepIndex(-1);
    timersRef.current.forEach(clearInterval);
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  };

  useEffect(() => {
    if (!open) reset();
    return () => timersRef.current.forEach((t) => clearInterval(t) || clearTimeout(t));
  }, [open]);

  const handleFile = (file) => {
    if (!file) return;
    setUploading(true);
    const newId = onUploadStart(file);

    // Step 1: fake upload progress bar
    let pct = 0;
    const uploadTimer = setInterval(() => {
      pct += 10;
      setProgress(pct);
      if (pct >= 100) {
        clearInterval(uploadTimer);
        setStepIndex(0); // "upload" done, "trigger" becomes active next tick
        runPipeline(newId);
      }
    }, 120);
    timersRef.current.push(uploadTimer);
  };

  const runPipeline = (id) => {
    let i = 1; // index 0 (upload) already complete
    const stepTimer = setInterval(() => {
      if (i >= PIPELINE_STEPS.length) {
        clearInterval(stepTimer);
        onComplete(id);
        const closeTimer = setTimeout(() => onClose(), 500);
        timersRef.current.push(closeTimer);
        return;
      }
      setStepIndex(i);
      i++;
    }, 700);
    timersRef.current.push(stepTimer);
  };

  if (!open) return null;

  return (
    <div className="overlay show">
      <div className="modal">
        <h3>Upload a recording</h3>
        <p className="sub">
          Supported formats: .mp3, .wav, .m4a. The file is sent to S3, which triggers the ingestion pipeline.
        </p>

        {!uploading && (
          <div
            className={"dropzone" + (dragOver ? " drag-over" : "")}
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              if (e.dataTransfer.files.length) handleFile(e.dataTransfer.files[0]);
            }}
          >
            <div className="icon">🎙️</div>
            <div>
              <strong>Click to choose a file</strong> or drag it here
            </div>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          style={{ display: "none" }}
          onChange={(e) => e.target.files.length && handleFile(e.target.files[0])}
        />

        {uploading && (
          <div className="progress-wrap show">
            <div className="progress-bar-bg">
              <div className="progress-bar" style={{ width: `${progress}%` }} />
            </div>
            <div className="progress-label">
              {progress < 100 ? "Uploading to S3…" : "Upload complete — pipeline running…"}
            </div>
            <div className="pipeline-steps">
              {PIPELINE_STEPS.map((step, idx) => (
                <div
                  key={step.key}
                  className={
                    "step" + (idx < stepIndex ? " done" : idx === stepIndex ? " active" : "")
                  }
                >
                  <span className="marker" /> {step.label}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="modal-actions">
          <button className="btn btn-ghost" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
