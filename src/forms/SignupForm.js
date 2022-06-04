import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import helper from '../helpers/helper';

const SignupForm = () => {

  const [result, setResult] = useState()
  const [age, setAge] =useState(0)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      marital: '',
      dob: ''
   
    },
    enableReinitialize: true,
    initialTouched: false,
    validationSchema: Yup.object({
      firstName: Yup.string()
        .max(15, 'Must be 15 characters or less')
        .required('First Name is a required value'),
      lastName: Yup.string()
        .max(20, 'Must be 20 characters or less')
        .required('Last Name(s) is a required value'),
      email: Yup.string().email('Invalid email address').required('A valid email is required'),
      marital: Yup.string().required('Please select your marital status'),
      dob: Yup.date().required('A date of birth is required to process this form')
    }),
    onSubmit: values => {
      setResult(JSON.stringify(values, null, 2));
    },
    onReset: values => {
      setResult(JSON.stringify(values, null, 2)); 
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.touched.firstName && formik.errors.firstName ? (
        <div className='field-error'>{formik.errors.firstName}</div>
      ) : null}

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.lastName}
      />
      {formik.touched.lastName && formik.errors.lastName ? (
        <div className='field-error'>{formik.errors.lastName}</div>
      ) : null}

      <label htmlFor="email">Email Address</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div className='field-error'>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="marital">Marital Status</label>
      <select
        id="marital"
        name="marital"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.marital}>
        <option value=""></option>
        <option value="married">Married</option>
        <option value="single">Single</option>
        <option value="widow">Widow</option>
        <option value="engaged">Engaged</option>
        <option value="reserved">Prefer not to say</option>
      </select>
      {formik.touched.marital && formik.errors.marital ? (
        <div className='field-error'>{formik.errors.marital}</div>
      ) : null}

      <label htmlFor="dob">Date of Birth</label>
      <input
        id="dob"
        name="dob"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.dob}>
      </input>
      {formik.touched.dob && formik.errors.dob ? (
        <div className='field-error'>{formik.errors.dob}</div>
      ) : null}
      {helper.ageCalculator(formik.values.dob) ?
        <label
          value={formik.values.age}>Age {helper.ageCalculator(formik.values.dob)} </label>
        : null}
      {formik.touched.age && formik.errors.age ? (
        <div className='field-error'>{formik.errors.age}</div>
      ) : null}

      <div id="checkbox-group">Checked</div>
          <div role="group" aria-labelledby="checkbox-group">
            <label>
              <input type='checkbox' name="checked" value='1' checked />
              One
            </label>
            <label>
              <cinput type="checkbox" name="checked" value="2" />
              Two
            </label>
            <label>
              <input type="checkbox" name="checked" value="3" />
              Three
            </label>
          </div>


      {result ?
        <code>
          {result}
        </code>

        : null}
      <div className="button-group">
        <button type="submit">Submit</button>
        <button type='button' onClick={formik.resetForm}>Clear</button>
      </div>
    </form>
  );
};
export default SignupForm