import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";

export function TopMenubar({
  saveToDrive,
  saveDraft,
}: {
  saveToDrive: () => void;
  saveDraft: () => void;
}) {
  const [drafts, setDrafts] = useState<{ _id: string; title?: string }[]>([]);
  const router = useRouter();

  const fetchDrafts = async () => {
    try {
      const response = await fetch("http://localhost:5000/draft/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch drafts");

      const data = await response.json();
      setDrafts(data.drafts); // Store drafts in state
    } catch (error) {
      console.error("Error fetching drafts:", error);
    }
  };

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem onClick={saveDraft}>Save Draft</MenubarItem>
          <MenubarItem onClick={saveToDrive}>Save to Drive</MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger>Share</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Email link</MenubarItem>
              <MenubarItem>Messages</MenubarItem>
              <MenubarItem>Notes</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarSub onOpenChange={(open) => open && fetchDrafts()}>
            <MenubarSubTrigger>Show Drafts</MenubarSubTrigger>
            <MenubarSubContent>
              {drafts.length > 0 ? (
                drafts.map((draft) => (
                  <MenubarItem
                    key={draft._id}
                    onClick={() => router.push(`/d/${draft._id}`)}
                  >
                    {draft.title || "Untitled Draft"}
                  </MenubarItem>
                ))
              ) : (
                <MenubarItem disabled>No drafts found</MenubarItem>
              )}
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
