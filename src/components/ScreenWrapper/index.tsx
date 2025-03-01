import { BellOutlined, LogoutOutlined, MailOutlined } from "@ant-design/icons";
import { Layout, Menu, Space,  } from "antd";
import logo from 'assets/plem_with_name.png'
import squareLogo from 'assets/plem_square.png'
import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate,  } from "react-router-dom";
import { logout } from "reducers/authSlice";

const { Content, Sider } = Layout;

const ScreenWrapper = ({children}:{ children: React.ReactNode;}) => {
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const locations = useLocation()
    const logoutCallback = useCallback(()=>{
        dispatch(logout());
        navigate("/"); // Redirect to home after logout
     },[dispatch,navigate])

    const pathName = locations?.pathname.split('/')

    return (<div style={{minHeight: '100vh',backgroundColor: "#eee" }}>
                <Layout style={{ minHeight: "100vh" }}>
                    <Sider 
                        collapsed={isCollapsed} 
                        onCollapse={()=>{setIsCollapsed(p => !p)}} 
                        theme="dark" 
                        collapsible 
                        >
                        <div onClick={()=>{navigate('/')}} className="my-2">
                            <img
                                style={{ height: "35px"}}
                                alt="plem"
                                src={isCollapsed?squareLogo:logo}
                            />
                            <br/>
                        </div>
                        <Menu 
                            onClick={({key})=>{navigate(`/${key}`)}}
                            mode="inline" 
                            theme="dark" 
                            selectedKeys={pathName}
                        >
                            <Menu.Item key="notifications" icon={<BellOutlined />}>Notifications</Menu.Item>
                            <Menu.Item key="campaigns" icon={<MailOutlined />}>Campaigns</Menu.Item>
                            <Menu.Item key="3" icon={<LogoutOutlined />} onClick={logoutCallback}>
                                {isCollapsed?"":'Logout'}
                            </Menu.Item>
                        </Menu>
                    </Sider>
                <Layout>
                    <Content style={{ padding: 24 }}>
                        <Space direction="vertical" style={{ width: "100%" }}>
                            <div style={{paddingRight: 20, paddingLeft: 20}}>
                                {children}
                            </div>
                        </Space>
                    </Content>
                </Layout>
                </Layout>
            </div>
          );
  };
  
  export default ScreenWrapper;
  