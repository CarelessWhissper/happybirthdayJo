"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Layout, LayoutHeader, LayoutSidebar, LayoutContent } from "@/components/ui/layout"; 

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogOut, FileText, User } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const menuItems = [
  {
    key: "/admin/dashboard/commissions",
    icon: <FileText className="h-4 w-4" />,
    label: "Commissions",
  },
  {
    key: "/admin/dashboard/users",
    icon: <User className="h-4 w-4" />,
    label: "Users",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [artistName, setArtistName] = useState("Loading...");

  useEffect(() => {
    async function fetchArtistInfo() {
      const { data, error } = await supabase
        .from("artist_info")
        .select("name")
        .single();

      if (data) {
        setArtistName(data.name);
      } else {
        setArtistName("Unknown Artist");
      }
    }

    fetchArtistInfo();
  }, []);

  const handleLogout = () => {
    // Clear token and redirect to login
    localStorage.removeItem("authToken");
    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white ${collapsed ? "w-16" : "w-64"} transition-all duration-300`}>
        <div className="h-16 flex items-center justify-center">
          {collapsed ? "🎨" : "Artist Panel"}
        </div>
        <nav className="mt-4">
          {menuItems.map((item) => (
            <div
              key={item.key}
              className={`flex items-center p-3 hover:bg-gray-700 cursor-pointer ${
                pathname === item.key ? "bg-gray-700" : ""
              }`}
              onClick={() => router.push(item.key)}
            >
              {item.icon}
              {!collapsed && <span className="ml-2">{item.label}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="text-xl font-bold">{artistName}</div>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-100 flex-1">{children}</main>
      </div>
    </div>
  );
}