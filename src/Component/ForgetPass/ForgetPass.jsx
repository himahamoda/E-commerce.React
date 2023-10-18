import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'






export default function ForgetPass() {

    let validationSchema = Yup.object({
        email: Yup.string().required('email is required').email('enter a valid email')
    })
    async function sendcode(values) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
        console.log(data);
        if (data.statusMsg == 'success') {
            document.querySelector('.forgetpass').classList.add('d-none')
            document.querySelector('.resetode').classList.remove('d-none')
        }
    }

    let formik = useFormik({
        initialValues: {
            email: ''

        }, validationSchema: validationSchema
        , onSubmit: sendcode
    })


    // -------------------------------------------------------



    let validationSchema2 = Yup.object({
        resetCode: Yup.string()
    })

let navigate = useNavigate()
    async function SendData(values) {
        let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values)
        console.log(data);
        if(data.status == "Success"){
            navigate('/restCode')
        }
        // console.log(data);
        // if (data.statusMsg == 'success') {

        // }
        }

      let VerFormik= useFormik({
        initialValues:{
            resetCode:''
        },validationSchema:validationSchema2 
        ,onSubmit:SendData
    }
      )

    return (
        <>
            <div className='forgetpass'>
                <h3>Reset password</h3>
                <form onSubmit={formik.handleSubmit} className='w-75 mx-auto my-5'>
                    <label >Email</label>
                    <input  onBlur={formik.handleBlur} type="email" id='email' value={formik.values.email} onChange={formik.handleChange} name='email' className=' form-control' />
                    {formik.touched.email && formik.errors.email ? <p className='text-danger my-3'>{formik.errors.email} </p> : ' '}
                    <button disabled={!(formik.isValid && formik.dirty)}  type='submit' className='btn bg-main text-white my-3'> Send code</button>
                </form>
            </div>

            {/* -------------------------------------------------- */}

            <div className=' resetode d-none'>
                <h3>Code</h3>
                <form onSubmit={VerFormik.handleSubmit} className='w-75 mx-auto my-5'>
                    <label >Your Code</label>
                    <input  onBlur={VerFormik.handleBlur} type="resetcode" id='resetcode' value={VerFormik.values.email} onChange={VerFormik.handleChange} name='resetCode' className=' form-control' />
                    {VerFormik.touched.resetCode && VerFormik.errors.resetCode ? <p className='text-danger my-3'>{VerFormik.errors.resetCode} </p> : ' '}
                    <button disabled={!(VerFormik.isValid && VerFormik.dirty)}  type='submit' className='btn bg-main text-white my-3'> Verfiy code</button>
                </form>
            </div>



          
        </>

    )
}
