import { BellOutlined, LogoutOutlined, MailOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Menu, Space, Button, Drawer, Grid } from "antd";
import logo from "assets/plem_with_name.png";
import squareLogo from "assets/plem_square.png";
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "reducers/authSlice";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [mobileMenuVisible, setMobileMenuVisible] = useState<boolean>(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const locations = useLocation();
  const screens = useBreakpoint();

  const logoutCallback = useCallback(() => {
    dispatch(logout());
    navigate("/"); // Redirect to home after logout
  }, [dispatch, navigate]);

  const pathName = locations?.pathname.split("/");

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#eee" }}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar for large screens */}
        {screens.md ? (
          <Sider
            collapsed={isCollapsed}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
            theme="dark"
            collapsible
          >
            <div onClick={() => navigate("/")} className="my-2" style={{ textAlign: "center" }}>
              <img
                style={{ height: "35px" }}
                alt="plem"
                src={isCollapsed ? squareLogo : logo}
              />
            </div>
            <Menu
              onClick={({ key }) => navigate(`/${key}`)}
              mode="inline"
              theme="dark"
              selectedKeys={pathName}
            >
              <Menu.Item key="campaigns" icon={<MailOutlined />}>
                Campaigns
              </Menu.Item>
              <Menu.Item key="notifications" icon={<BellOutlined />}>
                Notifications
              </Menu.Item>
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutCallback}>
                {!isCollapsed && "Logout"}
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          // Mobile menu button
          <div style={{ padding: "10px", backgroundColor: "#001529", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Button type="text" icon={<MenuOutlined style={{color: "#fff"}}/>} onClick={() => setMobileMenuVisible(true)} />
            <img style={{ height: "35px" }} alt="plem" src={squareLogo} onClick={() => navigate("/")} />
          </div>
        )}

        {/* Mobile Sidebar (Drawer) */}
        <Drawer
          title="Plem box"
          placement="left"
          closable
          onClose={() => setMobileMenuVisible(false)}
          open={mobileMenuVisible}
        >
          <Menu
            onClick={({ key }) => {
              navigate(`/${key}`);
              setMobileMenuVisible(false);
            }}
            mode="inline"
            selectedKeys={pathName}
          >
            <Menu.Item key="campaigns" icon={<MailOutlined />}>
              Campaigns
            </Menu.Item>
            <Menu.Item key="notifications" icon={<BellOutlined />}>
              Notifications
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutCallback}>
              Logout
            </Menu.Item>
          </Menu>
        </Drawer>

        {/* Content Area */}
        <Layout>
          <Content style={{ padding: screens.md ? 24 : 12 }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ padding: screens.md ? "0 20px" : "0 10px" }}>{children}</div>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ScreenWrapper;
