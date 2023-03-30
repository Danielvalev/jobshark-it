import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { List } from './pages/List';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { useSelector } from 'react-redux';
import './stylessheets/custom-components.css';
import Loader from './components/Loader';



function App() {
  const {loading} = useSelector(state => state.alert);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>

          <Route path='/list' element={<ProtectedRoute><List /></ProtectedRoute>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
