import { motion } from 'framer-motion';
import { RefObject } from 'react';

interface HeaderProps {
  currentPage?: string;
  footerRef?: RefObject<HTMLElement>;
}

export const Header = ({ currentPage = 'Home', footerRef }: HeaderProps) => {
  const navItems = ['Home', 'About', 'Tech', 'Pricing', 'Contact'];

  const scrollToSection = (sectionId: string) => {
    if (sectionId === 'Contact' && footerRef?.current) {
      footerRef.current.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    const element = document.querySelector(`[data-section-id="${sectionId}"]`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 transform -translate-x-1/2 w-auto py-2 px-6 z-20 backdrop-blur-md bg-white/30 shadow-lg rounded-2xl">
      <nav className="flex items-center justify-center gap-4">
        {navItems.map((item) => (
          <motion.button
            key={item}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-2 rounded-xl transition-colors ${
              currentPage === item
                ? 'bg-white text-black'
                : 'text-gray-400 hover:text-gray-200'
            }`}
            onClick={() => scrollToSection(item)}
          >
            {item}
          </motion.button>
        ))}
      </nav>
    </header>
  );
};