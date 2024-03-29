
import './App.css';
import { Navbar } from './Components/Navbar/Navbar.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ShopCategory } from './Pages/ShopCategory.jsx';
import { LoginSignup } from './Pages/LoginSignup.jsx';
import { Shop } from './Pages/Shop.jsx';
import { Product } from './Pages/Product.jsx';
import { Cart } from './Pages/Cart.jsx';
import { Footer } from './Components/Footer/Footer.jsx';
import menBanner from './Components/Assets/banner_mens.png';
import womenBanner from './Components/Assets/banner_women.png';
import kidBanner from './Components/Assets/banner_kids.png';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<Shop/>} />
        <Route path='/product' element={<ShopCategory banner={menBanner} category="product" />} />
        <Route path='/detail-product' element={<Product />}>
          <Route path=':productId' element={<Product />}/>
        </Route>
        <Route path='/cart' element={<Cart/>} />
        <Route path='/login' element={<LoginSignup isLogin={true}/>} />  
        <Route path='/signup' element={<LoginSignup isLogin={false}/>} />  
      </Routes>
      <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
