import logo from './logo.svg';
import './App.css';
import HomePage from './components/homePage/HomePage'
import Navbar from './components/navBar/Navbar'

function App() {
  return (
    <div className="App">
      <Navbar />
      <HomePage />
    </div>
  );
}

export default App;
