import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const username = import.meta.env.VITE_GITHUB_USERNAME; // your GitHub username from .env

  useEffect(() => {
    if (!username) return;
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error("Error fetching repos:", err));
  }, [username]);

  const visibleRepos = showAll ? repos : repos.slice(0, 3);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-6 overflow-visible"
    >
      {/* Heading (fixed clipping issue) */}
    <motion.h2
      initial={{ opacity: 0, y: -50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-16 text-center leading-[1.2] overflow-visible pb-2"
    >
      Projects
    </motion.h2>

      {/* Repo Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
        <AnimatePresence>
          {visibleRepos.map((repo) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between border border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.6)] transition duration-300 cursor-pointer overflow-hidden"
            >
              {/* Project Title */}
              <h3
                className="text-2xl font-bold text-purple-300 mb-3 break-words truncate hover:whitespace-normal hover:overflow-visible hover:text-purple-200 transition-all duration-200"
                title={repo.name}
              >
                {repo.name.replace(/-/g, " ")}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-400 mb-4 leading-relaxed overflow-hidden text-ellipsis h-[4.5rem]">
                {repo.description || "No description provided."}
              </p>

              {/* Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mt-auto">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center gap-2 mt-4 text-purple-400 font-medium">
                <FaGithub className="text-lg" /> <span>View on GitHub</span>
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Show More Button */}
      {repos.length > 3 && (
        <motion.button
          onClick={() => setShowAll(!showAll)}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }}
          whileTap={{ scale: 0.95 }}
          className="mt-12 px-8 py-3 bg-purple-500 text-white rounded-full font-semibold shadow-lg hover:bg-purple-600 transition duration-300"
        >
          {showAll ? "Show Less" : "Show More"}
        </motion.button>
      )}
    </section>
  );
}
