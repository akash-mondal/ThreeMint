import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  variant?: 'primary' | 'secondary';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  buttonText,
  variant = 'secondary'
}) => {
  return (
    <div className={`flex flex-col p-12 w-[421px] h-[474px] gap-6 border ${
      variant === 'primary' 
        ? 'bg-[#393556] border-[#6b6785]' 
        : 'bg-[#080134] border-[#393556]'
    }`}>
      <div className={`w-16 h-16 rounded-[70px] p-3 flex items-center justify-center ${
        variant === 'primary' ? 'bg-[#393556]' : 'bg-[#080134]'
      }`}>
        <div className="text-white w-10 h-10">
          {icon}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="text-[36px] leading-[43px] font-normal text-white font-inter">
          {title}
        </h3>
        
        <p className={`text-base leading-[26px] font-medium font-epilogue ${
          variant === 'primary' ? 'text-[#ceccd6]' : 'text-white'
        }`}>
          {description}
        </p>

        <button className="mt-auto w-full py-2 px-8 bg-[#01c5ba] text-[#080134] font-epilogue font-semibold text-base">
          {buttonText}
        </button>
      </div>
    </div>
  );
};
