import React, { useState } from 'react'
import style from '../Register/Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'



export default function Register() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [lodaing, setlodaing] = useState(false)

  async function registerSubmit(values) {
    setlodaing(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
      .catch((err) => {
        setError(err.response.data.message)
        setlodaing(false)
      })
    if (data.message == 'success') {
      setlodaing(false)

      navigate('/login')
    }
  }


  let validationSchema = Yup.object({
    name: Yup.string().min(3, 'name must be more than 3').max(15, ' name must be less than 15 ').required('name is Requierd'),
    email: Yup.string().email('email invalid').required('email is Requierd'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password invalid').required('password is Requierd'),
    rePassword: Yup.string().oneOf([Yup.ref('password')], ' password not matched').required('Repassword is Requierd'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'must be egyption num ').required('phone is requierd')
  })

  //   function validate(values) {
  //     let errors ={}

  //     if (!values.name) {
  //       errors.name = 'name is Requierd'
  //     }
  //     else if (values.name.length < 3) {
  //       errors.name = 'name must be more than 3 charactr'
  //     }
  //     else if (values.name.length > 15) {
  //       errors.name = 'name must be less than 15 '
  //     }
  //   }

  //   if (!values.email) {
  //     errors.email = 'Email is requierd'
  //   }
  //   else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
  //     errors.email = 'email invalid'
  //   }

  //   if (!values.password) {
  //     errors.password = 'password is requierd'
  //   }
  //   else if (!/^[A-Z][a-z0-9]{5,10}$/.test(values.password)) {
  //     errors.password = 'password must with upperCAse'
  //     console.log(errors)
  // return errors
  //   }


  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    }, validationSchema, onSubmit: registerSubmit
  })
  return (
    <div className='w-75 mx-auto p-4'>
      <h2 className='text-center'> Register now</h2>
      {error ? <div className="err ">{error}</div> : ''}
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="name">Name</label>
        <input onChange={formik.handleChange} value={formik.values.name} onBlur={formik.handleBlur} className=' form-control mb-2' type="text" id="name" name='name' />
        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger py-2">{formik.errors.name} </div> : ''}


        <label htmlFor="email">Email</label>
        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className=' form-control mb-2' type="email" id="email" name='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email} </div> : ''}

        <label htmlFor="password">Password</label>
        <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className=' form-control mb-2' type="password" id="password" name='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password} </div> : ''}

        <label htmlFor="rePassword">rePassword</label>
        <input onChange={formik.handleChange} value={formik.values.rePassword} onBlur={formik.handleBlur} className=' form-control mb-2' type="password" id="rePassword" name='rePassword' />
        {formik.errors.rePassword && formik.touched.rePassword ? <div className="alert alert-danger py-2">{formik.errors.rePassword} </div> : ''}

        <label htmlFor="phone">Phone</label>
        <input onChange={formik.handleChange} value={formik.values.phone} onBlur={formik.handleBlur} className=' form-control mb-2' type="tel" id="phone" name='phone' />
        {formik.errors.phone && formik.touched.phone ? <div className="alert alert-danger py-2">{formik.errors.phone} </div> : ''}

        {!lodaing ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-danger'>register</button>
          : <button type='button' className='btn bg-danger text-light'>
            <InfinitySpin
              width='50'
              color='white'
              className="align-content-center "
            /></button>}


      </form>
    </div>
  )
}
