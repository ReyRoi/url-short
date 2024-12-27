
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Signup></Signup>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/home' element={<Home></Home>}></Route>
      </Routes>
      
    </div>
  );
}

export default App;
