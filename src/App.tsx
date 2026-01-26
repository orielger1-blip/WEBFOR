import { Suspense, lazy } from 'react';
import useDeviceDetect from './hooks/useDeviceDetect';
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
import AccessibilityStatement from './components/AccessibilityStatement';
import Footer from './components/Footer';
import AccessibilityWidget from './components/AccessibilityWidget';
import WhatsAppButton from './components/WhatsAppButton';
import './App.css';

// Lazy load mobile app for better performance
const MobileApp = lazy(() => import('./mobile/MobileApp'));

// Loading screen for mobile app
const MobileLoader = () => (
  <div className="mobile-loader" dir="rtl">
    <div className="mobile-loader-content">
      <div className="mobile-loader-logo">
        <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="48" height="48" rx="12" fill="url(#loader-grad)"/>
          <circle cx="24" cy="20" r="8" stroke="white" strokeWidth="2" fill="none"/>
          <circle cx="24" cy="20" r="3" fill="white"/>
          <path d="M16 32C16 28 19.5 25 24 25C28.5 25 32 28 32 32" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <defs>
            <linearGradient id="loader-grad" x1="0" y1="0" x2="48" y2="48">
              <stop stopColor="#f59e0b"/>
              <stop offset="1" stopColor="#d97706"/>
            </linearGradient>
          </defs>
        </svg>
      </div>
      <div className="mobile-loader-spinner"></div>
      <p>טוען...</p>
    </div>
    <style>{`
      .mobile-loader {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%);
        z-index: 9999;
      }
      .mobile-loader-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1.5rem;
      }
      .mobile-loader-logo svg {
        width: 64px;
        height: 64px;
      }
      .mobile-loader-spinner {
        width: 32px;
        height: 32px;
        border: 3px solid rgba(245, 158, 11, 0.2);
        border-top-color: #f59e0b;
        border-radius: 50%;
        animation: spin 0.8s linear infinite;
      }
      .mobile-loader p {
        color: rgba(255, 255, 255, 0.7);
        font-size: 1rem;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Desktop App Component
function DesktopApp() {
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
        <AccessibilityStatement />
      </main>
      <Footer />
      <WhatsAppButton />
      <AccessibilityWidget />
    </div>
  );
}

function App() {
  const { isMobile, isTablet } = useDeviceDetect();
  const showMobile = isMobile || isTablet;

  // Render mobile or desktop based on device
  if (showMobile) {
    return (
      <Suspense fallback={<MobileLoader />}>
        <MobileApp />
      </Suspense>
    );
  }

  return <DesktopApp />;
}

export default App;
