import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import Slider from "react-slick";

export default function CategorySlider() {
    
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 7,
        slidesToScroll: 1
      };

    function getCategory ()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }

    let {isLoading , isError , data} =useQuery('categorySlider', getCategory)
    console.log(data?.data.data);
    return <>
<div className="py-3">
{data?.data.data? <Slider {...settings}>
    {data?.data.data.map((Category)=> <img height={200} key={Category.id} src={Category.image} className='w-100'/> )}
    
    </Slider>:''}
</div>

   
    </>
}
