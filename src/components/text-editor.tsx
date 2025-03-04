"use client"; // Marks this as a Client Component (for Next.js)
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";

import styles from "./text-editor.module.css";
export default function Editor() {
  // Creates a new editor instance with initial content
  const editor = useCreateBlockNote({
    initialContent: [
      { type: "paragraph", content: "Welcome to this demo!" },
      { type: "paragraph", content: "Text should now be blue" },
      { type: "paragraph", content: "Try using the '/' key for options" },
      { type: "paragraph" },
    ],
  });

  return (
    <div>
      <BlockNoteView editor={editor} className={styles.customEditor} />
    </div>
  );
}
