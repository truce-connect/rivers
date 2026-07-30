import Navbar from '@/components/components/sections/Navbar';
import Hero from '@/components/components/sections/Hero';
import About from '@/components/components/sections/About';
import Stats from '@/components/components/sections/Stats';
import Services from '@/components/components/sections/Services';
import Packages from '@/components/components/sections/Packages';
import Menu from '@/components/components/sections/Menu';
import BuildYourMenu from '@/components/components/sections/BuildYourMenu';
import BudgetCalculator from '@/components/components/sections/BudgetCalculator';
import Gallery from '@/components/components/sections/Gallery';
import BeforeAfter from '@/components/components/sections/BeforeAfter';
import VideoReels from '@/components/components/sections/VideoReels';
import MeetTheChef from '@/components/components/sections/MeetTheChef';
import Testimonials from '@/components/components/sections/Testimonials';
import BookingCalendar from '@/components/components/sections/BookingCalendar';
import GuestCalculator from '@/components/components/sections/GuestCalculator';
import FAQ from '@/components/components/sections/FAQ';
import LoyaltyProgram from '@/components/components/sections/LoyaltyProgram';
import BookingForm from '@/components/components/sections/BookingForm';
import Footer from '@/components/components/sections/Footer';
import MobileBookButton from '@/components/components/sections/MobileBookButton';

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Services />
      <Packages />
      <Menu />
      <BuildYourMenu />
      <BudgetCalculator />
      <Gallery />
      <BeforeAfter />
      <VideoReels />
      <MeetTheChef />
      <Testimonials />
      <BookingCalendar />
      <GuestCalculator />
      <FAQ />
      <LoyaltyProgram />
      <BookingForm />
      <Footer />
      <MobileBookButton />
    </main>
  );
}
