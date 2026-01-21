# Quick Reference Guide

Fast lookup for common tasks and patterns used in this project.

## 🚀 Quick Start Commands

```bash
npm install          # Install dependencies
npm run dev         # Start dev server (http://localhost:5173)
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run ESLint
```

---

## 📁 File Reference

| File | Purpose | Key Exports |
|------|---------|-------------|
| `src/main.jsx` | App entry point | - |
| `src/App.jsx` | Main layout | `App` |
| `src/Password.jsx` | Password generator | `Password` |
| `src/PasswordsList.jsx` | Display saved passwords | `PasswordsList` |
| `src/PasswordStrength.jsx` | Strength indicator | `PasswordStrength` |
| `src/app/store.js` | Redux store | `store` |
| `src/app/persistState.js` | LocalStorage utils | `loadState`, `saveState` |
| `src/features/passwords/passwordsSlice.js` | Redux slice | `addPassword`, reducer |

---

## 🔧 Common Code Patterns

### Create a New Redux Slice

```javascript
import { createSlice } from '@reduxjs/toolkit'

const mySlice = createSlice({
  name: 'myFeature',
  initialState: { value: [] },
  reducers: {
    addItem: (state, action) => {
      state.value.push(action.payload)
    },
    removeItem: (state, action) => {
      state.value = state.value.filter((_, i) => i !== action.index)
    }
  }
})

export const { addItem, removeItem } = mySlice.actions
export default mySlice.reducer
```

### Add Slice to Store

```javascript
// In store.js
import myReducer from '../features/myFeature/mySlice'

export const store = configureStore({
  reducer: {
    passwords: passwordsReducer,
    myFeature: myReducer  // Add here
  }
})
```

### Use Redux in Component

```javascript
import { useSelector, useDispatch } from 'react-redux'
import { addItem } from './features/myFeature/mySlice'

function MyComponent() {
  // Read from store
  const items = useSelector(state => state.myFeature.value)
  
  // Get dispatch function
  const dispatch = useDispatch()
  
  // Dispatch action
  const handleAdd = () => {
    dispatch(addItem({ name: 'New Item' }))
  }
  
  return <button onClick={handleAdd}>Add</button>
}
```

### Controlled Component Pattern

```javascript
function MyForm() {
  const [value, setValue] = useState('')
  
  return (
    <input 
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder="Enter text"
    />
  )
}
```

### Generate Random Number

```javascript
// Random integer from 0 to n-1
function random(n) {
  return Math.floor(Math.random() * n)
}

// Usage
random(6)        // 0-5 (die roll - 1)
random(10)       // 0-9
random(100)      // 0-99
```

### Pick Random Array Element

```javascript
const items = ['a', 'b', 'c', 'd']
const randomItem = items[random(items.length)]
```

### Generate Random String

```javascript
function generateString(length, charset) {
  let result = ''
  for (let i = 0; i < length; i++) {
    result += charset[random(charset.length)]
  }
  return result
}

// Usage
generateString(8, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')
```

---

## 🎨 CSS Class Reference

| Class | Used In | Purpose |
|-------|---------|---------|
| `.App` | App.jsx | Main container (max-width: 600px) |
| `.password-form` | Password.jsx | Form container with background |
| `.form-group` | Password.jsx | Form field wrapper |
| `.passwords-list` | PasswordsList.jsx | List container |
| `.password-name` | PasswordsList.jsx | Password label (bold) |
| `.password-value` | PasswordsList.jsx | Password value (monospace) |

### Quick Style Snippets

```css
/* Card style */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Button */
button {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background: #4A90E2;
  color: white;
  cursor: pointer;
}

button:hover {
  background: #357ABD;
}

/* Input */
input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 2px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

input[type="text"]:focus {
  outline: none;
  border-color: #4A90E2;
}
```

---

## 📊 zxcvbn Library Reference

### Basic Usage

```javascript
import zxcvbn from 'zxcvbn'

const result = zxcvbn('password123')
```

### Result Object

```javascript
{
  score: 2,                    // 0-4 (weak to strong)
  guesses: 1234567,            // Estimated guesses needed
  guesses_log10: 6.09,         // Log base 10 of guesses
  
  crack_times_seconds: {
    offline_slow_hashing_1e4_per_second: 123.45,
    offline_fast_hashing_1e10_per_second: 0.000123,
    online_throttling_100_per_hour: 12345678,
    online_no_throttling_10_per_second: 123456
  },
  
  crack_times_display: {
    offline_slow_hashing_1e4_per_second: "2 minutes",
    offline_fast_hashing_1e10_per_second: "instant",
    online_throttling_100_per_hour: "4 months",
    online_no_throttling_10_per_second: "1 day"
  },
  
  feedback: {
    warning: "This is similar to a commonly used password",
    suggestions: [
      "Add another word or two",
      "Use a longer keyboard pattern with more turns"
    ]
  },
  
  sequence: [...],              // Detailed pattern analysis
  calc_time: 5                  // Calculation time in ms
}
```

### Score Meanings

| Score | Label | Description |
|-------|-------|-------------|
| 0 | Too guessable | Risky password |
| 1 | Very guessable | Protection from throttled online attacks |
| 2 | Somewhat guessable | Protection from unthrottled online attacks |
| 3 | Safely unguessable | Moderate protection from offline slow-hash scenario |
| 4 | Very unguessable | Strong protection from offline slow-hash scenario |

---

## 💾 LocalStorage API

### Save Data

```javascript
// String
localStorage.setItem('key', 'value')

// Object (must stringify)
localStorage.setItem('key', JSON.stringify({ name: 'John' }))

// Array
localStorage.setItem('items', JSON.stringify(['a', 'b', 'c']))
```

### Load Data

```javascript
// String
const value = localStorage.getItem('key')

// Object (must parse)
const obj = JSON.parse(localStorage.getItem('key'))

// With fallback
const data = localStorage.getItem('key') || 'default'
```

### Remove Data

```javascript
// Remove one item
localStorage.removeItem('key')

// Clear all
localStorage.clear()
```

### Safe Usage Pattern

```javascript
function safeLoad(key, defaultValue) {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

function safeSave(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error('Error saving to localStorage:', error)
    return false
  }
}
```

---

## 🎯 React Hooks Cheat Sheet

### useState

```javascript
const [value, setValue] = useState(initialValue)

// Set directly
setValue('new value')

// Set from previous state
setValue(prev => prev + 1)

// Multiple state variables
const [name, setName] = useState('')
const [age, setAge] = useState(0)
```

### useSelector (Redux)

```javascript
// Select single value
const value = useSelector(state => state.slice.value)

// Select with transformation
const count = useSelector(state => state.items.value.length)

// Select multiple values (returns new object each time - causes re-renders!)
const { name, email } = useSelector(state => state.user)
```

### useDispatch (Redux)

```javascript
const dispatch = useDispatch()

// Dispatch action
dispatch(actionCreator(payload))

// In event handler
onClick={() => dispatch(addItem(data))}

// With local state
const handleSubmit = () => {
  dispatch(addItem({ name, password }))
  setName('')  // Clear local state after
}
```

---

## 🔍 Debugging Tips

### Redux DevTools

1. Install [Redux DevTools Extension](https://github.com/reduxjs/redux-devtools)
2. Open browser DevTools → Redux tab
3. View actions, state, time-travel

### Console Logging

```javascript
// Log state changes
store.subscribe(() => {
  console.log('State updated:', store.getState())
})

// Log actions
const dispatch = useDispatch()
const loggedDispatch = (action) => {
  console.log('Dispatching:', action)
  return dispatch(action)
}

// Log renders
useEffect(() => {
  console.log('Component rendered')
})
```

### Common Issues

| Problem | Solution |
|---------|----------|
| Component not re-rendering | Check if state/props changed |
| Redux state not updating | Verify reducer returns new object |
| LocalStorage not persisting | Check browser privacy settings |
| Input not typing | Ensure controlled component pattern |
| Action not dispatching | Check dispatch is called correctly |

---

## 📦 NPM Package Versions

```json
{
  "react": "^19.2.0",
  "react-dom": "^19.2.0",
  "@reduxjs/toolkit": "^2.11.2",
  "react-redux": "^9.2.0",
  "zxcvbn": "^4.4.2",
  "vite": "^7.2.4"
}
```

---

## 🌐 Useful Resources

- [React Docs](https://react.dev)
- [Redux Toolkit Docs](https://redux-toolkit.js.org)
- [Vite Docs](https://vitejs.dev)
- [zxcvbn GitHub](https://github.com/dropbox/zxcvbn)
- [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

## 🎓 Learning Path

1. ✅ React basics (components, JSX, props)
2. ✅ React Hooks (useState)
3. ✅ Controlled components
4. ✅ Redux concepts (store, actions, reducers)
5. ✅ Redux Toolkit (createSlice, configureStore)
6. ✅ React-Redux hooks (useSelector, useDispatch)
7. ✅ Browser APIs (localStorage)
8. ✅ Third-party libraries (zxcvbn)

**Next steps:**
- TypeScript
- Testing (Jest, React Testing Library)
- Async actions (createAsyncThunk)
- Advanced Redux patterns
- Performance optimization

---

**Quick reference for React + Redux Toolkit Password Generator**  
**Keep this handy while coding!** 📌
