import React from 'react'
import slide1 from '../../Assets/images/slider-image-1.jpeg'
import slide2 from '../../Assets/images/slider-image-2.jpeg'
import slide3 from '../../Assets/images/slider-image-3.jpeg'
import blog1 from '../../Assets/images/blog-img-1.jpeg'
import blog2 from '../../Assets/images/blog-img-2.jpeg'
import Slider from "react-slick";

export default function MainS() {
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows:false
      };
    
  return <>


<div className="row gx-0 py-2">
    <div className="col-md-9">
    <Slider {...settings}>
    <img height={400} className='w-100' src={slide1} alt="image" />
    <img height={400} className='w-100' src={slide2} alt="image" />
    <img height={400} className='w-100' src={slide3} alt="image" />
  </Slider>
    </div>
    <div className="col-md-3">
      <img height={200} src={blog1} className='w-100' alt="" />
      <img height={200} src={blog2} className='w-100' alt="" />
    </div>
</div>
    </>
}
