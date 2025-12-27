import LanguageToggle from '@/components/Navigation/LanguageToggle';
import HamburgerMenu from '@/components/Navigation/HamburgerMenu';
import HeroSection from '@/components/Hero/HeroSection';
import IntroSection from '@/components/Introduction/IntroSection';
import ServicesSection from '@/components/Services/ServicesSection';
import ContactCTA from '@/components/Contact/ContactCTA';
import Footer from '@/components/Footer/Footer';

export default function Home() {
  return (
    <div className="relative">
      {/* Language Toggle */}
      <LanguageToggle />

      {/* Navigation */}
      <HamburgerMenu />

      {/* Main Content */}
      <main>
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
