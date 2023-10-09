import React, { useContext, useState } from 'react'

import style from '../Login/Login.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { InfinitySpin } from 'react-loader-spinner'
import  { UserContext } from '../../Context/UserContext'


export default function Login() {
  let navigate = useNavigate()
  const [error, setError] = useState(null)
  const [lodaing, setlodaing] = useState(false)
  let {setUserToken} = useContext(UserContext)



  async function loginSubmit(values) {
    setlodaing(true)
    let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .catch(
        (err) => {
        setError(err.response.data.message)
        setlodaing(false)
      }
      )

    if (data.message === 'success') {
      
      setlodaing(false);
      localStorage.setItem('userToken' , data.token)
      setUserToken(data.token)
      navigate('/')
    }
  }

  let validationSchema = Yup.object({
    email: Yup.string().email('email invalid').required('email is Requierd'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{5,10}$/, 'password invalid').required('password is Requierd'),

  })

  let formik = useFormik({
    initialValues: {
      email: '',
      password: '',

    }, validationSchema, onSubmit: loginSubmit
  })
  return (
    <div className='w-75 mx-auto p-4'>
      <h2 className='text-center'> login now</h2>
      {error ? <div className="err ">{error}</div> : ''}
      <form onSubmit={formik.handleSubmit}>

        <label htmlFor="email">Email</label>
        <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className=' form-control mb-2' type="email" id="email" name='email' />
        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger py-2">{formik.errors.email} </div> : ''}

        <label htmlFor="password">Password</label>
        <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} className=' form-control mb-2' type="password" id="password" name='password' />
        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger py-2">{formik.errors.password} </div> : ''}

        {!lodaing ? <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-danger'>login</button>
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

