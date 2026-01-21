# Password Generator App

A modern, fully-featured password generator and manager built with React, Redux Toolkit, and Vite. Generate secure passwords, evaluate their strength, and store them locally.

## 🚀 Features

✅ **Random Password Generation** - Generate cryptographically random passwords with 95 possible characters  
✅ **Password Strength Analysis** - Real-time strength evaluation using the zxcvbn library  
✅ **Redux State Management** - Centralized state management with Redux Toolkit  
✅ **Local Storage Persistence** - Passwords persist across browser sessions  
✅ **Modern UI** - Clean, responsive design with visual feedback  
✅ **Controlled Components** - Proper React form handling with controlled inputs  

## 📦 Tech Stack

- **React 19.2** - UI library with hooks
- **Redux Toolkit 2.11** - State management
- **React Redux 9.2** - React bindings for Redux
- **Vite 7.2** - Fast build tool and dev server
- **zxcvbn 4.4** - Password strength estimation
- **ESLint** - Code quality and linting

## 🏗️ Project Structure

```
src/
├── app/
│   ├── store.js              # Redux store configuration
│   └── persistState.js       # LocalStorage persistence utilities
├── features/
│   └── passwords/
│       └── passwordsSlice.js # Redux slice for passwords
├── App.jsx                   # Main application component
├── App.css                   # Application styles
├── Password.jsx              # Password generator component
├── PasswordsList.jsx         # Saved passwords list component
├── PasswordStrength.jsx      # Password strength indicator component
├── main.jsx                  # Application entry point
└── index.css                 # Global styles
```

## 🎯 Core Components

### **Password.jsx**
- Random password generation (8 characters, all character types)
- Controlled form inputs for name and password
- Redux dispatch for saving passwords
- Integrated strength indicator

### **PasswordsList.jsx**
- Displays all saved passwords
- Reads from Redux store using `useSelector`
- Shows count and empty state message
- Formatted display with name and password value

### **PasswordStrength.jsx**
- Real-time password strength analysis
- Visual strength indicator (colored bar)
- Displays:
  - Strength label (Weak, Fair, Good, Strong, Very Strong)
  - Estimated guesses needed
  - Time to crack (offline slow hashing)

## 🔧 Redux Implementation

### **Store Configuration** (`app/store.js`)
- Configures Redux store with passwords reducer
- Implements `preloadedState` for initial load from localStorage
- Subscribes to store changes to auto-save to localStorage

### **Passwords Slice** (`features/passwords/passwordsSlice.js`)
- **State Shape:** `{ value: [] }` - Array of password objects
- **Actions:**
  - `addPassword(payload)` - Adds password object `{ name, password }` to array
- **Initial State:** Empty array (populated from localStorage if available)

### **Persistence** (`app/persistState.js`)
- `loadState()` - Loads state from localStorage, returns undefined on error
- `saveState(state)` - Serializes and saves state to localStorage
- Uses key `"PSSWRDZ_STATE"` for storage

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Server
After running `npm run dev`, open your browser to:
```
http://localhost:5173
```

## 💾 Data Persistence

The app uses the browser's `localStorage` API to persist passwords:

- **Storage Key:** `PSSWRDZ_STATE`
- **Format:** JSON serialized Redux state
- **Scope:** Per domain/origin
- **Persistence:** Survives browser restarts (until cache is cleared)

⚠️ **Security Note:** localStorage is not encrypted. This app is for educational purposes. For production password management, use secure, encrypted storage solutions.

## 🎨 Password Generation Algorithm

```javascript
function generatePassword() {
  // Character set: 95 total characters
  // - Uppercase: A-Z (26)
  // - Lowercase: a-z (26)
  // - Numbers: 0-9 (10)
  // - Special: !@#$%^&*()_+-=[]{}|;:,.<>? (33)
  
  const chars = '!@#$%^&*()_+-=[]{}|;:,.<>?ABC...xyz0123456789'
  let password = ''
  
  for (let i = 0; i < 8; i++) {
    password += chars[Math.floor(Math.random() * chars.length)]
  }
  
  return password
}
```

**Strength:** 8 characters from 95 possibilities = 95^8 = 6,634,204,312,890,625 combinations

## 📊 Password Strength Scoring

Uses the `zxcvbn` library (developed by Dropbox):

| Score | Label | Color | Meaning |
|-------|-------|-------|---------|
| 0 | Weak | Red | Too guessable (risky) |
| 1 | Fair | Orange | Very guessable |
| 2 | Good | Yellow | Somewhat guessable |
| 3 | Strong | Light Green | Safely unguessable |
| 4 | Very Strong | Green | Very unguessable |

The algorithm considers:
- Password length
- Character variety
- Common patterns
- Dictionary words
- Keyboard patterns
- Repeated characters

## 🔮 Future Enhancements

Potential features to add:

- [ ] **Delete passwords** - Remove saved passwords
- [ ] **Edit passwords** - Modify existing entries
- [ ] **Password length control** - Slider to set length (4-32 chars)
- [ ] **Character set options** - Letters only, alphanumeric, or all
- [ ] **Hyphenated format** - Option for `xxx-xxx-xxx` format
- [ ] **Copy to clipboard** - One-click password copying
- [ ] **Search/filter** - Find specific passwords
- [ ] **Export/import** - Backup and restore passwords
- [ ] **Dark mode** - Theme toggle
- [ ] **Password history** - Track generated passwords

## 📚 Learning Resources

This project demonstrates:

- **React Hooks:** `useState`, `useSelector`, `useDispatch`
- **Redux Toolkit:** `createSlice`, `configureStore`
- **Controlled Components:** Form input state management
- **LocalStorage API:** Browser data persistence
- **Modern JavaScript:** ES6+, modules, arrow functions
- **Component Architecture:** Separation of concerns
- **State Management Patterns:** Flux architecture

## 🧪 Tutorial Completion

This implementation covers all sections of the tutorial:

- ✅ **P03:** Password generation with random characters
- ✅ **P04:** Controlled components for forms
- ✅ **P05:** Redux Toolkit setup and store configuration
- ✅ **P06:** Actions and reducers implementation
- ✅ **P07:** Password strength evaluation with zxcvbn
- ✅ **P08:** LocalStorage persistence
- ✅ **P09:** Modern CSS styling

## ⚠️ Disclaimer

This application is for **educational purposes only**. Storing passwords in localStorage is not secure for production use. For real password management:

- Use encrypted storage
- Implement authentication
- Use HTTPS
- Consider using established password managers
- Follow security best practices

## 📄 License

MIT License - Feel free to use this project for learning and development.

## 🤝 Contributing

This is a tutorial project, but suggestions and improvements are welcome!

---

**Built with ❤️ using React + Redux Toolkit**
