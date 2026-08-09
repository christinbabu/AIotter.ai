// Stand-in for records that will eventually come from DynamoDB via a real API.
export const initialConversations = [
  {
    id: "c1",
    title: "Weekly Product Sync",
    date: "Aug 8, 2026",
    duration: "32 min",
    status: "ready",
    summary:
      "The team reviewed the ingestion pipeline milestone plan, agreed to prioritize the S3-to-Lambda trigger this week, and flagged the need for a cost alarm on Transcribe usage before wider rollout.",
    tags: ["planning", "pipeline", "aws"],
    actionItems: [
      "Set up S3 event trigger for the ingest bucket",
      "Draft IAM role with least-privilege permissions",
      "Add CloudWatch billing alarm for Transcribe",
    ],
    transcript: [
      { time: "00:00", speaker: "Chris", text: "Let's start with where we left off on the pipeline roadmap." },
      { time: "00:14", speaker: "Chris", text: "Phase zero and one are basically done — bucket and Lambda are wired up." },
      { time: "00:41", speaker: "Chris", text: "Next up is getting the upload interface talking to that bucket directly." },
    ],
  },
  {
    id: "c2",
    title: "Client Onboarding Call",
    date: "Aug 6, 2026",
    duration: "18 min",
    status: "ready",
    summary:
      "Walked the client through the media tagging use case, confirmed their video files are typically under 200MB, and agreed on a follow-up demo once transcription and summarization are live.",
    tags: ["client", "demo"],
    actionItems: [
      "Send follow-up demo invite for next sprint",
      "Confirm max file size limits with client",
    ],
    transcript: [
      { time: "00:00", speaker: "Client", text: "We mostly work with short-form video, so files stay under 200MB." },
      { time: "00:22", speaker: "Chris", text: "Good — that fits comfortably within Lambda's payload limits via S3." },
    ],
  },
];

export const PIPELINE_STEPS = [
  { key: "upload", label: "Upload to S3" },
  { key: "trigger", label: "Lambda triggered" },
  { key: "transcribe", label: "Speech-to-text" },
  { key: "summarize", label: "LLM summary & tags" },
  { key: "store", label: "Saved to database" },
  { key: "notify", label: "Email notification sent" },
];
