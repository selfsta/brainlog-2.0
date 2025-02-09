import React from 'react'
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { useSignIn } from 'react-auth-kit';

const Login = () => {
    const redirect = useNavigate();
    const signIn = useSignIn();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: yup.object({
            email: yup.string().email("Not a valid email address").max(64,"Too many characters.").required("Required"),
            password: yup.string().required("Required")
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('/auth', {
                    method: 'POST',
                    body: JSON.stringify(values),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if(response.status == 200){
                    const {token, _id} = await response.json()
                    signIn({
                        token: token,
                        expiresIn: 3600,
                        tokenType: "Bearer",
                        authState: {email: values.email, _id: _id}
                    })
                    redirect("/")
                } else {
                    alert(`Incorrect user or password.`);
                }
            } catch (error) {
                alert('Something went wrong');
            }
        }
    })

    return (
        <>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='email'>Email</label>
                {formik.touched.email && formik.errors.email ? <p>{formik.errors.email}</p> : null}
                <input 
                id="email"
                name="email"
                type="email"
                pattern="[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+(\.[\-a-zA-Z0-9~!$%^&amp;*_=+\}\{'?]+)*@[a-zA-Z0-9_][\-a-zA-Z0-9_]*(\.[\-a-zA-Z0-9_]+)*\.[cC][oO][mM](:[0-9]{1,5})?" 
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

                <label htmlFor='password'>Password</label>
                {formik.touched.password && formik.errors.password ? <p>{formik.errors.password}</p> : null}
                <input 
                id="password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                />

                <button type="submit" id="submit">
                Log In
                </button>

            </form>
        </>
  )
}

export default Login