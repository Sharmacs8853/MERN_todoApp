import './App.css';
import Signup from './components/Signup';
import Home from './components/Home';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';

function App() {
  return (
    <div className="App">
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
