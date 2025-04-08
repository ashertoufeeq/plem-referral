import { BellOutlined, LogoutOutlined, MailOutlined, MenuOutlined } from "@ant-design/icons";
import { Layout, Menu, Space, Button, Drawer, Grid, Divider, Avatar } from "antd";
import logo from "assets/plem_with_name.png";
import squareLogo from "assets/plem_square.png";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "reducers/authSlice";
import { MainRoutes } from "constants/routes";
import { Header } from "antd/es/layout/layout";
import { theme } from "constants/theme";
import { IApplicationState } from "store";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

const ScreenWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(true);
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

  const user = useSelector((state:IApplicationState) => (state?.auth?.user))

  return (
    <div style={{ minHeight: "100vh"}}>
      <Layout style={{ minHeight: "100vh" }}>
        {/* Sidebar for large screens */}
        {screens.md ? (
          <Sider
            collapsed={isCollapsed}
            onCollapse={() => setIsCollapsed((prev) => !prev)}
            theme="light"
            collapsible
          >
            {/* <div onClick={() => navigate("/")} className="my-2" style={{ textAlign: "center" }}>
              <img
                style={{ height: "35px" }}
                alt="plem"
                src={isCollapsed ? squareLogo : logo}
              />
            </div> */}
            <Menu
              style={{minHeight: '100%'}}
              onClick={({ key }) => navigate(`/${key}`)}
              mode="inline"
              selectedKeys={pathName}
            >
              <div className="mt-4 row justify-center align-items-center"> 
                <img
                  style={{ height: "20px" }}
                  alt="plem"
                  src={isCollapsed ? squareLogo : logo}
                />
              </div>
            <Divider/>
            {(MainRoutes || []).map((Route)=>(
              <Menu.Item key={Route.key} icon={Route.icon}>
                {Route.name}
              </Menu.Item>
            ))}
              <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logoutCallback}>
                {!isCollapsed && "Logout"}
              </Menu.Item>
            </Menu>
          </Sider>
        ) : (
          // Mobile menu button
          <div style={{ padding: "10px", backgroundColor: theme.background, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
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
            <Space direction="vertical" style={{ width: "100%" }}>
            <Header style={{ display: 'flex', alignItems: 'center', backgroundColor: theme.background }}>
              <div className="row justify-end align-items-center" style={{ width: "100%" }}>
                <div className="mr-2">
                  {user?.email}
                </div>
                <div>
                  <Avatar/>
              </div>
              </div>
            </Header>
            </Space>
            <Divider style={{margin:0, padding: 0}}/>
          <Content style={{backgroundColor: theme.background }}>
            <Space direction="vertical" style={{ width: "100%" }}>
              <div style={{ padding: screens.md ? "0 20px" : "0 10px", backgroundColor: theme.background }}>{children}</div>
            </Space>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ScreenWrapper;
