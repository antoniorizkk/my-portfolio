import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub } from "react-icons/fa";

export default function Projects() {
  const [repos, setRepos] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const username = "antoniorizkk"; // replace with your GitHub username

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/repos?sort=updated`)
      .then((res) => res.json())
      .then((data) => setRepos(data))
      .catch((err) => console.error("Error fetching repos:", err));
  }, []);

  const visibleRepos = showAll ? repos : repos.slice(0, 3);

  return (
    <section
      id="projects"
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-6"
    >
      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 text-center"
      >
        Projects
      </motion.h2>

      {/* Repo Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-6xl w-full">
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
              className="bg-gray-800 p-6 rounded-2xl shadow-lg flex flex-col justify-between border-2 border-purple-500/30 hover:border-purple-400 hover:shadow-[0_0_20px_rgba(168,85,247,0.7)] transition duration-300 cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{repo.name}</h3>
              <p className="text-sm text-gray-400 flex-1 mb-4">
                {repo.description || "No description provided."}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                ⭐ {repo.stargazers_count} | 🍴 {repo.forks_count}
              </div>
              <div className="flex items-center gap-2 mt-3 text-purple-400 font-medium">
                <FaGithub /> <span>View on GitHub</span>
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
          className="mt-10 px-6 py-3 bg-purple-500 text-white rounded-full font-semibold shadow-lg hover:bg-purple-600 transition duration-300"
        >
          {showAll ? "Show Less" : "Show More"}
        </motion.button>
      )}
    </section>
  );
}
