import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './Pages/Login';
import Dashboard from './Pages/Dashboard';
import Private from './Components/Routes/Private';
import VerifyOtp from './Pages/VerifyOtp';
import NewPassword from './Pages/NewPassword';
function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route path="/dashboard" element={<Private/>}>
      <Route path='' element={<Dashboard/>}/>
      </Route>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/verifyOtp' element={<VerifyOtp/>}/>
      <Route exact path='/newPass' element={<NewPassword/>}/>
      <Route exact path='/*' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
