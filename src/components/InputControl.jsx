import { ErrorMessage, Field } from 'formik'
import React from 'react'

const InputControl = (props) => {
	return (
		<>
			<div>
				<label htmlFor={props.label}>Password:</label>
				<Field {...props} />
				<ErrorMessage name={props.label} component="div" />
			</div>
		</>
	)
}

export default InputControl