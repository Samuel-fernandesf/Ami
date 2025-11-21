import { motion } from 'motion/react';
import { AmiLogo } from './AmiLogo';

interface AmiBrandProps {
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
  showTagline?: boolean;
  className?: string;
}

const sizes = {
  sm: { logoSize: 'md' as const, textSize: 'text-xl', taglineSize: 'text-sm' },
  md: { logoSize: 'lg' as const, textSize: 'text-3xl', taglineSize: 'text-base' },
  lg: { logoSize: 'xl' as const, textSize: 'text-5xl', taglineSize: 'text-lg' }
};

export function AmiBrand({ 
  size = 'md', 
  animated = true, 
  showTagline = true, 
  className = '' 
}: AmiBrandProps) {
  const { logoSize, textSize, taglineSize } = sizes[size];

  return (
    <motion.div 
      className={`flex flex-col items-center justify-center text-center space-y-4 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ 
          delay: 0.2, 
          type: "spring", 
          stiffness: 200,
          damping: 10 
        }}
      >
        <AmiLogo size={logoSize} animated={animated} />
      </motion.div>

      {/* Brand Name */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="space-y-2"
      >
        <h1 className={`${textSize} font-bold bg-gradient-to-r from-brasil-green via-brasil-blue to-brasil-green bg-clip-text text-transparent`}>
          Ami
        </h1>
        
        {showTagline && (
          <motion.p 
            className={`${taglineSize} text-muted-foreground max-w-md`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Conectando amigos para o bem 🇧🇷
          </motion.p>
        )}
      </motion.div>

      {/* Decorative elements - friendship sparkles */}
      {animated && (
        <motion.div
          className="flex space-x-2 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor: i === 0 ? '#009B3A' : i === 1 ? '#FEDF00' : '#002776'
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.4
              }}
            />
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

// Versão horizontal para headers e footers
export function AmiBrandHorizontal({ 
  size = 'md', 
  animated = false, 
  className = '' 
}: Omit<AmiBrandProps, 'showTagline'>) {
  const { logoSize, textSize } = sizes[size];

  return (
    <motion.div 
      className={`flex items-center space-x-3 ${className}`}
      whileHover={{ scale: animated ? 1.02 : 1 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <AmiLogo size={logoSize} animated={animated} />
      <div className="flex items-center space-x-2">
        <h1 className={`${textSize} font-bold bg-gradient-to-r from-brasil-green via-brasil-blue to-brasil-green bg-clip-text text-transparent`}>
          Ami
        </h1>
        <span className="text-brasil-yellow">🇧🇷</span>
      </div>
    </motion.div>
  );
}