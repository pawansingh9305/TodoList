import Register from './Register';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import TodoList from './todolist'
import './index.css'
import Layout from './Layout';

function App() {

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  )    
}

export default App;