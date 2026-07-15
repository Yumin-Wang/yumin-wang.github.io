import { motion } from "framer-motion";

export default function Reveal({
  children,
  delay = 0,
  y = 24,
  duration = 0.6,
  className,
  once = true,
  amount = 0.2,
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
