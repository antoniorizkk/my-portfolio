import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHome, FaProjectDiagram, FaEnvelope, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-scroll";

const navItems = [
  { id: "hero", label: "Home", icon: <FaHome /> },
  { id: "about", label: "About", icon: <FaUser /> },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
  { id: "contact", label: "Contact", icon: <FaEnvelope /> },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-black/60 backdrop-blur-md text-white z-50 shadow-lg">
      <div className="max-w-6xl mx-auto flex justify-between items-center py-3 px-6">
        {/* Logo or Name */}
        <motion.div
          className="text-2xl font-bold text-purple-400 cursor-pointer"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Antonio Codes
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.id}
              to={item.id}
              smooth={true}
              duration={600}
              spy={true}
              offset={-70}
              className="flex flex-col items-center text-sm group relative cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="text-xl mb-1 text-purple-300 group-hover:text-purple-500 transition"
              >
                {item.icon}
              </motion.div>
              <span className="group-hover:text-purple-400 transition">{item.label}</span>
              <motion.div
                className="absolute bottom-0 w-0 h-[2px] bg-purple-500"
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
              />
            </Link>
          ))}
        </div>

        {/* Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-purple-400 hover:text-purple-500 transition"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gray-900/90 backdrop-blur-md"
          >
            <div className="flex flex-col items-center py-4 gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.id}
                  smooth={true}
                  duration={600}
                  spy={true}
                  offset={-70}
                  className="flex items-center gap-2 text-lg text-purple-300 hover:text-purple-400 transition cursor-pointer"
                  onClick={() => setIsOpen(false)} // close menu on click
                >
                  {item.icon} {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
