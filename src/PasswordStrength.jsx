import zxcvbn from 'zxcvbn'

function PasswordStrength({ password }) {
  if (!password) {
    return null
  }

  const result = zxcvbn(password)
  const score = result.score

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong']
  const strengthColors = ['#ff4444', '#ff8800', '#ffaa00', '#88cc00', '#00cc00']

  return (
    <div style={{ margin: '10px 0' }}>
      <div>
        <strong>Password Strength: </strong>
        <span style={{ color: strengthColors[score], fontWeight: 'bold' }}>
          {strengthLabels[score]}
        </span>
      </div>
      <div style={{ 
        width: '100%', 
        height: '10px', 
        backgroundColor: '#ddd',
        borderRadius: '5px',
        overflow: 'hidden',
        marginTop: '5px'
      }}>
        <div style={{
          width: `${(score + 1) * 20}%`,
          height: '100%',
          backgroundColor: strengthColors[score],
          transition: 'all 0.3s ease'
        }} />
      </div>
      <div style={{ fontSize: '12px', marginTop: '5px', color: '#666' }}>
        <div>Guesses: {result.guesses.toLocaleString()}</div>
        <div>Crack time (offline): {result.crack_times_display.offline_slow_hashing_1e4_per_second}</div>
      </div>
    </div>
  )
}

export default PasswordStrength