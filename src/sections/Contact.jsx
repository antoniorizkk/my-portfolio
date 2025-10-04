import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin } from "react-icons/fa";

const LINKEDIN_URL = import.meta.env.VITE_LINKEDIN_URL;

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Email is invalid.";
    if (!form.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setServerError(data.error || data.message || "Failed to send message.");
        console.error("Server error:", data);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setServerError("Network error while sending message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-10 text-center"
      >
        Contact Me
      </motion.h2>

      <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="w-full max-w-xl flex flex-col gap-4">
        <div className="flex flex-col">
          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="Your Name" className={`p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${errors.name ? "ring-2 ring-red-500" : ""}`} />
          {errors.name && <span className="text-red-400 text-sm mt-1">{errors.name}</span>}
        </div>

        <div className="flex flex-col">
          <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Your Email" className={`p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${errors.email ? "ring-2 ring-red-500" : ""}`} />
          {errors.email && <span className="text-red-400 text-sm mt-1">{errors.email}</span>}
        </div>

        <div className="flex flex-col">
          <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={5} className={`p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 ${errors.message ? "ring-2 ring-red-500" : ""}`} />
          {errors.message && <span className="text-red-400 text-sm mt-1">{errors.message}</span>}
        </div>

        {serverError && <p className="text-yellow-300 text-sm">{serverError}</p>}

        <motion.button type="submit" whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(168,85,247,0.7)" }} whileTap={{ scale: 0.95 }} className="mt-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 rounded-full font-semibold shadow-lg transition duration-300" disabled={loading}>
          {loading ? "Sending..." : submitted ? "Message Sent ✅" : "Send Message"}
        </motion.button>
      </motion.form>

      <motion.footer initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mt-16 flex flex-col items-center text-gray-400">
        <p className="mb-2">Connect with me:</p>
        <a href={LINKEDIN_URL || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-purple-400 hover:text-purple-500 hover:shadow-[0_0_15px_rgba(168,85,247,0.7)] transition duration-300">
          <FaLinkedin className="text-2xl" /> LinkedIn
        </a>
        <p className="mt-4 text-sm text-gray-500">&copy; {new Date().getFullYear()} Antonio. All rights reserved.</p>
      </motion.footer>
    </section>
  );
}
