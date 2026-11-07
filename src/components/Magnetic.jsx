import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useMotion } from "../lib/motion.jsx";

const finePointer = () => typeof matchMedia !== "undefined" && matchMedia("(pointer: fine)").matches;

/** Subtle magnetic pull on fine-pointer devices; a plain wrapper everywhere else. */
export default function Magnetic({ children, strength = 0.25 }) {
  const { enabled } = useMotion();
  const ref = useRef(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18 });

  if (!enabled || !finePointer()) return <span className="magnetic">{children}</span>;

  const onMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((event.clientX - rect.left - rect.width / 2) * strength);
    y.set((event.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span ref={ref} className="magnetic" style={{ x, y }} onPointerMove={onMove} onPointerLeave={reset}>
      {children}
    </motion.span>
  );
}
