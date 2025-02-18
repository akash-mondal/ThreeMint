import React, { useCallback, useState, useEffect, useRef } from "react";
import type { Engine } from "tsparticles-engine";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { Cuboid as Cube3d } from 'lucide-react';
import Login from './components/Login';
import Footer from './components/Footer';
import { Header } from './components/Header';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [currentPage, setCurrentPage] = useState('Home');

  const homeRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const pricingRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null); // Changed from contactRef

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '-50% 0px', // This will trigger when section is in middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.getAttribute('data-section-id');
          if (sectionId) {
            setCurrentPage(sectionId);
          }
        }
      });
    }, options);

    // Observe all sections
    const sections = document.querySelectorAll('[data-section-id]');
    sections.forEach(section => observer.observe(section));

    return () => {
      sections.forEach(section => observer.unobserve(section));
    };
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
              interactivity: {
                events: {
                  onHover: {
                    enable: true,
                    mode: "grab",
                  },
                  onClick: {
                    enable: true,
                    mode: "push"
                  },
                  resize: true,
                },
                modes: {
                  grab: {
                    distance: 140,
                    links: {
                      opacity: 1
                    }
                  },
                  push: {
                    quantity: 4
                  }
                },
              },
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
                collisions: {
                  enable: true,
                },
                move: {
                  direction: "none",
                  enable: true,
                  outModes: {
                    default: "bounce",
                  },
                  random: false,
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
              detectRetina: true,
            }}
          />

          <Header currentPage={currentPage} footerRef={footerRef} /> {/* Pass footerRef to Header */}

          <div className="pt-16">
            <section ref={homeRef} data-section-id="Home" className="min-h-screen relative flex items-center justify-center text-white">
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

            <section ref={aboutRef} data-section-id="About" className="min-h-screen bg-gray-900 relative">
              {/* About section content */}
            </section>

            <section ref={techRef} data-section-id="Tech" className="min-h-screen bg-black relative">
              {/* Tech section content */}
            </section>

            <section ref={pricingRef} data-section-id="Pricing" className="min-h-screen bg-gray-900 relative">
              {/* Pricing section content */}
            </section>

            <Footer ref={footerRef} />
          </div>
        </>
      )}
    </div>
  );
}

export default App;