import { Formik, Form, ErrorMessage, Field } from 'formik'
import React from 'react'
import InputControl from '../components/InputControl'
import * as Yup from 'yup';
import { Link } from 'react-router-dom';


const validationSchema = Yup.object().shape({
	email: Yup.string().email('Enter valid email address ').required('email is required'),
	password: Yup.string().min(3, 'Password must be atleast 3 characters'). required('password is required')
})
const Login = () => {

	const handleSubmit = (values) => {
		console.log(values);
	}

	return (
		<>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ isSubmitting }) => (
					<Form>
						<h1 className='text-3xl text-center font-bold'>Login Form</h1>

						<div>
							<label htmlFor="email">Email:</label>
							<Field className='field' type="email" name="email" />
							<ErrorMessage className='errMsg' name="email" component="div" />
						</div>

						<div>
							<label htmlFor="password">Password:</label>
							<Field className='field' type="password" name="password" />
							<ErrorMessage className='errMsg' name="password" component="div" />
						</div>

						<button className='btn' type="submit" disabled={isSubmitting}>
							Submit
						</button>

						<h1 className='cursor-pointer text-center text-sm my-2 hover:underline hover:text-red-800'>
							<Link to='/'>New User?</Link>
						</h1>

					</Form>
				)}
			</Formik>

		</>
	)
}

export default Login