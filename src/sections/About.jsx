import React from 'react';
import { motion } from "framer-motion";

// --- Skill Data Definitions (No Icons, using text colors for visual flair) ---

// Map of skill names to their distinct colors for the border/glow effect
// These colors mimic the original logos to give a visual hint, maintaining accuracy through text.
const skillColorMap = {
  // Programming Languages
  "C++": "border-blue-500/50 text-blue-300 hover:shadow-blue-500/50",
  "C#": "border-purple-500/50 text-purple-300 hover:shadow-purple-500/50",
  "C": "border-gray-500/50 text-gray-400 hover:shadow-gray-500/50",
  "Java": "border-red-500/50 text-red-300 hover:shadow-red-500/50",
  "Python": "border-yellow-500/50 text-yellow-300 hover:shadow-yellow-500/50",
  "PHP": "border-indigo-500/50 text-indigo-300 hover:shadow-indigo-500/50",
  "JavaScript": "border-yellow-400/50 text-yellow-300 hover:shadow-yellow-400/50",
  
  // Frontend Frameworks & Styling (New Category)
  "HTML": "border-orange-500/50 text-orange-300 hover:shadow-orange-500/50",
  "CSS": "border-blue-500/50 text-blue-300 hover:shadow-blue-500/50",
  "Tailwind CSS": "border-cyan-400/50 text-cyan-300 hover:shadow-cyan-400/50",
  "Bootstrap": "border-purple-600/50 text-purple-300 hover:shadow-purple-600/50",
  "React": "border-sky-400/50 text-sky-300 hover:shadow-sky-400/50",

  // Backend Runtimes & Frameworks (New Category)
  "Node.js": "border-green-500/50 text-green-300 hover:shadow-green-500/50",
  "Next.js": "border-white/50 text-white hover:shadow-white/50",
  "Laravel": "border-red-600/50 text-red-300 hover:shadow-red-600/50",
  
  // Databases & Cloud
  "SQL": "border-orange-400/50 text-orange-300 hover:shadow-orange-400/50",
  "PL/SQL": "border-red-400/50 text-red-300 hover:shadow-red-400/50",
  "MySQL": "border-orange-400/50 text-orange-300 hover:shadow-orange-400/50",
  "Oracle DB": "border-red-400/50 text-red-300 hover:shadow-red-400/50",
  "MS SQL Server": "border-green-600/50 text-green-300 hover:shadow-green-600/50",
  "Firebase": "border-amber-400/50 text-amber-300 hover:shadow-amber-400/50",
  
  // Tools & Operating Systems
  "Docker": "border-blue-600/50 text-blue-300 hover:shadow-blue-600/50",
  "Git": "border-orange-600/50 text-orange-300 hover:shadow-orange-600/50",
  "Windows Server": "border-cyan-500/50 text-cyan-300 hover:shadow-cyan-500/50",
  "Linux": "border-gray-600/50 text-gray-400 hover:shadow-gray-600/50",
  "VS Code": "border-sky-500/50 text-sky-300 hover:shadow-sky-500/50",
  "Visual Studio": "border-fuchsia-600/50 text-fuchsia-300 hover:shadow-fuchsia-600/50",
  "Eclipse": "border-indigo-700/50 text-indigo-300 hover:shadow-indigo-700/50",
  "IntelliJ": "border-rose-700/50 text-rose-300 hover:shadow-rose-700/50",
  "Android Studio": "border-lime-600/50 text-lime-300 hover:shadow-lime-600/50",
};


const skillCategories = [
  {
    category: "Programming Languages",
    items: [
      { name: "C++" },
      { name: "C#" },
      { name: "C" },
      { name: "Java" },
      { name: "Python" },
      { name: "PHP" },
      { name: "JavaScript" },
    ]
  },
  {
    category: "Frontend Frameworks & Styling",
    items: [
      { name: "HTML" },
      { name: "CSS" },
      { name: "Tailwind CSS" },
      { name: "Bootstrap" },
      { name: "React" },
    ]
  },
  {
    category: "Backend Runtimes & Frameworks",
    items: [
      { name: "Node.js" },
      { name: "Next.js" },
      { name: "Laravel" },
    ]
  },
  {
    category: "Databases & Cloud",
    items: [
      { name: "SQL" },
      { name: "PL/SQL" },
      { name: "MySQL" },
      { name: "Oracle DB" },
      { name: "MS SQL Server" },
      { name: "Firebase" },
    ]
  },
  {
    category: "Tools & Operating Systems",
    items: [
      { name: "Docker" },
      { name: "Git" },
      { name: "Windows Server" },
      { name: "Linux" },
      { name: "VS Code" },
      { name: "Visual Studio" },
      { name: "Eclipse" },
      { name: "IntelliJ" },
      { name: "Android Studio" },
    ]
  },
];

const experience = [
  {
    title: "Eurisko Academy – AI Software Engineering Program",
    period: "Sept 2025 – Oct 2025",
    details: [
      "Focused on full-stack AI & system design with weekly deliverables",
      "Built scalable flash-sale platform and retail assistant prototype",
      "Developed document retrieval system with LLMs, FAISS, deployed via Colab",
      "Practiced React fundamentals, Tailwind CSS, and AI-assisted UI generation"
    ]
  },
  {
    title: "Centre Hospitalier Du Nord – IT Developer Intern",
    period: "Apr 2025 – Jul 2025",
    details: [
      "Worked with Oracle Forms, PL/SQL, and Toad for hospital systems",
      "Assisted IT team in database optimization and system documentation",
      "Researched mobile app solutions for internal use cases"
    ]
  },
  {
    title: "CodSoft – Web Development Intern",
    period: "Apr 2024 – May 2024",
    details: [
      "Built responsive React.js website for desktop & mobile",
      "Debugged and optimized front-end performance",
      "Collaborated on UI enhancements with senior developers"
    ]
  },
  {
    title: "ETE-services – Full-Stack Developer Intern",
    period: "Jul 2023 – Aug 2023",
    details: [
      "Contributed to React.js/Next.js/Node.js/MySQL/MongoDB apps",
      "Implemented user-facing features improving workflow efficiency",
      "Worked in Agile team environment with version control exposure"
    ]
  },
];

// --- Main App Component ---

// Utility function to get the color class for a skill
const getSkillColorClass = (skillName) => {
    return skillColorMap[skillName] || "border-white/20 text-gray-300 hover:shadow-white/20";
};

// We define the main component as App and export it.
export default function App() {
  return (
    // Outer container for a clean, full-height display
    <div className="min-h-screen bg-gray-900 font-inter antialiased">
      <section id="about" className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-6">
        
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 text-center"
        >
          About Me
        </motion.h2>

        {/* Profile Summary */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-3xl text-center text-xl text-gray-300 mb-8 border-b-2 border-purple-500/50 pb-8"
        >
          Software Engineering and Networks graduate with hands-on experience proven through internships and self-managed projects. Skilled in software development, IT systems, and security, with a track record of delivering practical solutions in web, mobile, and enterprise environments. Seeking an entry-level developer position or graduate level where I can apply technical expertise and problem-solving skills.
        </motion.p>

        {/* Download CV Button (Placeholder Link) */}
        <motion.a
          href="#" 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6, type: "spring" }}
          whileHover={{ scale: 1.1, boxShadow: "0 0 25px rgba(168, 85, 247, 0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="mb-16 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-full shadow-2xl text-lg transition duration-300 transform hover:-translate-y-1 active:shadow-inner"
        >
          📄 View CV
        </motion.a>

        {/* Education & Skills Container */}
        <div className="flex flex-col lg:flex-row gap-12 w-full max-w-6xl mb-16">
          
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-8 lg:w-1/3 bg-gray-800 rounded-2xl shadow-xl border border-purple-500/30"
          >
            <h3 className="text-3xl font-semibold text-purple-300 mb-4 border-b border-purple-500/50 pb-2">Education</h3>
            <div className="text-gray-300">
              <p className="font-bold text-lg mb-1">Bachelor of Software Engineering and Networks</p>
              <p className="text-sm text-gray-400 mb-3">Antonine University, Lebanon | Sept 2018 – Sept 2025</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Relevant Coursework: Software Engineering, Computer Networks, Cloud Computing, Database Systems, Security</li>
                <li>Cisco CCNA 1–4 Certified</li>
              </ul>
            </div>
          </motion.div>

          {/* Skills Grid - Now Categorized */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3"
          >
            <h3 className="text-3xl font-semibold text-purple-300 mb-6 text-center">Technical Skills</h3>
            
            {skillCategories.map((group, groupIndex) => (
              <div key={groupIndex} className="mb-8">
                <h4 className="text-2xl font-medium text-gray-200 mb-4 border-b border-gray-700 pb-2">
                  {group.category}
                </h4>
                {/* Text-based Skill Tag Grid */}
                <div className="flex flex-wrap gap-3"> 
                  {group.items.map((skill, index) => {
                    const colorClasses = getSkillColorClass(skill.name);
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        whileHover={{ scale: 1.05, boxShadow: `0 0 10px rgba(168, 85, 247, 0.5)` }}
                        className={`inline-block px-4 py-2 bg-gray-800 rounded-full text-sm font-semibold border-2 ${colorClasses} transition duration-300 cursor-pointer shadow-lg`}
                      >
                        {skill.name}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
            
          </motion.div>
        </div>

        {/* Experience / Internships */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 w-full max-w-5xl px-0 md:px-6"
        >
          <h3 className="text-3xl font-semibold text-purple-300 mb-6 text-center">Experience</h3>
          <div className="flex flex-col gap-8">
            {experience.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-800 p-6 rounded-2xl shadow-xl border-l-4 border-purple-500 hover:shadow-purple-500/40 transition duration-300"
              >
                <h4 className="font-bold text-xl text-purple-400 mb-1">{exp.title}</h4>
                <p className="text-sm text-gray-400 mb-3 italic">{exp.period}</p>
                <ul className="list-disc list-inside text-gray-300 ml-4 space-y-1">
                  {exp.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </section>
    </div>
  );
}
