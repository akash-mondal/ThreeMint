import React from 'react';
import { Github, Twitter, X, Disc as Discord, User } from 'lucide-react';
import { motion } from 'framer-motion';

interface LoginProps {
  onClose: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose }) => {
  const handleLogin = (provider: string) => {
    if (provider === 'guest') {
      // Handle guest login
      console.log('Guest login');
    } else {
      // Show dummy message for other providers
      console.log(`${provider} login - Coming soon`);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Left side - Animated gradient background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 w-1/2 bg-black flex items-center justify-center"
      >
        {/* Rotating Cube */}
        <div className="cube">
          <div className="cube-face front"></div>
          <div className="cube-face back"></div>
          <div className="cube-face right"></div>
          <div className="cube-face left"></div>
          <div className="cube-face top"></div>
          <div className="cube-face bottom"></div>
        </div>
      </motion.div>
      
      {/* Right side - RGB animation */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 left-1/2 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x" />
      </motion.div>

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
            onClick={() => handleLogin('guest')}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
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
    </div>
  );
};

export default Login;