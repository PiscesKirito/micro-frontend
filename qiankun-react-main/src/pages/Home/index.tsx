import "./index.scss";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Popover } from "antd";
import Menu from "../../controllers/Menu";
import { MenuOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/store";
import { getUser } from "../../redux/slices/HomeSlice";
import { registerMicroApps, start } from "qiankun";

function Home() {
  const navigate = useNavigate();

  const user = useAppSelector(getUser)

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    registerMicroApps([
      {
        name: "vueApp",
        entry: "//localhost:8080",
        container: "#qk_container",
        activeRule: "app-vue",
        props: {
          user: user
        }
      },
      {
        name: "reactApp",
        entry: "//localhost:8081",
        container: "#qk_container",
        activeRule: "app-react",
        props: {
          user: user
        }
      },
    ]);

    start();
  });

  return (
    <div className="sao">
      <Popover
        overlayClassName="pop_menu"
        placement="right"
        content={Menu}
        trigger="click"
      >
        <Button className="menu_button" icon={<MenuOutlined />}></Button>
      </Popover>
      <Outlet />
      <div id="qk_container"></div>
    </div>
  );
}

export default Home;
