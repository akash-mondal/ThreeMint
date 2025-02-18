import React from 'react';
import { motion } from 'framer-motion';
import { StepCard } from './StepCard';
import { Wallet, Upload, Bookmark, Code, Lightbulb, Cog } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <div className="w-full max-w-[1484px] mx-auto px-4 py-24">
      <div className="bg-black/50 backdrop-blur-sm rounded-[40px] p-8 md:p-16 shadow-xl border-4 border-white">
        <h2 className="text-4xl md:text-6xl font-semibold text-center mb-24 bg-gradient-to-r from-[#40E0D0] via-[#D8BFD8] to-[#9370DB] text-transparent bg-clip-text">
          It Can't Get Easier
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-[1386px] mx-auto">
          <StepCard
            icon={<Wallet size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />}
            title="Set up your wallet"
            description="Once you've set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support."
          />

          <StepCard
            icon={<Upload size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500" />}
            title="Prompt & Create Collection"
            description="Prompt Our Custom GenAI Models to Create Stellar Pics which you can then Convert to High Resolution 3D Models for Free!"
          />

          <StepCard
            icon={<Bookmark size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-pink-500 to-red-500" />}
            title="List them for sale"
            description="Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your NFTs, and we help you sell them"
          />
        </div>
      </div>
    </div>
  );
};

export const TechSection: React.FC = () => {
  return (
    <div className="w-full max-w-[1484px] mx-auto px-4 py-24">
      <div className="bg-black/50 backdrop-blur-sm rounded-[40px] p-8 md:p-16 shadow-xl border-4 border-white">
        <h2 className="text-4xl md:text-6xl font-semibold text-center mb-24 bg-gradient-to-r from-[#40E0D0] via-[#D8BFD8] to-[#9370DB] text-transparent bg-clip-text">
          Our Technology
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 max-w-[1386px] mx-auto">
          <StepCard
            icon={<Code size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />}
            title="AI-Powered Generation"
            description="Leveraging advanced artificial intelligence to transform textual descriptions into detailed 3D models with stunning accuracy."
          />

          <StepCard
            icon={<Lightbulb size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-cyan-500 to-green-500" />}
            title="Blockchain Integration"
            description="Seamlessly mint your creations as NFTs on leading blockchain networks for secure ownership, provenance, and easy trading."
          />

          <StepCard
            icon={<Cog size={80} className="text-white p-4 rounded-full bg-gradient-to-r from-green-500 to-yellow-500" />}
            title="Optimized 3D Rendering"
            description="Utilizing cutting-edge rendering techniques to ensure your NFTs look breathtaking across all devices, from phones to VR headsets."
          />

        </div>
      </div>
    </div>
  );
};

export const PricingSection: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      features: ['Limited features', 'Basic support', 'Community access'],
    },
    {
      name: 'Plus',
      price: '$9.99',
      features: ['Full power', 'Priority support', 'Access to new features'],
    },
    {
      name: 'Pro',
      price: '$19.99',
      features: ['All features', '24/7 support', 'Advanced analytics'],
    },
  ];

  return (
    <div className="w-full max-w-[1484px] mx-auto px-4 py-24">
      <div className="bg-black/30 backdrop-blur-md rounded-[40px] p-8 md:p-16 shadow-xl border-4 border-white/20">
        <h2 className="text-4xl md:text-6xl font-semibold text-center mb-24 bg-gradient-to-r from-[#FF4500] via-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
          Pricing Plans
        </h2>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/10 rounded-lg shadow-lg backdrop-blur-md">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-white">Feature</th>
                {plans.map((plan) => (
                  <th key={plan.name} className="px-6 py-4 text-left">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="text-xl font-bold text-white"
                    >
                      {plan.name}
                    </motion.div>
                    <div className="text-lg text-gray-300">{plan.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {plans[0].features.map((feature, featureIndex) => (
                <tr key={featureIndex} className="border-t border-white/20">
                  <td className="px-6 py-4 text-gray-300">{feature}</td>
                  {plans.map((plan) => (
                    <td key={plan.name} className="px-6 py-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-gray-300"
                      >
                        {plan.features[featureIndex]}
                      </motion.div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
