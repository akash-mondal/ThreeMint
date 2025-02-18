import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, Settings } from 'lucide-react';

interface AccountMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50"
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 right-4 w-48 bg-black/90 backdrop-blur-md border border-white/20 rounded-xl shadow-xl z-50"
          >
            <div className="py-2">
              <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 transition-colors">
                <User size={16} />
                <span>Profile</span>
              </button>
              <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 transition-colors">
                <Settings size={16} />
                <span>Settings</span>
              </button>
              <div className="border-t border-white/20 my-1" />
              <button className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/10 transition-colors text-red-500">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AccountMenu;
