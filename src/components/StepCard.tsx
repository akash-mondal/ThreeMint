import React from 'react';

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ icon, title, description }) => {
  return (
    <div className="relative flex flex-col items-center">
      <div className="absolute -top-8 z-10">
        {icon}
      </div>
      <div className="flex flex-col items-center justify-center px-6 py-8 space-y-7 w-full max-w-[450px] min-h-[380px] rounded-2xl bg-gradient-to-br from-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.1)] backdrop-blur-md border border-[rgba(255,255,255,0.18)] shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">
        <h3 className="text-2xl md:text-[32px] font-semibold font-poppins text-white leading-[42px] text-center mt-8">
          {title}
        </h3>
        <p className="text-base md:text-lg font-normal font-poppins text-white leading-[27px] text-center">
          {description}
        </p>
      </div>
    </div>
  );
};
