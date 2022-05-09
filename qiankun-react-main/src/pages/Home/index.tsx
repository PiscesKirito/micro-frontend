import './index.scss'
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Button, Popover } from 'antd';
import Menu from '../../controllers/Menu';
import { MenuOutlined } from '@ant-design/icons';
import { useAppDispatch } from '../../redux/store';
import { setUser } from '../../redux/slices/HomeSlice';

function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const user = window.localStorage.getItem("sao_user");

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else {
      dispatch(setUser(JSON.stringify(user)))
    }
  })

  return (
    <div className="sao">
      <Popover overlayClassName='pop_menu' placement='right' content={Menu} trigger='click'>
        <Button className="menu_button" icon={<MenuOutlined />}></Button>
      </Popover>
      <Outlet />
      <div className="qk_container"></div>
    </div>
  );
}

export default Home;
