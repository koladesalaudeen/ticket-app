import logo from './logo.svg';
import 'react-calendar/dist/Calendar.css';
import Input from './Input'
import Offer from './../src/pages/Offer'
import ReactDOM from 'react-dom';
import {Link,BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {
  return ( 
  <Router>
    <Routes>
      <Route exact path="/" element={<Input/>}/>
      <Route path="/offer" element={<Offer />}/>
    </Routes>
  </Router>) 
}

export default App;
