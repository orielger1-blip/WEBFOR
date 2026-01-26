import MobileNavbar from './components/MobileNavbar';
import MobileHero from './components/MobileHero';
import MobileProblem from './components/MobileProblem';
import MobileSolutions from './components/MobileSolutions';
import MobileProcess from './components/MobileProcess';
import MobileResults from './components/MobileResults';
import MobileIndustries from './components/MobileIndustries';
import MobileTeam from './components/MobileTeam';
import MobileFAQ from './components/MobileFAQ';
import MobileContact from './components/MobileContact';
import MobileFooter from './components/MobileFooter';
import './styles/mobile.css';

/**
 * Mobile-Optimized App
 * Completely separate from desktop - built from scratch for mobile UX
 * Premium, fast, touch-first design
 */
function MobileApp() {
  return (
    <div className="mobile-app" dir="rtl">
      <MobileNavbar />
      <main className="mobile-main">
        <MobileHero />
        <MobileProblem />
        <MobileSolutions />
        <MobileProcess />
        <MobileResults />
        <MobileIndustries />
        <MobileTeam />
        <MobileFAQ />
        <MobileContact />
      </main>
      <MobileFooter />
    </div>
  );
}

export default MobileApp;
