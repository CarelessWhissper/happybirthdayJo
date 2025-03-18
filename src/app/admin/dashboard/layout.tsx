"use client";

import { Layout, Menu, Button, Typography } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const { Header, Sider, Content } = Layout;

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const menuItems = [
  {
    key: "/admin/dashboard/commissions",
    icon: <FileTextOutlined />,
    label: "Commissions",
  },
  {
    key: "/admin/dashboard/users",
    icon: <UserOutlined />,
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
    <StyledLayout>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div
          style={{
            height: "64px",
            color: "white",
            textAlign: "center",
            lineHeight: "64px",
          }}
        >
          {collapsed ? "🎨" : "Artist Panel"}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[pathname]}
          onClick={({ key }) => router.push(key)}
          items={menuItems}
        />
      </Sider>
      <Layout>
        <StyledHeader>
          <ArtistName>{artistName}</ArtistName>
          <Button
            icon={<LogoutOutlined />}
            type="text"
            onClick={handleLogout}
            style={{ color: "white" }}
          >
            Logout
          </Button>
        </StyledHeader>
        <StyledContent>{children}</StyledContent>
      </Layout>
    </StyledLayout>
  );
}
const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

const StyledHeader = styled(Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background: #001529;
  color: white;
`;

const ArtistName = styled(Typography.Text)`
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
`;

const StyledContent = styled(Content)`
  padding: 24px;
  background-color: #fff;
`;
