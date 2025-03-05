"use client";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { TopMenubar } from "./menu-bar";

export default function Editor() {
  const editor = useCreateBlockNote();

  // Save to Google Drive
  const saveToDrive = async () => {
    try {
      const html = await editor.blocksToHTMLLossy(editor.document);

      const response = await fetch("http://localhost:5000/drive/save", {
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
      const blocks = editor.document;

      const response = await fetch("http://localhost:5000/draft/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ html, blocks }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving to draft:", error);
    }
  };

  const showDrafts = async () => {
    try {
      const response = await fetch("http://localhost:5000/draft/a", {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch drafts");
      }

      const data = await response.json();
      if (!data.drafts.length) {
        console.log("No drafts found");
        return;
      }

      // Convert HTML to blocks
      const blocks = await editor.tryParseHTMLToBlocks(data.drafts[0].html);
      editor.replaceBlocks(editor.document, blocks);
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1>Untitled Document</h1>

      {/* TopMenubar with saveToDrive function */}
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <TopMenubar
          saveToDrive={saveToDrive}
          saveDraft={saveDraft}
          showDrafts={showDrafts}
        />
      </div>

      {/* BlockNote Editor */}
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "16px" }}>
        <BlockNoteView editor={editor} />
      </div>
    </div>
  );
}
