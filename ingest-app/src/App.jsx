import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import ConversationList from "./components/ConversationList";
import DetailPane from "./components/DetailPane";
import UploadModal from "./components/UploadModal";
import { initialConversations } from "./data/mockConversations";

function App() {
  const [conversations, setConversations] = useState(initialConversations);
  const [activeId, setActiveId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const activeConversation = conversations.find((c) => c.id === activeId) || null;

  // Called the moment a file is picked — creates a "processing" placeholder
  // record (stand-in for the row that would appear once S3 + Lambda fire).
  const handleUploadStart = (file) => {
    const newId = "c" + Date.now();
    const placeholder = {
      id: newId,
      title: file.name.replace(/\.[^/.]+$/, ""),
      date: "Aug 10, 2026",
      duration: "—",
      status: "processing",
      summary: "",
      tags: [],
      actionItems: [],
      transcript: [],
    };
    setConversations((prev) => [placeholder, ...prev]);
    setActiveId(newId);
    return newId;
  };

  // Called once the simulated pipeline finishes — fills in mock results.
  // Swap this out for a real API response once Phases 2-5 are wired up.
  const handleUploadComplete = (id) => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "ready",
              duration: "4 min",
              summary:
                "This is a placeholder summary — once the speech-to-text and LLM steps are wired to real APIs, this will show the actual 3-sentence summary generated from your uploaded audio.",
              tags: ["new-upload", "auto-generated"],
              actionItems: ["Review the auto-generated summary once real APIs are connected"],
              transcript: [
                {
                  time: "00:00",
                  speaker: "Speaker 1",
                  text: "(Placeholder transcript — will populate once Speech-to-Text is integrated in Phase 2.)",
                },
              ],
            }
          : c
      )
    );
  };

  return (
    <div className="app">
      <Sidebar userEmail="johnchristinchriz@gmail.com" />
      <div className="main">
        <Topbar
          onUploadClick={() => setModalOpen(true)}
          onRecordClick={() =>
            alert("Live recording isn't wired up yet — that's a later phase. Use Upload for now.")
          }
        />
        <div className="content">
          <ConversationList
            conversations={conversations}
            activeId={activeId}
            onSelect={setActiveId}
          />
          <DetailPane conversation={activeConversation} />
        </div>
      </div>

      <UploadModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onUploadStart={handleUploadStart}
        onComplete={handleUploadComplete}
      />
    </div>
  );
}

export default App;
