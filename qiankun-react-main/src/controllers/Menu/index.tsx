import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import './index.scss'

function Menu() {
  const navigate = useNavigate()

  const signOut = () => {
    window.localStorage.removeItem('sao_user')
    navigate('/login')
  }

  return (
    <div className="menu">
      <Button onClick={() => {navigate('/')}}>主应用</Button>
      <Button onClick={() => {navigate('/app-vue')}}>Vue</Button>
      <Button onClick={() => {navigate('/app-react')}}>React</Button>
      <Button type='link' onClick={() => {signOut()}}>注销</Button>
    </div>
  )
}

export default Menu