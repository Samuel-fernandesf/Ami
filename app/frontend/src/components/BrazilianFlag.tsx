import { motion } from 'motion/react';

interface BrazilianFlagProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}

export function BrazilianFlag({ size = 'md', animated = true }: BrazilianFlagProps) {
  const sizeClasses = {
    sm: 'w-6 h-4',
    md: 'w-12 h-8', 
    lg: 'w-24 h-16'
  };

  const Flag = (
    <div className={`${sizeClasses[size]} relative overflow-hidden rounded-sm shadow-sm`}>
      {/* Green background */}
      <div className="absolute inset-0 bg-brasil-green" />
      
      {/* Yellow diamond */}
      <div 
        className="absolute inset-0 bg-brasil-yellow"
        style={{
          clipPath: 'polygon(50% 15%, 85% 50%, 50% 85%, 15% 50%)'
        }}
      />
      
      {/* Blue circle */}
      <div 
        className="absolute bg-brasil-blue rounded-full"
        style={{
          top: '35%',
          left: '35%',
          width: '30%',
          height: '30%'
        }}
      />
    </div>
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        {Flag}
      </motion.div>
    );
  }

  return Flag;
}