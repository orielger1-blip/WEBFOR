import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Premium Animated Background
 * Stripe-style mesh gradient with floating orbs
 * Clean, professional, and performant
 * Disabled on mobile for performance
 */

const AnimatedBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Disable on mobile for performance
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render on mobile - CSS handles the gradient background
  if (isMobile) {
    return null;
  }

  return (
    <div className="animated-background">
      {/* Base gradient layer */}
      <div className="gradient-base" />

      {/* Animated floating orbs */}
      <motion.div
        className="gradient-orb orb-1"
        animate={{
          x: [0, 50, 0],
          y: [0, -30, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="gradient-orb orb-2"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
          scale: [1.1, 1, 1.1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="gradient-orb orb-3"
        animate={{
          x: [0, 30, 0],
          y: [0, 50, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="gradient-orb orb-4"
        animate={{
          x: [0, -60, 0],
          y: [0, -20, 0],
          scale: [1.05, 0.95, 1.05],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Subtle grid pattern overlay */}
      <div className="grid-overlay" />

      {/* Noise texture for depth */}
      <div className="noise-overlay" />
    </div>
  );
};

export default AnimatedBackground;
