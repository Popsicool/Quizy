import HeroSection from '../HeroSection/HeroSection';
import './App.css';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <Header />
      </div>
      <div className='hero_section'>
        <HeroSection />
      </div>
    </div>
  );
}

export default App;
