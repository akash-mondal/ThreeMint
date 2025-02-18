import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, User, Plus, LogOut } from 'lucide-react';
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import Sidebar from './Sidebar';
import NFTGeneratorModal from './NFTGeneratorModal';

const GuestDashboard: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };

  const handleSignOut = () => {
    window.location.href = '/login'; // Changed to redirect to login page
  };

  const handleNavigateHome = () => {
    window.location.href = '/'; // This stays as landing page
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "#000000",
            },
          },
          fpsLimit: 120,
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              speed: 1,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
          },
        }}
      />

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/20">
        <div className="flex justify-between items-center px-4 py-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-white/10 rounded-full"
          >
            <Menu size={24} />
          </motion.button>

          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 hover:bg-white/10 rounded-full cursor-pointer"
            >
              <User size={24} />
            </motion.div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-500 rounded-full transition-colors"
            >
              <LogOut size={20} />
              <span>Sign Out</span>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onNavigateHome={handleNavigateHome}
      />

      {/* Main Content */}
      <div className="pt-16 px-4 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-[1484px] w-full text-center space-y-12">
          {/* Welcome Card */}
          <div className="bg-black/30 backdrop-blur-md rounded-[20px] p-8 border border-white/20">
            <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-[#40E0D0] via-[#D8BFD8] to-[#9370DB] text-transparent bg-clip-text">
              Welcome to the Closed Alpha of Three Mint
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              For now we only allow you a sneak peek of our Custom AI Pipeline. 
              Click on the Shiny Button below and see step by step how we make your dreams into reality.
            </p>
          </div>

          {/* Plus Button Card */}
          <motion.div 
            className="inline-block cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
          >
            <div className="bg-black/30 backdrop-blur-md rounded-[40px] p-16 border-4 border-white/20 hover:border-white/40 transition-colors">
              <Plus size={80} className="text-white/70" />
            </div>
          </motion.div>
          
          <h2 className="mt-8 text-2xl font-bold bg-gradient-to-r from-[#40E0D0] via-[#D8BFD8] to-[#9370DB] text-transparent bg-clip-text">
            Make your first masterpiece!
          </h2>
        </div>
      </div>

      {/* NFT Generator Modal */}
      <NFTGeneratorModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default GuestDashboard;
