"use client";
import "@blocknote/mantine/style.css";
import React, { useEffect } from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Button } from "@/components/ui/button";

export default function Docs({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const { id } = React.use(params);

  // Create a BlockNote editor instance
  const editor1 = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: ["Loading"],
      },
    ],
  });

  // Fetch data and update editor content automatically on mount
  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doc/${id}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }

        const data = await response.json();
        console.log("Fetched document data:", data.doc.html);

        // Parse the fetched HTML and update the editor content
        const html = data.doc.html;
        const blocks = await editor1.tryParseHTMLToBlocks(html);
        editor1.replaceBlocks(editor1.document, blocks);
      } catch (error) {
        console.error("Error fetching document:", error);
      }
    };

    fetchAndSetData(); // Call the function to fetch and set data
  }, [id, editor1]); // Run this effect when `id` or `editor1` changes

  return (
    <div>
      <h1>Dashboard for ID: {id}</h1>
      <Button
        onClick={async () => {
          try {
            const response = await fetch(`http://localhost:5000/doc/${id}`, {
              method: "GET",
              credentials: "include",
            });

            if (!response.ok) {
              throw new Error("Failed to fetch document");
            }

            const data = await response.json();
            console.log("Fetched document data:", data.doc.html);

            // Parse the fetched HTML and update the editor content
            const html = data.doc.html;
            const blocks = await editor1.tryParseHTMLToBlocks(html);
            editor1.replaceBlocks(editor1.document, blocks);
          } catch (error) {
            console.error("Error fetching document:", error);
          }
        }}
      >
        Fetch and Log
      </Button>
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "16px" }}>
        <BlockNoteView editor={editor1} />
      </div>
    </div>
  );
}
