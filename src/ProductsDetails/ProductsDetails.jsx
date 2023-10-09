import axios from 'axios'
import React, { useContext } from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { CartContext } from '../Context/Cartcontext'
import toast from 'react-hot-toast'
import Slider from 'react-slick'

export default function ProductsDetails() {

    let { AddtoCart } = useContext(CartContext)
    async function AddCart(id) {
        let { data } = await AddtoCart(id)
        if (data.status == 'success') {
            toast.success(data.message, {

                duration: 2000,
                position: 'top-right',
            })
        }
    }
    let params = useParams()

    function getProductsDetails(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    let { isLoading, isError, data } = useQuery('/ProductsDetails', () => getProductsDetails(params.id))
    console.log(data?.data.data)

    var settings = {
        dots: true,
        infinite: true,
        speed: 400,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    return <>

        {data?.data.data ? <div className='row py-2 align-items-center'>
            <div className="col-md-4">

                <Slider {...settings}>
                    {data?.data.data.images.map((img)=>(
                <img className='w-100' src={img} alt={data?.data.data.title} />

                    ))}
                </Slider>
            </div>
            <div className="col-md-8">
                <h2 className='h5' >{data?.data.data.title}</h2>
                <p>{data?.data.data.description}</p>
                <h6>{data?.data.data.category.name}</h6>
                <h6>{data?.data.data.price} EGP</h6>
                <div className='d-flex justify-content-between'>
                    <span>ratingsQuantity{data?.data.data.ratingsQuantity}</span>
                    <span><i className='fas fa-star rating-color'></i> {data?.data.data.ratingsAverage}</span>
                </div>
                <button onClick={() => AddCart(data?.data.data.id)} className='btn bg-main text-white w-100 mt-4'> Add to cart</button>
            </div>
        </div> : ""}
    </>

}
