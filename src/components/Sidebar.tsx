import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Home, Settings, HelpCircle } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigateHome: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onNavigateHome }) => {
  const menuItems = [
    { icon: <Home size={20} />, label: 'Home', onClick: onNavigateHome },
    { icon: <Settings size={20} />, label: 'Settings', onClick: () => {} },
    { icon: <HelpCircle size={20} />, label: 'Help', onClick: () => {} },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 20 }}
            className="fixed top-0 left-0 h-full w-64 bg-black/90 backdrop-blur-md border-r border-white/20 z-50"
          >
            <div className="p-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full"
              >
                <X size={24} />
              </motion.button>
            </div>

            <nav className="mt-8">
              {menuItems.map((item, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05, x: 10 }}
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className="flex items-center gap-4 w-full p-4 hover:bg-white/10 transition-colors"
                >
                  {item.icon}
                  <span>{item.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;
