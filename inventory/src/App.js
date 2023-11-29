import logo from './logo.svg';
import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Location } from './components/Location';
import Sidebar from './components/Sidebar.jsx';
import Item from './components/Item.js';
function App() {
  return (
    <>
      <BrowserRouter>
        <Sidebar>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/location/vessel' element={<Location />} />
            <Route path='/item' element={<Item />} />
          </Routes>
        </Sidebar>
      </BrowserRouter>
    </>
  );
}

export default App;
