import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import removeIcon from '../Assets/cart_cross_icon.png'

export const CartItems = () => {
    const base = "http:\\\\localhost:4000\\";
    const {allProducts, cartProducts, removeFromCart, getTotalCartAmount, loadingCart} = useContext(ShopContext);
    const click = (e)=>{
        console.log(cartProducts);
        console.log(cartProducts.data.items);
    }
  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {!loadingCart? cartProducts.data.items.map((item, index)=>{
            return(
                <div>
                    <div className='cartitems-format cartitems-format-main'>
                    <div><img src={item.image} alt="" className="carticon-product-icon" /></div>
                        <p>{item.name}</p>
                        <p>${200}</p>
                        <p>{item.quantity}</p>
                        <p>{Number(item.price) * Number(item.quantity)}</p>
                        {/* <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>{item.price * cartItems[item.id]}</p>
                        <div>
                            <img src={removeIcon} onClick={() => {removeFromCart(e.id)}} alt='' className='cartitems-remove-icon' />
                        </div> */}
                    </div>
                    <hr />
                </div>

            )
        }):null}
        <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1 onClick={click}>Cart Totals</h1>
                <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        {/* <p>${getTotalCartAmount()}</p> */}
                    </div>
                </div>
                <hr />
                <div>
                    <div className='cartitems-total-item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                </div>
                <hr />
                <div>
                    <div className='cartitems-total-item'>
                        <p>Total</p>
                        {/* <p>${getTotalCartAmount()}</p> */}
                    </div>
                </div>
                <button>CHECKOUT</button>
            </div>
            <div className='cartitems-promocode'>
                <p>If you have a promo code, Enter it here</p>
                <div className='cartitems-promobox'>
                    <input type='text' placeholder='promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
