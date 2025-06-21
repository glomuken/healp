import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Signup.css" // Reuse the styles from user Signup

export default function PractitionerSignup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    gender: '',
    email: '',
    password: '',
    confirmPassword: '',
    jobTitle: '',
    idNumber: '',
    hpcsaNumber: '',
    placesOfWork: '',
    mentalHealth: false
  })

  const [errors, setErrors] = useState({})

  const validate = () => {
    const newErrors = {}
    if (/\d/.test(formData.name)) newErrors.name = "Name cannot contain numbers"
    if (/\d/.test(formData.surname)) newErrors.surname = "Surname cannot contain numbers"
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters"
    if (!/[a-z]/.test(formData.password)) newErrors.password = "Password must include lowercase letters"
    if (!/[A-Z]/.test(formData.password)) newErrors.password = "Password must include uppercase letters"
    if (!/[0-9]/.test(formData.password)) newErrors.password = "Password must include numbers"
    if (!/[^A-Za-z0-9]/.test(formData.password)) newErrors.password = "Password must include symbols"
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match"
    if (!/^\d{14}$/.test(formData.idNumber)) newErrors.idNumber = "ID number must be exactly 14 digits"
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate()
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length === 0) {
      // Prepare new practitioner data
      const newPractitioner = { ...formData }
      delete newPractitioner.confirmPassword  // Remove confirmPassword

      // Get existing practitioners from localStorage or empty array
      const storedPractitioners = JSON.parse(localStorage.getItem('practitioners')) || []

      // Add new practitioner
      storedPractitioners.push(newPractitioner)

      // Save updated array back to localStorage
      localStorage.setItem('practitioners', JSON.stringify(storedPractitioners))

      alert("Account created successfully!")

      // Redirect to login page
      navigate('/practitioner/login')
    }
  }

  const isFormValid = Object.keys(validate()).length === 0

  return (
    <div className="LoginCard">
      <img
        className="faceavatar"
        src="https://raw.githubusercontent.com/rohan9896/Testing-for-CSS-component-library/381a3bddf3e3dd07d18515294bc568756a913b00/icons/ecomm/logo.svg"
        alt="avatar"
      />
      <h2>Practitioner Signup</h2>

      {Object.values(errors).length > 0 && (
        <div className="bg-[#E34234] text-white p-3 rounded mb-4">
          {Object.values(errors).map((err, idx) => (
            <div key={idx}>• {err}</div>
          ))}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
        <input className="primaryInput focus" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
        <input className="primaryInput focus" type="text" name="surname" placeholder="Surname" value={formData.surname} onChange={handleChange} required />
        <select className="primaryInput focus" name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <input className="primaryInput focus" type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input className="primaryInput focus" type="text" name="jobTitle" placeholder="Job Title" value={formData.jobTitle} onChange={handleChange} required />
        <input className="primaryInput focus" type="text" name="idNumber" placeholder="ID Number" value={formData.idNumber} onChange={handleChange} required />
        <input className="primaryInput focus" type="text" name="hpcsaNumber" placeholder="HPCSA Number" value={formData.hpcsaNumber} onChange={handleChange} required />
        <input className="primaryInput focus" type="text" name="placesOfWork" placeholder="Places of Work" value={formData.placesOfWork} onChange={handleChange} required />
        <input className="primaryInput focus" type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input className="primaryInput focus" type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />

        <label className="flex items-center gap-2">
          <input type="checkbox" name="mentalHealth" checked={formData.mentalHealth} onChange={handleChange} />
          Deals in mental health?
        </label>

        <button
          type="submit"
          disabled={!isFormValid}
          className="primary-button blue"
          style={{ marginTop: '10px', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
        >
          Sign Up
        </button>
      </form>

      <small className="forgot_passoword">
        Already have an account? <a href="/practitioner/login">Login</a>
      </small>
    </div>
  )
}
