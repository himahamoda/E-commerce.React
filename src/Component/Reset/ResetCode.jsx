import axios from 'axios';
import { useFormik } from 'formik'
import React from 'react'

export default function ResetCode() {

    async function ResetPassword(values) {
        let { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
        console.log(data);

    }
    let formik = useFormik({
        initialValues: {
            email:'',
            newPassword:''
        },
        onSubmit: ResetPassword
    })

    return (
        <>
            <div>
                <form onSubmit={formik.handleSubmit} className='w-75 my-5 m-auto '>

                    <label>email</label>

                    <input type="email" onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className='form-control ' id='email' value={formik.values.email}/>

                    <label>newPassword</label>

                    <input type='password' onChange={formik.handleChange} onBlur={formik.handleBlur}
                        className='form-control' id='password' value={formik.values.newPassword}/>

                    <button type='submit' className='btn bg-main text-white my-3'> Reset Password</button>

                </form>
            </div>
        </>
    )
}
