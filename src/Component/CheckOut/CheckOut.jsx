import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { CartContext } from '../../Context/Cartcontext';
import { useFormik } from 'formik';

export default function CheckOut() {

  let { id } = useParams()
  console.log(id);
  let { OnlinePyment } = useContext(CartContext)
  async function Chekout(values) {
    let response = await OnlinePyment(id, values)
    if (response?.data.status == "success") {
      window.location.href = response.data.session.url
    }

    console.log(response);
  }
  let formik = useFormik({
    initialValues: {
      details: '',
      phone: '',
      city: ''
    }, onSubmit: Chekout

  })

  return (
    <div className='w-50 mx-auto p-5' >

      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="details ">Adress</label>
        <input id='ttt' class="form-control form-control-lg mt-2 mb-3 " type="text" placeholder="your Adrees" aria-label=".form-control-lg example" value={formik.values.details}/>     
           

        <label htmlFor="details">Phone</label>
        <input id='phone' onChange={formik.handleChange} value={formik.values.phone} class="form-control form-control-lg mt-2 mb-3" type="tel" placeholder="tel" aria-label=".form-control-lg example" />
        
        <label htmlFor="details">City</label>
        <input id='city' onChange={formik.handleChange} value={formik.values.city} class="form-control form-control-lg mt-2 mb-3" type="text" placeholder="city" aria-label=".form-control-lg example" />

        <button type='submit' className='btn bg-main text-white w-100'>Pay</button>
        </form>
    </div>
    )}


