import { motion } from 'framer-motion';

/**
 * Premium Animated Background
 * Stripe-style mesh gradient with floating orbs
 * Clean, professional, and performant
 */

const AnimatedBackground = () => {
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
