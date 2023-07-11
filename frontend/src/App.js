import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import ProtectedViewPage from './components/ProtectedViewPage';
import Spinner from './components/Spinner';
import {useSelector} from 'react-redux'
import Profile from './pages/Profile/Profile';


function App() {
  const {loading} = useSelector(state => state.loader) 
  return (
    <>
    {loading && <Spinner/>}
      <Router>
        <Routes>
        <Route path='/' element={<ProtectedViewPage> <Home/> </ProtectedViewPage>} />
        <Route path='/profile' element = {<ProtectedViewPage> <Profile/> </ProtectedViewPage>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
