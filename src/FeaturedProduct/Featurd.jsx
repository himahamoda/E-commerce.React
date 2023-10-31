import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import { CartContext } from '../Context/Cartcontext'
import toast from 'react-hot-toast'
import { WishContext } from '../Context/WishlistContext'
export default function Featurd() {


    let { AddWish } = useContext(WishContext);

    async function addproduct(productId) {

        let response = await AddWish(productId);
        console.log(response);

        if (data.status == "200 ") {
            toast.success(  "your item added to your wishlist"  ,{
      
              duration: 2000,
              position: 'top-center',
            })
      
          }

    }

    let { AddtoCart } = useContext(CartContext)

    async function AddCart(id) {
        let { data } = await AddtoCart(id)
        console.log(data);
        if (data.status == 'success') {
            toast.success(data.message, {

                duration: 2000,
                position: 'top-center',
            })

        }
    }
    // async function Addwish(id) {
    //     let { data } = await AddtoWish(id)
    //     console.log(data);
    //     if (data.status == 'success') {
    //         toast.success(data.message, {

    //             duration: 2000,
    //             position: 'top-right',
    //         })

    //     }
    // }

    function getfeaturdProduct() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    }
    let { data, isLoading, isFetched, isError } = useQuery('featuredProduct',
        getfeaturdProduct, {
        // cacheTime:3000,
        // refetchOnMount:false, 
        // staleTime:3000 

    }
    );

    console.log(data?.data.data);


    return <>

        {isLoading ? (
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
            </div>

        ) : (
            <div className="container py-2">
                <div className="row">
                    {data?.data.data.map((product) => <div key={product.Id} className="col-md-3 gy-2">

                        <Link to={`/ProductsDetails/${product.id}`}>
                            <div className="product cursor-pointer py-3 px-2">
                                <img src={product.imageCover} className="w-100" alt={product.title} />
                                <h2 className='font-sm text-main fw-bold'>{product.category.name}</h2>
                                <h2 className='h5 fw-bold'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
                                <div className="d-flex justify-content-between mt-3">
                                    <span>{product.price}EGP</span>
                                    <span><i className='fas fa-star rating-color'></i>{product.ratingsAverage}</span>
                                    <div className="App">
                                    </div>
                                    <Link to={' '}>
                                        <span onClick={() => addproduct(product._id)} className=''> <i className='fas fa-heart'></i></span>

                                    </Link>
                                </div>

                                <Link to={'/Cart'}>
                                    <button onClick={() => AddCart(product._id)} className='btn bg-main text-white w-100 btn-sm'> Add to cart</button>

                                </Link>
                            </div>

                        </Link>

                    </div>)}
                </div>
            </div>
        )

        }
    </>

}
