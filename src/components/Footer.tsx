import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';
import { Cuboid as Cube3d, Github, Twitter } from 'lucide-react';

const Footer = forwardRef<HTMLElement>((props, ref) => {
  // Animation variants for stagger effect
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Hover animation for links
  const linkHoverVariants = {
    hover: {
      scale: 1.05,
      color: "#3B82F6", // blue-500
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Social icon hover animation
  const socialIconVariants = {
    hover: {
      scale: 1.2,
      rotate: 12,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer ref={ref} className="bg-black text-white py-12 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 animate-gradient-x opacity-50" />
      
      <motion.div
        className="container mx-auto px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants}>
            <motion.div 
              className="flex items-center mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Cube3d size={32} className="text-blue-500 mr-2" />
              <span className="text-xl font-bold">3Mint</span>
            </motion.div>
            <p className="text-gray-400">Create, mint, and trade unique 3D NFTs using AI technology.</p>
          </motion.div>

          {/* Resources Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['Documentation', 'Tutorials', 'Blog'].map((item) => (
                <motion.li key={item} variants={linkHoverVariants} whileHover="hover">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {['About', 'Careers', 'Contact'].map((item) => (
                <motion.li key={item} variants={linkHoverVariants} whileHover="hover">
                  <a href="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Connect Column */}
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-blue-500"
              >
                <Twitter size={24} />
              </motion.a>
              <motion.a
                href="#"
                variants={socialIconVariants}
                whileHover="hover"
                className="text-gray-400 hover:text-blue-500"
              >
                <Github size={24} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Copyright Section */}
        <motion.div
          variants={itemVariants}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <motion.p
            className="text-gray-400"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            &copy; 2024 3Mint. All rights reserved.
          </motion.p>
        </motion.div>
      </motion.div>
    </footer>
  );
});

export default Footer;
