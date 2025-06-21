import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Signup.css' // Reuse the shared form styling
import { mockPractitioners } from '../../data/practitioner'  // import from practitioner.js

export default function PractitionerLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    hpcsa: '',
    password: ''
  })
  const [error, setError] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validate = () => {
    const { email, hpcsa, password } = formData
    if (!email.includes('@')) return "Invalid email format"
    if (!hpcsa) return "HPCSA number is required"
    if (!password) return "Password is required"
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    // Get practitioners from localStorage or empty array
    const localPractitioners = JSON.parse(localStorage.getItem('practitioners')) || []

    // Combine local + mock practitioners from practitioner.js
    const allPractitioners = [...localPractitioners, ...mockPractitioners]

    // Find user that matches credentials
    const user = allPractitioners.find(p =>
      p.email.toLowerCase().trim() === formData.email.toLowerCase().trim() &&
      p.hpcsa.trim() === formData.hpcsa.trim() &&
      p.password === formData.password
    );

    console.log("localPractitioners from localStorage:", localPractitioners);
    console.log("mockPractitioners:", mockPractitioners);
    console.log("allPractitioners:", allPractitioners);

    if (user) {
      // Save logged in user to localStorage
      localStorage.setItem('loggedInPractitioner', JSON.stringify(user));
      navigate('/practitioner/dashboard', { state: user });
    } else {
      setError("Invalid credentials. Please check your details.")
    }
  }

  const isFormValid = formData.email && formData.hpcsa && formData.password && !validate()

  return (
    <div className="LoginCard">
      <img
        className="faceavatar"
        src="https://raw.githubusercontent.com/rohan9896/Testing-for-CSS-component-library/381a3bddf3e3dd07d18515294bc568756a913b00/icons/ecomm/logo.svg"
        alt="avatar"
      />
      <h2>Practitioner Login</h2>

      {error && (
        <div className="bg-[#E34234] text-white p-3 rounded mb-4 w-full">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
        <input
          className="primaryInput focus"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className="primaryInput focus"
          type="text"
          name="hpcsa"
          placeholder="HPCSA Number"
          value={formData.hpcsa}
          onChange={handleChange}
          required
        />
        <input
          className="primaryInput focus"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          disabled={!isFormValid}
          className="primary-button blue"
          style={{ marginTop: '10px', cursor: isFormValid ? 'pointer' : 'not-allowed' }}
        >
          Login
        </button>
      </form>

      <small className="forgot_passoword">
        Don't have an account? <a href="/practitioner/signup">Sign up</a>
      </small>
    </div>
  )
}
