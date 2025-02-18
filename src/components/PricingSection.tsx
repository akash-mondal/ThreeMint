import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  yearlyPrice: string;
  subtitle: string;
  features: string[];
  isPopular?: boolean;
}

export const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = useState(false);

  const plans: PricingPlan[] = [
    {
      name: "Intro",
      monthlyPrice: "$20",
      yearlyPrice: "$192", // $16/month * 12
      subtitle: "For hobbyists and beginners exploring AI-powered NFT creation",
      features: [
        "Basic AI model access",
        "5 NFT generations per month",
        "Community support",
        "Basic 3D model exports",
        "Standard resolution"
      ]
    },
    {
      name: "Base",
      monthlyPrice: "$50",
      yearlyPrice: "$480", // $40/month * 12
      subtitle: "For creators starting their NFT journey",
      features: [
        "Advanced AI model access",
        "20 NFT generations per month",
        "Priority support",
        "HD 3D model exports",
        "Custom attributes"
      ]
    },
    {
      name: "Pro",
      monthlyPrice: "$100",
      yearlyPrice: "$960", // $80/month * 12
      subtitle: "For professional NFT creators and artists",
      features: [
        "Premium AI model access",
        "Unlimited NFT generations",
        "24/7 Priority support",
        "4K 3D model exports",
        "Advanced customization"
      ],
      isPopular: true
    },
    {
      name: "Enterprise",
      monthlyPrice: "$200",
      yearlyPrice: "$1,920", // $160/month * 12
      subtitle: "For businesses and large-scale NFT operations",
      features: [
        "Custom AI model training",
        "Unlimited everything",
        "Dedicated support team",
        "8K 3D model exports",
        "White-label solution"
      ]
    }
  ];

  return (
    <div className="w-full max-w-[1484px] mx-auto px-4 py-24">
      <div className="bg-black/30 backdrop-blur-md rounded-[40px] p-8 md:p-16 shadow-xl border-4 border-white/20">
        <h2 className="text-4xl md:text-6xl font-semibold text-center mb-8 bg-gradient-to-r from-[#FF4500] via-[#FFA500] to-[#FFD700] text-transparent bg-clip-text">
          Pricing Plans
        </h2>
        
        <div className="flex justify-center gap-4 mb-16">
          <div className="bg-white/10 p-1 rounded-full">
            <div className="relative flex items-center">
              <motion.div
                className="absolute bg-purple-600 h-full rounded-full transition-all duration-300"
                animate={{
                  x: isYearly ? '100%' : '0%',
                  width: '50%'
                }}
              />
              <button
                onClick={() => setIsYearly(false)}
                className={`relative px-6 py-2 rounded-full transition-colors ${
                  !isYearly ? 'text-white' : 'text-gray-400'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setIsYearly(true)}
                className={`relative px-6 py-2 rounded-full transition-colors ${
                  isYearly ? 'text-white' : 'text-gray-400'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: plan.isPopular ? 1.05 : 1.02 }}
              className={`relative rounded-2xl p-6 ${
                plan.isPopular 
                  ? 'bg-purple-600 shadow-lg shadow-purple-500/20' 
                  : 'bg-white/5'
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 right-4 bg-pink-500 text-white text-sm px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <div className="mb-4">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <div className="flex items-baseline mt-2">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={isYearly ? 'yearly' : 'monthly'}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="text-4xl font-bold text-white"
                    >
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </motion.span>
                  </AnimatePresence>
                  <span className="text-gray-400 ml-2">/{isYearly ? 'year' : 'month'}</span>
                </div>
                {isYearly && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-green-400 text-sm mt-1"
                  >
                    Save 20% with yearly billing
                  </motion.div>
                )}
                <p className="text-sm text-gray-300 mt-2">{plan.subtitle}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Check className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full py-3 rounded-lg font-medium ${
                  plan.isPopular
                    ? 'bg-pink-500 text-white hover:bg-pink-600'
                    : 'bg-white/10 text-white hover:bg-white/20'
                } transition-colors`}
              >
                Choose plan
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
