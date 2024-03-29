import React, { useEffect, useState } from 'react'
import './NewCollections.css'
import newCollections from '../Assets/new_collections.js'
import {Item} from '../Item/Item.jsx'

export const NewCollections = () => {
  // const [newCollections, setNewCollections] = useState([]);

  // useEffect(()=>{
  //   fetch('http://localhost:4000/newcollections')
  //   .then((response)=> response.json())
  //   .then((data)=>setNewCollections(data));
  // }, []);

  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className='collections'>
            {newCollections.map((item, i) => {
              return <Item 
                    key={i} 
                    id={item.id} 
                    name={item.name} 
                    image={item.image} 
                    newPrice={item.new_price} 
                    oldPrice={item.old_price}
                />
            })}
        </div>
    </div>
  )
}
