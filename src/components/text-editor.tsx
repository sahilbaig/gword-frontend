"use client"; // Marks this as a Client Component (for Next.js)
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { Button } from "./ui/button";

export default function Editor() {
  // Creates a new editor instance
  const editor = useCreateBlockNote();
  function handleChange() {
    const blocks = editor.document;

    // Map through each block and log its details
    blocks.map((block) => {
      if (block) {
        console.log(block);
      }
    });

    // console.log(editor.document);
  }

  // Log the content
  return (
    <div>
      <Button onClick={handleChange}>Hello</Button>
      <BlockNoteView editor={editor} />
    </div>
  );
}
