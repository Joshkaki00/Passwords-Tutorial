import { useState } from 'react'

function random(n) {
  return Math.floor(Math.random() * n)
}

function getRandomChar() {
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  return chars[random(chars.length)]
}

function generatePassword() {
  // generate a password here
  console.log("generating password")
}

function Password() {
  const [password, setPassword] = useState('p@$$w0rd')

  return (
    <div>
      <div>{password}</div>
      <div>
        <button onClick={(e) => {
          generatePassword()
        }}>Generate</button>
      </div>
    </div>
  )
}

export default Password