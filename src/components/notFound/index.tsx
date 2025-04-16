import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Result
      status="404"
      title="404"
      subTitle="the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/")}>
          back to home
        </Button>
      }
    />
  );
};

export default NotFound;
