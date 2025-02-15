import {  Layout } from "antd";
import { Header } from "antd/es/layout/layout";
import logo from 'assets/plem_with_name.png'
import { useNavigate } from "react-router-dom";

const ScreenWrapper = ({children}:{ children: React.ReactNode;}) => {
    const navigate = useNavigate()

    return (<div style={{minHeight: '100vh',backgroundColor: "#eee" }}>
                <Layout>
                    <Header
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            paddingBottom: 5
                        }}
                    >
                    <div onClick={()=>{navigate('/notification-campaign')}}>
                        <img
                            style={{ height: "35px", marginLeft: 15 }}
                            alt="plem"
                            src={logo}
                        />
                    </div>
                    </Header>   
                </Layout>
                <br/>
                <div style={{paddingRight: 20, paddingLeft: 20}}>
                    {children}
                </div>
            </div>
          );
  };
  
  export default ScreenWrapper;
  