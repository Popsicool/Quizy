import HeroSection from '../HeroSection/HeroSection';
import Header from '../Header/Header';
import QuizCategory from '../QuizCategory/QuizCategory';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className='header'>
        <Header />
      </div>
      <div className='hero_section'>
        <HeroSection />
      </div>
      <div className='main_category'>
        <QuizCategory />
      </div>
    </div>
  );
}

export default App;
