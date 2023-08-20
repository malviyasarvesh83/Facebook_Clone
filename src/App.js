import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Homepage from './components/Homepage';
import Cart from './components/Cart';
import ProductDetail from './components/ProductDetail';
import MyAccount from './components/MyAccount';
import { Box } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Box style={{marginTop: 64}}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/productDetails/:id' element={<ProductDetail />} />
          <Route path='/myAccount' element={<MyAccount />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
