import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './Pages/Login';
// import dotenv from 'dotenv'
// dotenv.config()
function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/*' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
