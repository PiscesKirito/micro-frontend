import { useRoutes } from 'react-router-dom';
import routes from './routes';
import './App.scss'

function App() {
  return (
    <div className="App">
      { useRoutes(routes) }
    </div>
  )
}

export default App;