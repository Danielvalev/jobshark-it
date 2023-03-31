import { Routes, Route, BrowserRouter} from 'react-router-dom';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { PublicRoute } from './components/PublicRoute';
import { useSelector } from 'react-redux';
import './stylessheets/custom-components.css';
import Loader from './components/Loader';
import './stylessheets/layout.css';
import AppliedJobs from './pages/user/AppliedJobs';
import Profile from './pages/user/profile';
import PostedJobs from './pages/user/postedjobs';
import NewEditJob from './pages/user/postedjobs/NewEditJob';


function App() {
  const {loading} = useSelector(state => state.alert);
  return (
    <div>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>}/>
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>}/>

          <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
          <Route path='/applied-jobs' element={<ProtectedRoute><AppliedJobs /></ProtectedRoute>}/>
          <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
          <Route path='/posted-jobs' element={<ProtectedRoute><PostedJobs /></ProtectedRoute>}/>
          <Route path='/posted-jobs/new' element={<ProtectedRoute><NewEditJob /></ProtectedRoute>}/>
          <Route path='/posted-jobs/edit/:id' element={<ProtectedRoute><NewEditJob /></ProtectedRoute>}/>





        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
