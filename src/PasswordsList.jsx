import { useSelector } from 'react-redux'

function PasswordsList() {
  const passwords = useSelector(state => state.passwords.value)

  return (
    <div className="passwords-list">
      <h2>Saved Passwords ({passwords.length})</h2>
      {passwords.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#999', padding: '20px' }}>
          No passwords saved yet. Generate and save your first password!
        </p>
      ) : (
        <ul>
          {passwords.map((password, index) => (
            <li key={index}>
              <span className="password-name">{password.name}</span>
              <span className="password-value">{password.password}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default PasswordsList