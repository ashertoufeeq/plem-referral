import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "reducers/authSlice";
import { Button, Input, Form, Typography, Row, Col } from "antd";
import { RootState, AppDispatch } from "store";
import { useCallback } from "react";
import { LoginReq } from "interfaces/entity/login";
import { useNavigate } from "react-router-dom";
import squareLogo from "assets/plem_square.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const loginUserCallback = useCallback(
    (values: LoginReq) => dispatch(loginUser({ ...values, navigate })),
    [dispatch, navigate]
  );

  const { loading } = useSelector((state: RootState) => state.auth);

  const onFinish = (values: LoginReq) => {
    loginUserCallback(values);
  };

  return (
    <div
      style={{ minHeight: "100vh", backgroundColor: "#eee" }}
    >
      <Row style={{ minHeight: "100vh" }} justify={"center"} align={"middle"}>
        <Col
          xs={24}
          md={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign:'center',
            padding: 24,
          }}
        >
      
      <div className="py-4" style={{ width: "100%", maxWidth: 360 }}>
            <div style={{ textAlign: "center", marginBottom: 30 }}>
              <img
                src={squareLogo}
                alt="Logo"
                style={{ width: 40, height: 40 }}
              />
              <Title level={2} style={{ marginTop: 10 }}>
                sign in
              </Title>
              <Text>
                welcome back to PLEM'box! Please enter your details below to
                sign in.
              </Text>
            </div>

            <Form
              requiredMark={false}
              name="login"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              layout="vertical"
            >
              <Form.Item
                label="email"
                name="email"
                rules={[{ required: true, message: "Please enter your email" }]}
              >
                <Input prefix={<UserOutlined />} type="email" />
              </Form.Item>
              <Form.Item
                label="password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password" },
                ]}
              >
                <Input.Password prefix={<LockOutlined />} />
              </Form.Item>
              <Form.Item style={{ marginBottom: 10 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                ></div>
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" loading={loading} block>
                  log in
                </Button>
              </Form.Item>

              <Text>
                don't have an account?{' '}<Button style={{margin:0, padding:0}} type="link"> contact us</Button>
              </Text>
            </Form>
          </div>
        </Col>
        <Col xs={0} md={12} style={{height:'100vh', margin: 0, padding:0}}>
          <div>
          {/* <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c"
              alt="Building"
              style={{ width: "100%", height: "100vh", objectFit: "cover" }}
            /> */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
