import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPassword } from './features/passwords/passwordsSlice'
import PasswordStrength from './PasswordStrength'

function random(n) {
  return Math.floor(Math.random() * n)
}

function generatePassword() {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let password = ''
  
  for (let i = 0; i < 8; i++) {
    password += chars[random(chars.length)]
  }
  
  return password
}

function Password() {
  const [password, setPassword] = useState('p@$$w0rd')
  const [name, setName] = useState('')
  const dispatch = useDispatch()

  return (
    <div className="password-form">
      <div className="form-group">
        <label>Name:</label>
        <input 
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="e.g., Facebook, Gmail"
        />
      </div>
      <div className="form-group">
        <label>Password:</label>
        <input 
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </div>
      
      <PasswordStrength password={password} />
      
      <div>
        <button onClick={(e) => {
          setPassword(generatePassword())
        }}>Generate</button>
        
        <button onClick={() => dispatch(addPassword({ name, password }))}>
          Save
        </button>
      </div>
    </div>
  )
}

export default Password