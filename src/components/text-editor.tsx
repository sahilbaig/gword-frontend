"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { TopMenubar } from "./menu-bar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Editor() {
  const editor = useCreateBlockNote();

  // Save to Google Drive
  const saveToDrive = async () => {
    try {
      const html = await editor.blocksToHTMLLossy(editor.document);

      const response = await fetch(`${API_URL}/drive/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save to drive");
      }

      const data = await response.json();
      console.log("Saved successfully:", data);
    } catch (error) {
      console.error("Error saving to drive:", error);
    }
  };

  const saveDraft = async () => {
    try {
      const html = await editor.blocksToHTMLLossy(editor.document);

      const response = await fetch(`${API_URL}/draft/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving to draft:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Untitled Document</h1>

      {/* TopMenubar with saveToDrive function */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <h1>Untitled Document</h1>
        <TopMenubar saveToDrive={saveToDrive} saveDraft={saveDraft} />
      </div>

      {/* BlockNote Editor */}
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "16px" }}>
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
}
