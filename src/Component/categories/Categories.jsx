import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { BallTriangle } from 'react-loader-spinner'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'



export default function Featurd() {
  

    function getfeaturdProduct() {

        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
    }
    let { data, isLoading, isFetched, isError } = useQuery('featuredProduct',
        getfeaturdProduct, {
        // cacheTime:3000,
        // refetchOnMount:fals, 
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
                <h2 className='text-main text-center py-3'>All Categories </h2>

                <div className="row">
                    {data?.data.data.map((product) => <div key={product.id} className="col-md-3 gy-2">
                        <Link to={`/ProductsDetails/${product.id}`}>
                            <div className="product  py-3 px-2">
                                <img src={product.image} className="w-100"  height={300}  alt={product.title} />
                                <h2 className='font-sm text-main fw-bold'>{product.name}</h2>
                                <h2 className='h5 fw-bold'>{product.name}</h2>
                                <div className="d-flex justify-content-between mt-3">
                                    <div className="App">

                                    </div>
                                </div>
                              
                            </div>

                        </Link>

                    </div>)}
                </div>
            </div>
        )

        }
    </>

}
