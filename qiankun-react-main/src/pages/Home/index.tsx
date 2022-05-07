import './index.scss'
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate()
  const user = window.localStorage.getItem("sao_user");

  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  })

  return (
    <div className="sao">

    </div>
  );
}

export default Home;
