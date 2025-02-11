import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";

const ForgotForm = () => {
    const redirect = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: yup.object({
            email: yup.string().email("Not a valid email address").max(64,"Too many characters.").required("Required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('/forgot', {
                    method: 'post',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if(response.status === 200){
                    alert(`Email Sent`);
                    redirect("/");
                } else {
                    alert(`Something went wrong = ${response.status}`);
                }
            } catch (error) {
                alert(`Error: ${response.status}`);
            }
        }
    })

    return (
        <>
            <form className='auth-form' onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>E-mail</label>
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                <input 
                id="email"
                name="email"
                type="email"
                pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?" 
                placeholder='user@email.com'
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

                <button type="submit" id="submit">
                Reset Password
                </button>

            </form>
        </>
  )
}

export default ForgotForm