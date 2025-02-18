import React from 'react';
import { useCallback, useState } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Cuboid as Cube3d, Github, Twitter, X } from 'lucide-react';
import Login from './components/Login';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <div className="relative">
      {showLogin ? (
        <Login onClose={() => setShowLogin(false)} />
      ) : (
        <>
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
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: true,
                  speed: 1,
                  straight: false,
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
                shape: {
                  type: "circle",
                },
                size: {
                  value: { min: 1, max: 3 },
                },
              },
            }}
          />

          {/* Hero Section */}
          <section className="min-h-screen relative flex items-center justify-center text-white">
            <div className="container mx-auto px-6 text-center">
              <div className="flex justify-center mb-8">
                <Cube3d size={64} className="text-blue-500" />
              </div>
              <h1 className="text-6xl font-bold mb-4">3Mint</h1>
              <p className="text-xl mb-8">Create and mint stunning 3D NFTs using just words</p>
              <button 
                onClick={() => setShowLogin(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
              >
                Get Started
              </button>
            </div>
          </section>

          {/* Placeholder sections for future content */}
          <section className="min-h-screen bg-gray-900 relative">
            {/* Section 2 content will go here */}
          </section>

          <section className="min-h-screen bg-black relative">
            {/* Section 3 content will go here */}
          </section>

          <section className="min-h-screen bg-gray-900 relative">
            {/* Section 4 content will go here */}
          </section>

          {/* Footer */}
          <footer className="bg-black text-white py-12">
            <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                  <div className="flex items-center mb-4">
                    <Cube3d size={32} className="text-blue-500 mr-2" />
                    <span className="text-xl font-bold">3Mint</span>
                  </div>
                  <p className="text-gray-400">Create, mint, and trade unique 3D NFTs using AI technology.</p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">Documentation</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">Tutorials</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">Blog</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">About</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">Careers</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-blue-500">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Connect</h3>
                  <div className="flex space-x-4">
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <Twitter size={24} />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-blue-500">
                      <Github size={24} />
                    </a>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
                <p>&copy; 2024 3Mint. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;