import React, { useContext, useState, useRef } from 'react'
import {Link} from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cartIcon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import MenuIcon from '@mui/icons-material/Menu'

export const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropDownToggle = (e) => {
      menuRef.current.classList.toggle('nav-menu-visible');
      e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt='logo' />
            <p>E-COMMERCE</p>
        </div>
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={() => {setMenu("shop")}}><Link to='/' style={{textDecoration: 'none', color: '#626262'}}>Shop</Link>{menu === 'shop' ? <hr/>:<> </>}</li>
            <li onClick={() => {setMenu("product")}}><Link to='/product' style={{textDecoration: 'none', color: '#626262'}}>Product</Link>{menu === 'product' ? <hr/>:<></>}</li>
            {localStorage.getItem('auth-token')?
            <li onClick={() => {setMenu("orders")}}><Link to='/orders' style={{textDecoration: 'none', color: '#626262'}}>Orders</Link>{menu === 'orders' ? <hr/>:<></>}</li>:
            null}
        </ul>
        <div className='nav-login-cart'>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
        :<Link to='/login'><button>Login</button></Link>}
        {localStorage.getItem('auth-token')
        ?<Link to='/cart'><img src={cartIcon} alt='logo' /></Link>
        :<Link to='/login'><img src={cartIcon} alt='logo' /></Link>}
        <div className='nav-cart-count'>{getTotalCartItems()}</div>
        <div className='nav-dropdown'><MenuIcon onClick={dropDownToggle} /></div>
        </div>
    </div>
  )
}
