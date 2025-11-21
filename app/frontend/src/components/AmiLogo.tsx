import { motion } from 'motion/react';
import logoImg from 'figma:asset/70faa93e40c28fd494b6f0b247bf4904b2458761.png';

interface AmiLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  animated?: boolean;
  className?: string;
}

const sizes = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 }
};

export function AmiLogo({ size = 'md', animated = false, className = '' }: AmiLogoProps) {
  const { width, height } = sizes[size];
  
  const LogoContent = (
    <img
      src={logoImg}
      alt="Ami Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );

  if (animated) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ display: 'inline-block' }}
      >
        {LogoContent}
      </motion.div>
    );
  }

  return <div style={{ display: 'inline-block' }}>{LogoContent}</div>;
}

// Versão simplificada para uso em espaços menores
export function AmiLogoSimple({ size = 'md', className = '' }: Omit<AmiLogoProps, 'animated'>) {
  const { width, height } = sizes[size];
  
  return (
    <img
      src={logoImg}
      alt="Ami Logo"
      width={width}
      height={height}
      className={`object-contain ${className}`}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
}