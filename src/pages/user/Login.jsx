import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import "./Signup.css"
import mockUsers from '../../data/users' // 👈 adjust the path to match your folder structure

export default function UserLogin() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    idNumber: '',
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
    const { email, idNumber, password } = formData
    if (!email.includes('@')) return 'Invalid email format'
    if (!/^\d{14}$/.test(idNumber)) return 'ID number must be 14 digits'
    if (!password) return 'Password is required'
    return ''
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationError = validate()
    if (validationError) {
      setError(validationError)
      return
    }

    const user = mockUsers.find(
      u =>
        u.email.toLowerCase().trim() === formData.email.toLowerCase().trim() &&
        u.idNumber.trim() === formData.idNumber.trim() &&
        u.password === formData.password
    )

    console.log("mockUsers:", mockUsers);

    if (user) {
        localStorage.setItem('loggedInUser', JSON.stringify(user)) // <-- ADD THIS
        navigate('/user/dashboard', {
        state: { name: formData.email.split('@')[0] }
      })
    } else {
      setError('Invalid credentials. Please check your details.')
    }
  }

  const isFormValid =
    formData.email && formData.idNumber && formData.password && !validate()

  return (
    <div className="LoginCard">
      <img
        className="faceavatar"
        src="https://raw.githubusercontent.com/rohan9896/Testing-for-CSS-component-library/381a3bddf3e3dd07d18515294bc568756a913b00/icons/ecomm/logo.svg"
        alt="avatar"
      />
      <h2>User Login</h2>

      {error && (
        <div style={{ backgroundColor: '#E34234', color: 'white', padding: '10px', borderRadius: '5px', marginBottom: '15px' }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem', width: '100%' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="primaryInput focus"
          required
        />
        <input
          type="text"
          name="idNumber"
          placeholder="ID Number"
          value={formData.idNumber}
          onChange={handleChange}
          className="primaryInput focus"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="primaryInput focus"
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
        Don't have an account? <a href="/user/signup">Sign up</a>
      </small>
    </div>
  )
}
