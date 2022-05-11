import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../redux/slices/HomeSlice";
import { useAppDispatch } from "../../redux/store";
import "./index.scss";

function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = window.localStorage.getItem("sao_user");

  const [signInFormRef] = Form.useForm();

  const [remember, setRemember] = useState(user ? true : false);

  const signIn = (value: any) => {
    let str_value = JSON.stringify(value);
    if (remember) {
      window.localStorage.setItem("sao_user", str_value);
    }
    dispatch(setUser(value.username));
    navigate("/");
  };

  useEffect(() => {
    if (user) {
      signInFormRef.setFieldsValue(JSON.parse(user));
    }
  });

  return (
    <div className="sign">
      <div className="sign_in">
        <div className="sign_title">登录</div>
        <Form name="sign_in_form" form={signInFormRef} onFinish={signIn}>
          <Form.Item name="username">
            <Input
              size="large"
              placeholder="用户名"
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item name="password">
            <Input
              type="password"
              placeholder="密码"
              size="large"
              prefix={<LockOutlined />}
            />
          </Form.Item>
        </Form>
        <Checkbox
          checked={remember}
          onChange={(e) => {
            setRemember(e.target.checked);
          }}
        >
          记住我
        </Checkbox>
        <br />
        <Button
          className="sign_in_submit"
          onClick={() => {
            signInFormRef.submit();
          }}
        >
          登录
        </Button>
      </div>
      <span className="sign_anime"></span>
      <span className="sign_anime"></span>
      <span className="sign_anime"></span>
      <span className="sign_anime"></span>
    </div>
  );
}

export default Login;
