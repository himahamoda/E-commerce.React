import React, { useContext, useEffect, useState } from 'react'
import { WishContext } from '../../Context/WishlistContext'
import { BallTriangle } from 'react-loader-spinner'
import toast from 'react-hot-toast'


export default function Wishlist() {
  const [WishItem, setWishItem] = useState(null)
  const [Lodaing, setLodaing] = useState(true)

  let { getwish, removeWishItem } = useContext(WishContext)

  async function getwishitems() {
    let { data } = await getwish()
    setWishItem(data)
    setLodaing(false)
    console.log(data);

    
  }

  useEffect(() => {

    getwishitems()
  }, [])

  async function removeItem(id) {
    let { data } = await removeWishItem(id)
    console.log(data)
    setWishItem(data)
  }
  return (
    <>
      {Lodaing ?
        <div className="vh-100 w-100 d-flex justify-content-center align-items-center">

          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color='#4fa94d'
            wrapperClass={{}}
            wrapperStyle=""
            visible={true}

          />
        </div> : <div className=" bg-main-light p-4">
          <h2>wishlist</h2>
          <h2 className='h6 text-main fw-bold'>Total items:{WishItem.count} </h2>


          {WishItem.data.map((product) =>
            <div key={product.id} className="row border-bottom py-4">
              <div className="col-md-1">
                <img src={product.imageCover} className='w-100' alt="" />
              </div>
              <div className="col-md-11 d-flex justify-content-between">

                <div>
                  <h3 className='h6 fw-bold'> Title : {product.description.split(' ').slice(0.6).join(' ')}</h3>
                  <h3 className='h6 text-main '>price : {product.price}EGP</h3>
                  <button onClick={() => removeItem(product.id)} className='btn p-0'> <i className='fas fa-trash-can text-main'></i> Remove</button>
                </div>

              </div>
            </div>

          )}
        </div>
      }
    </>)
}




