import Password from './Password';
import PasswordsList from './PasswordsList';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Password Generator</h1>
      <Password />
      <PasswordsList />
    </div>
  );
}

export default App;