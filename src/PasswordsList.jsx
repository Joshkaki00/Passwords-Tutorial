import { useSelector } from 'react-redux'

function PasswordsList() {
  const passwords = useSelector(state => state.passwords.value)

  return (
    <div>
      <h2>Saved Passwords</h2>
      <ul>
        {passwords.map((password, index) => (
          <li key={index}>
            {password.name} - {password.password}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PasswordsList