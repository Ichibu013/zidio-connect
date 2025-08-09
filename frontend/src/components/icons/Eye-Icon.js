import { motion, AnimatePresence } from "framer-motion";
import { FiEyeOff,FiEye } from "react-icons/fi";

export default function EyeIcon({showPassword}) {
  return (
    <AnimatePresence mode="wait">
      {/* Conditionally render the 'Eye' or 'EyeOff' icon with animation. */}
      {showPassword ? (
        <motion.div
          key="eye-off"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <FiEyeOff size={20} />
        </motion.div>
      ) : (
        <motion.div
          key="eye"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          transition={{ duration: 0.2 }}
        >
          <FiEye size={20} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
