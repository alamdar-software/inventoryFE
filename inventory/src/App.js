import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Location } from './components/Location';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/location/vessel' element={<Location />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
