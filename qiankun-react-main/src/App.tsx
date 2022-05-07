import { useRoutes } from 'react-router-dom';
import routes from './routes';
import logo from './assets/logo.svg';
import './App.scss'

function App() {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      { useRoutes(routes) }
    </div>
  )
}

export default App;