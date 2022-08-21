import { BrowserRouter as Router, Routes, Route ,Navigate} from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Layout from './components/Layout'
import { createTheme, ThemeProvider } from "@material-ui/core"
import { purple } from '@material-ui/core/colors'
import Login from './components/Login'
import SignUp from './components/signUp'
import { Auth } from './firebase-config'
import { onAuthStateChanged } from 'firebase/auth'
import { useState } from 'react'


const theme = createTheme({
  palette: {
    primary: {
      main: '#fefefe'
    },
    secondary: purple
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightBold: 700,
    fontWeightRegular: 500,
    fontWeightLight: 400,
    fontWeightMedium: 600,
  }
})
function App() {
  const [user, setUser] = useState('');
  onAuthStateChanged(Auth, (usero) => {
    
    if (usero) {
      setUser(usero);
    }
    else{
      setUser(null);
    }
  })
  
  return (
    <ThemeProvider theme={theme}>

      <Router>
        <Layout >
          <Routes>

            {!user && (<>
              <Route path="/signup" element={<SignUp />} />
              <Route path='/' element={<Login />} />
            </>)}
            {user && (<>
              <Route path="/notes" element={<Notes />} />
              <Route path="/create" element={<Create />} />
            </>)}
            <Route path='*' element={<Navigate to={user ? '/notes':'/'}/>}/> 
            </Routes>
        </Layout>
      </Router>

    </ThemeProvider>
  );
}

export default App;
