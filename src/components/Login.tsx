import React, { useState, useEffect, useRef } from 'react';
import { Github, Twitter, X, Disc as Discord, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Alert from './Alert';
import GuestDashboard from './GuestDashboard';

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const [showAlert, setShowAlert] = useState(true);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const shapesContainerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (gradientRef.current) {
        const rect = gradientRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        gradientRef.current.style.setProperty('--mouse-x', `${x}px`);
        gradientRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
      
      if (shapesContainerRef.current) {
        const rect = shapesContainerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const rotateX = (e.clientY - centerY) / 20;
        const rotateY = (e.clientX - centerX) / 20;
        
        // Update all shapes
        const shapes = shapesContainerRef.current.getElementsByClassName('shape');
        Array.from(shapes).forEach((shape) => {
          shape.style.setProperty('--rotate-x', `${rotateX}deg`);
          shape.style.setProperty('--rotate-y', `${rotateY}deg`);
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (isGuestMode) {
    return <GuestDashboard />;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Left side - Animated shapes */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 w-1/2 bg-black flex items-center justify-center overflow-hidden"
      >
        <div ref={shapesContainerRef} className="shapes-container">
          {/* Main center cube */}
          <div className="shape cube-container absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>

          {/* Additional floating shapes */}
          <div className="shape cube-container absolute left-1/4 top-1/4 scale-50">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>

          <div className="shape cube-container absolute right-1/4 bottom-1/4 scale-75">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>

          <div className="shape cube-container absolute left-1/3 bottom-1/3 scale-25">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>

          <div className="shape cube-container absolute right-1/3 top-1/3 scale-35">
            <div className="cube">
              <div className="cube-face front"></div>
              <div className="cube-face back"></div>
              <div className="cube-face right"></div>
              <div className="cube-face left"></div>
              <div className="cube-face top"></div>
              <div className="cube-face bottom"></div>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Right side - Updated gradient animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 left-1/2 w-1/2 gradient-side"
      />

      {/* Login box */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="relative bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome to 3Mint</h2>
          <p className="text-gray-600 dark:text-gray-400">Choose your login method</p>
        </div>

        <div className="space-y-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLogin('github')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>Continue with GitHub</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLogin('twitter')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
          >
            <X className="w-5 h-5" />
            <span>Continue with X</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleLogin('discord')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <Discord className="w-5 h-5" />
            <span>Continue with Discord</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setIsGuestMode(true)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <User className="w-5 h-5" />
            <span>Continue as Guest</span>
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Alert Component */}
      <AnimatePresence>
        {showAlert && (
          <Alert onClose={() => setShowAlert(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Login;