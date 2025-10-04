import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function TypingText({ text = "", speed = 50 }) {
  const [displayed, setDisplayed] = React.useState("");

  React.useEffect(() => {
    let current = 0;
    setDisplayed("");
    function typeNext() {
      if (current <= text.length) {
        setDisplayed(text.slice(0, current));
        current++;
        setTimeout(typeNext, speed);
      }
    }
    typeNext();
  }, [text, speed]);

  return <span>{displayed}</span>;
}

export default function Hero() {
  const canvasRef = useRef(null);
  const lights = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const isMobile = window.innerWidth < 768;
    const numLights = isMobile ? 20 : 60;      // fewer lights for mobile
    const shadowBlur = isMobile ? 5 : 15;      // smaller shadow blur

    // Initialize lights
    lights.current = Array.from({ length: numLights }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      width: Math.random() * 6 + 4,
      height: Math.random() * 12 + 6,
      colorPhase: Math.random() * Math.PI * 2,
      opacityPhase: Math.random() * Math.PI * 2,
    }));

    // Animate canvas
    const animate = () => {
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, width, height);

      lights.current.forEach(light => {
        const opacity = 0.5 + 0.5 * Math.sin(light.opacityPhase);
        light.opacityPhase += 0.02;

        const r = 255;
        const g = 100 + 155 * (0.5 + 0.5 * Math.sin(light.colorPhase));
        const b = 255;
        light.colorPhase += 0.01;

        const color = `rgba(${r}, ${g}, ${b}, ${opacity})`;

        ctx.beginPath();
        const w = light.width;
        const h = light.height;
        ctx.moveTo(light.x, light.y - h / 2);
        ctx.lineTo(light.x + w / 2, light.y);
        ctx.lineTo(light.x, light.y + h / 2);
        ctx.lineTo(light.x - w / 2, light.y);
        ctx.closePath();

        ctx.shadowBlur = shadowBlur;
        ctx.shadowColor = color;
        ctx.fillStyle = color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center text-center text-white relative overflow-hidden px-4 md:px-0"
    >
      {/* Canvas for lights */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full z-0 hero-canvas"
        style={{ willChange: "transform, opacity" }}
      />

      {/* Moving purple backlight */}
      <motion.div
        animate={{
          x: isMobile ? ["-5%", "5%", "-5%"] : ["-10%", "10%", "-10%"],
          y: isMobile ? ["-5%", "5%", "-5%"] : ["-10%", "10%", "-10%"],
          scale: isMobile ? [1, 1.03, 1] : [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        className={`absolute w-[${isMobile ? "200px" : "600px"}] h-[${isMobile ? "200px" : "600px"}] bg-purple-500 rounded-full blur-3xl opacity-20 z-0 hero-backlight`}
        style={{ willChange: "transform, opacity" }}
      />

      {/* Intro text */}
      <motion.h1
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-3xl sm:text-4xl md:text-7xl font-extrabold drop-shadow-lg z-10 leading-tight"
      >
        Hi, I’m <span className="text-purple-400">Antonio</span>
      </motion.h1>

      {/* Typing effect */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="mt-2 text-base sm:text-lg md:text-3xl font-mono h-6 sm:h-8 z-10 text-purple-300"
      >
        <TypingText text="Innovator in Code | Full-Stack Architect | Problem Solver" />
      </motion.h2>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="mt-4 md:mt-6 text-sm sm:text-base md:text-xl text-gray-300 max-w-md sm:max-w-lg md:max-w-xl z-10"
      >
        Merging Software Engineering expertise with Network Security fundamentals to build and secure the next generation of digital platforms.
      </motion.p>
    </section>
  );
}
