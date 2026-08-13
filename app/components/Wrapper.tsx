"use client";

import { useState } from "react";
// import dynamic from "next/dynamic";

import MenuToggle from "./animation/MenuToggle";
import PortalSidebar from "./animation/PortalSidebar";
//   const PortalSidebar = dynamic(
//   () => import("@/app/components/animation/PortalSidebar"),
//   { ssr: false }
// );

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <MenuToggle
        open={open}
        onClick={() => setOpen((v) => !v)}
      />

      <PortalSidebar
        open={open}
        onClose={() => setOpen(false)}
      />

      {children}
    </>
  );
}