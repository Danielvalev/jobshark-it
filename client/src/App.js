import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Register />}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
