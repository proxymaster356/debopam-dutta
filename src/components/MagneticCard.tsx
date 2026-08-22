import React, { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';

interface MagneticCardProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

const MagneticCard: React.FC<MagneticCardProps> = ({ 
  children, 
  className = '', 
  strength = 15 
}) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const [{ x, y }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    config: { mass: 1, tension: 400, friction: 30 },
  }));

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Calculate distance from center (-1 to 1)
    const distanceX = (e.clientX - centerX) / (width / 2);
    const distanceY = (e.clientY - centerY) / (height / 2);
    
    api.start({
      x: distanceX * strength,
      y: distanceY * strength,
    });
  };

  const handleMouseLeave = () => {
    api.start({ x: 0, y: 0, config: { mass: 1, tension: 500, friction: 20 } });
  };

  return (
    <animated.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`relative inline-block ${className}`}
    >
      {children}
    </animated.div>
  );
};

export default MagneticCard;
