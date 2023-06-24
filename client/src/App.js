import {Routes,Route} from 'react-router-dom'
import Home from './Pages/Home';
import Signup from './Pages/Signup';
function App() {
  return (
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/signup' element={<Signup/>}/>
      <Route exact path='/*' element={<Home/>}/>
    </Routes>
    </>
  );
}

export default App;
