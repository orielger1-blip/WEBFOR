import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Problem from './components/Problem';
import Solutions from './components/Solutions';
import Process from './components/Process';
import Results from './components/Results';
import Team from './components/Team';
import Industries from './components/Industries';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

function App() {
  return (
    <div className="App">
      <a href="#main-content" className="skip-link">דלג לתוכן הראשי</a>
      <Navbar />
      <main id="main-content">
        <Hero />
        <Problem />
        <Solutions />
        <Process />
        <Results />
        <Team />
        <Industries />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </div>
  );
}

export default App;
