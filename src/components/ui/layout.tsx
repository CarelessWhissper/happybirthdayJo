import { ReactNode } from "react";

export function Layout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen flex">{children}</div>;
}

export function LayoutHeader({ children }: { children: ReactNode }) {
  return <header className="bg-gray-800 text-white p-4 flex justify-between items-center">{children}</header>;
}

export function LayoutSidebar({ children }: { children: ReactNode }) {
  return <aside className="bg-gray-900 text-white w-64">{children}</aside>;
}

export function LayoutContent({ children }: { children: ReactNode }) {
  return <main className="p-6 bg-gray-100 flex-1">{children}</main>;
}