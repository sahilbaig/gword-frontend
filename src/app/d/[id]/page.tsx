"use client";
import "@blocknote/mantine/style.css";
import React from "react";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import { Button } from "@/components/ui/button";

export default function Docs({ params }: { params: Promise<{ id: string }> }) {
  const fetchAndLogData = async () => {
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
      const html = data.doc.html;
      const blocks = await editor1.tryParseHTMLToBlocks(html);
      editor1.replaceBlocks(editor1.document, blocks); // Log the entire fetched data

      // Log the blocks array from the doc object
    } catch (error) {
      console.error("Error fetching document:", error);
    }
  };
  // Unwrap the params Promise using React.use()
  const { id } = React.use(params);
  const editor1 = useCreateBlockNote({
    initialContent: [
      {
        type: "paragraph",
        content: [
          "Hello, ",
          {
            type: "text",
            text: "world!",
            styles: {
              bold: true,
            },
          },
        ],
      },
    ],
  });

  const replace = async () => {
    const blocks = await editor1.tryParseHTMLToBlocks(
      "<p>imma do a lot of stuffs beware</p><p>asasasas</p><p></p>"
    );
    editor1.replaceBlocks(editor1.document, blocks);
    // editor1.replaceBlocks(editor1.document, sanitizedBlocks);
  };

  // Create a BlockNote editor instance

  return (
    <div>
      <h1>Dashboard for ID: {id}</h1>
      <Button
        onClick={() => {
          fetchAndLogData();
          //   replace();
        }}
      >
        Fetch and Logim
      </Button>
      {/* fetchDocument with ID */}
      <div style={{ width: "100%", maxWidth: "800px", marginTop: "16px" }}>
        <BlockNoteView editor={editor1} />
      </div>
    </div>
  );
}
