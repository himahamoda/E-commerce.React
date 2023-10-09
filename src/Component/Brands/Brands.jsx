

import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';

function Brands() {
  let [brands, setBrands] = useState([]);

  async function getBrands() {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    console.log(data.data);
    setBrands(data.data);
  }

  let { data, isLoading, isFetched, isError } = useQuery('Brands', {
    getBrands
  });

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <div className="container ">
      <div className="row py-2 ">
        {brands.map((brand) => (
          <div key={brand.id} className="col-md-3 brands p-4 mx-1 g-3 card cursor-pointer">
            <img src={brand.image} alt="" className='w-100' />
            <h2 className='text-center font-sm'>{brand.name}</h2>
          </div>
        ))}

      </div>

    </div>
  )
}

export default Brands;