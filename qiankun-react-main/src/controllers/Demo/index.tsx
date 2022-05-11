import { getUser } from "../../redux/slices/HomeSlice";
import { useAppSelector } from "../../redux/store";
import "./index.scss";

function Demo() {
  const user = useAppSelector(getUser);

  return (
    <div className="demo">
      <div className="droplets droplets1"></div>
      <div className="droplets droplets2"></div>
      <div className="demo_text">
        <span>Hi, {user}</span>
      </div>
    </div>
  );
}

export default Demo;
