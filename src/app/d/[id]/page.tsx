"use client";
import "@blocknote/mantine/style.css";
import React, { useEffect, useState } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { TopMenubar } from "@/components/menu-bar";

export default function Docs({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const editor1 = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: ["Loading"],
      },
    ],
  });

  const [docTitle, setDoctitle] = useState("Untitled Document");

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const response = await fetch(`${API_URL}/doc/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }

        const data = await response.json();

        setDoctitle(data.doc.title);
        const blocks = await editor1.tryParseHTMLToBlocks(data.doc.html);
        editor1.replaceBlocks(editor1.document, blocks);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchAndSetData();
  }, [id, editor1, API_URL]);

  const saveDraft = async () => {
    console.log(id, "this is id");
    try {
      const html = await editor1.blocksToHTMLLossy(editor1.document);

      const response = await fetch(`${API_URL}/draft/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: docTitle, html, id }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save draft");
      }
    } catch (error) {
      console.error("Error saving to draft:", error);
    }
  };

  const saveToDrive = async () => {
    try {
      const html = await editor1.blocksToHTMLLossy(editor1.document);

      const response = await fetch(`${API_URL}/drive/save`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title: docTitle, html, id }),
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to save to drive");
      }

      console.log("Saved successfully");
    } catch (error) {
      console.error("Error saving to drive:", error);
    }
  };

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <input
        type="text"
        value={docTitle}
        onChange={(e) => setDoctitle(e.target.value)}
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          textAlign: "center",
          border: "none",
          outline: "none",
          width: "100%",
          maxWidth: "600px",
          marginBottom: "10px",
          background: "transparent",
        }}
      />

      <TopMenubar saveToDrive={saveToDrive} saveDraft={saveDraft} />

      <div style={{ width: "100%", maxWidth: "800px", marginTop: "16px" }}>
        <BlockNoteView editor={editor1} />
      </div>
    </div>
  );
}
