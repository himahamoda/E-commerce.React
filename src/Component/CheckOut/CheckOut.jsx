import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/Cartcontext';
import {  useFormik } from 'formik';

export default function CheckOut() {

  let { id } = useParams()
  console.log(id);
  let { OnlinePyment } = useContext(CartContext)
  async function Chekout(values) {
    let response = await OnlinePyment(id , values)
    if (response?.data.status == "success") {
      window.location.href = response.data.session.url
    }

    console.log(response);
  }
  let formik = useFormik({
    initialValues:{
      details:'',
      phone:'',
      city:''
    }, onSubmit: Chekout

  })

  return (
    <div className='w-50 mx-auto p-5' >
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details">details</label>
        <input onChange={formik.handleChange} value={formik.values.details} type="text" name='details ' id='details' className='form-control  mb-3' />
        <label htmlFor="phone">phone</label>
        <input onChange={formik.handleChange} value={formik.values.phone} type="tel" name='phone' id='details' className='form-control mb-3' />
        <label htmlFor="city">city</label>
        <input onChange={formik.handleChange} value={formik.values.city} type="text" name='city ' id='city' className='form-control mb-3' />
      <button className='btn bg-main text-white w-100'>Pay</button>
      </form>

    </div>
  )
}
