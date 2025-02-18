import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

interface AlertProps {
  onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: '100%' }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: '100%' }}
      transition={{ type: "spring", duration: 0.6 }}
      className="fixed bottom-4 right-4 w-[343px] bg-[#f1f8fe] rounded-md overflow-hidden border border-[#0172cb] backdrop-blur"
    >
      {/* Line */}
      <div className="w-full h-[3px] bg-[#0172cb]" />

      {/* Wrapper */}
      <div className="p-4 bg-white">
        {/* Content */}
        <div className="space-y-4">
          <h3 className="font-bold text-[14px] leading-5 text-[#252a31]">
            Hey Look Here!
          </h3>
          <p className="text-[14px] leading-5 text-[#252a31]">
            Three Mint is currently in Alpha, We Appreciate Your Interest in our platform, for now you will have to use the Guest Login and share your space with everyone , this is only temporary :)
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
};

export default Alert;
