import React, { useState, useEffect } from 'react';
import "./Signup.css";

const Signup = () => {
  const [form, setForm] = useState({
    name: '',
    surname: '',
    gender: '',
    dob: '',
    email: '',
    residence: '',
    idNumber: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);

  const validate = () => {
    const errs = [];
    if (/\d/.test(form.name)) errs.push("Name cannot contain numbers.");
    if (/\d/.test(form.surname)) errs.push("Surname cannot contain numbers.");
    if (!/^\d{14}$/.test(form.idNumber)) errs.push("ID must be 14 digits.");
    if (form.password.length < 6) errs.push("Password must be at least 6 characters.");
    if (!/[A-Z]/.test(form.password)) errs.push("Password must contain an uppercase letter.");
    if (!/[a-z]/.test(form.password)) errs.push("Password must contain a lowercase letter.");
    if (!/\d/.test(form.password)) errs.push("Password must contain a number.");
    if (!/[^A-Za-z0-9]/.test(form.password)) errs.push("Password must contain a symbol.");
    if (form.password !== form.confirmPassword) errs.push("Passwords do not match.");

    setErrors(errs);
    setIsValid(errs.length === 0);
  };

  useEffect(() => {
    validate();
  }, [form]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Successfully signed up!");
  };

  return (
    <div className="LoginCard">
      <img
        className="faceavatar"
        src="https://raw.githubusercontent.com/rohan9896/Testing-for-CSS-component-library/381a3bddf3e3dd07d18515294bc568756a913b00/icons/ecomm/logo.svg"
        alt="avatar"
      />
      <h2>User Sign Up</h2>

      {errors.length > 0 && (
        <div style={{ backgroundColor: '#E34234', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {errors.map((err, i) => <div key={i}>{err}</div>)}
        </div>
      )}

      <input className="primaryInput focus" placeholder="Name" name="name" value={form.name} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="Surname" name="surname" value={form.surname} onChange={handleChange} />
        <select className="primaryInput focus" name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
        </select>
      <input className="primaryInput focus" placeholder="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="Email" name="email" value={form.email} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="Postal Code" name="residence" value={form.residence} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="ID Number" name="idNumber" value={form.idNumber} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="Password" type="password" name="password" value={form.password} onChange={handleChange} />
      <input className="primaryInput focus" placeholder="Confirm Password" type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />

      <button
        className="primary-button blue"
        disabled={!isValid}
        style={{ cursor: isValid ? 'pointer' : 'not-allowed', marginTop: '10px' }}
        onClick={handleSubmit}
      >
        Sign Up
      </button>

      <small className="forgot_passoword">Already have an account? <a href="/user/login">Login</a></small>
    </div>
  );
};

export default Signup;
