import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

export const Item = (props) => {
  const base = "http:\\\\localhost:4000\\";
  return (
    <div className='card-container'>
        <header className="card__header">
          <h1 className="product__title">
            {props.product.title}
          </h1>
        </header>
        <div className="card__image">
          <Link to={`/detail-product/${props.product._id}`}><img onClick={window.scrollTo(0,0)} src={base+props.product.imageURL} alt='error' /></Link>
        </div>
        <div className="card__content">
          <h2 className="product__price">
            ${props.product.price}
          </h2>
          {props.isDetail?<p className="product__description">
            {props.product.description}
          </p>:null}
        </div>
        <div className="card__actions">
          {!props.isDetail?<a href={`/detail-product/${props.product._id}`} className="btn">Details</a>
          :
          null}
          <div className='btn' onClick={props.addToCart}>
            <input type="hidden" name="id" value={props.product._id}/>
            <a>Add to Cart</a>
          </div>
        </div>
    </div>
  )
}
