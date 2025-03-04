"use client";

import dynamic from "next/dynamic";

export const Editor = dynamic(() => import("./text-editor"), {
  ssr: false,
});
