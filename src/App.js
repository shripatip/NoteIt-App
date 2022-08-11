import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Notes from './pages/Notes'
import Create from './pages/Create'
import Layout from './components/Layout'
import {createTheme,ThemeProvider} from "@material-ui/core"
import  {purple } from '@material-ui/core/colors'
import signUp from './components/signUp'

const theme=createTheme({
  palette:{
    primary:{
      main:'#fefefe'
    },
    secondary:purple
  },
  typography:{
    fontFamily:'Quicksand',
    fontWeightBold:700,
    fontWeightRegular:500,
    fontWeightLight:400,
    fontWeightMedium:600,
  }
})
function App() {
  return (
    <ThemeProvider theme={theme}>
      
    <Router>
      <Layout >
      <Routes>
        <Route path="/" element={<Notes />} />
        <Route path="/create" element={<Create />} />
      </Routes>
      </Layout>
    </Router>
   
    </ThemeProvider>
  );
}

export default App;
