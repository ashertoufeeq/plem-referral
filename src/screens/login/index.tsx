import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "reducers/authSlice";
import { Button, Input, Form, Typography, Card, Row, Col } from "antd";
import { RootState, AppDispatch } from "store";
import { useCallback } from "react";
import { LoginReq } from "interfaces/entity/login";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const loginUserCallback = useCallback((values: LoginReq)=>(dispatch(loginUser({...values,navigate}))),[dispatch,navigate])

  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = (values: LoginReq) => {
    loginUserCallback(values)
  };


  return (<div style={{ minHeight: "100vh", backgroundColor: "#eee", }}>
            <Row style={{minHeight: '100vh'}} justify={"center"} align={"middle"}>
              <Col md={14}>
                
              </Col>
              <Col md={8}>
              <Card style={{width:"100%"}}>
                <div style={{ width :'100%' }}>
                  <Title level={2}>login</Title>
                 
                  <Form form={form} onFinish={onFinish} layout="vertical">
                    <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]}>
                      <Input type="email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter your password" }]}>
                      <Input.Password />
                    </Form.Item>
                    <Button type="primary" htmlType="submit" loading={loading} block>
                      Login
                    </Button>
                  </Form>
                  <div>
                    <Typography.Paragraph style={{textAlign: 'left', marginTop: 10}}>
                        Need Help? Contact Us
                    </Typography.Paragraph>
                  </div>
                  <br/>
                  {/* {error && <Alert message={error? "Failed to login":""} type="error" showIcon />} */}
                </div>
              </Card>
              </Col>
              <Col md={2}>
              </Col>
            </Row>
          </div>
        );
};

export default Login;
