import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface StatsCounterProps {
  endValue: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  startDelay?: number;
}

export function StatsCounter({ 
  endValue, 
  duration = 2000, 
  prefix = '', 
  suffix = '', 
  decimals = 0,
  startDelay = 0 
}: StatsCounterProps) {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    const startTime = Date.now() + startDelay;
    const animate = () => {
      const now = Date.now();
      const elapsed = Math.max(0, now - startTime);
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (easeOutQuart)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const value = easeOutQuart * endValue;
      setCurrentValue(value);
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(animate);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [endValue, duration, startDelay]);

  const formattedValue = currentValue.toFixed(decimals);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: startDelay / 1000 }}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  );
}