import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Leaf, Eye, Star, Heart, TreePine } from 'lucide-react';

// Project type definition for better type safety
interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

/**
 * ProjectCard Component
 * Displays an individual project with interactive 3D hover effects.
 * @param {object} props - Component props.
 * @param {Project} props.project - The project data.
 * @param {number} props.index - The index of the project for staggered animation.
 */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 }); // State to track mouse position for 3D tilt
  const cardRef = React.useRef<HTMLDivElement>(null); // Ref for the card element to get its dimensions

  // Handles mouse movement to calculate tilt based on cursor position within the card
  const handleMouseMove = (e: React.MouseEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      // Normalize mouse position to -0.5 to 0.5 range relative to card center
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x: x - 0.5, y: y - 0.5 });
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000" // `perspective-1000` for 3D effect
      // Animation for card appearance when it enters the viewport
      initial={{ opacity: 0, y: 100, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }} // Animate only once when it comes into view
      transition={{
        duration: 0.8,
        delay: index * 0.2, // Staggered animation based on index
        type: "spring", // Spring animation for natural feel
        stiffness: 100
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 }); // Reset mouse position on leave
      }}
      onMouseMove={handleMouseMove}
      whileHover={{ scale: 1.05 }} // Slight scale up on hover
    >
      <motion.div
        className="relative bg-gradient-to-br from-white/20 via-white/10 to-transparent backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl transform-gpu"
        style={{
          transformStyle: 'preserve-3d', // Enable 3D transformations for children
        }}
        // Animate card rotation based on mouse position when hovered
        animate={{
          rotateY: isHovered ? mousePosition.x * 20 : 0, // Rotate around Y-axis
          rotateX: isHovered ? -mousePosition.y * 20 : 0, // Rotate around X-axis
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }} // Smooth spring transition for rotation
      >
        {/* Glowing border effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400/50 via-emerald-400/50 to-teal-400/50 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 scale-110" />

        {/* Image container with 3D effect */}
        <div className="relative aspect-video overflow-hidden rounded-t-3xl bg-gradient-to-br from-green-600/20 to-emerald-800/20">
          <motion.div
            className="absolute inset-0"
            style={{
              // Translate image slightly based on mouse position for a layered 3D effect
              transform: isHovered
                ? `translate3d(${mousePosition.x * 10}px, ${mousePosition.y * 10}px, 20px)`
                : 'translate3d(0, 0, 0)',
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <img
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" // Image scales up on hover
            />
          </motion.div>

          {/* Overlay with interactive elements (Eye, Heart icons) */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 flex gap-2">
              <motion.div
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.2, rotate: 360 }} // Eye icon rotates on hover
                transition={{ duration: 0.3 }}
              >
                <Eye className="w-4 h-4 text-white" />
              </motion.div>
              <motion.div
                className="p-2 bg-white/20 backdrop-blur-sm rounded-full"
                whileHover={{ scale: 1.2 }} // Heart icon scales on hover
                transition={{ duration: 0.3 }}
              >
                <Heart className="w-4 h-4 text-white" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Content area with floating elements */}
        <div className="relative p-6 space-y-4">
          {/* Decorative floating tree pine icon */}
          <motion.div
            className="absolute top-0 right-0 text-green-400/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <TreePine size={24} />
          </motion.div>

          {/* Project title with 3D translation on hover */}
          <motion.h3
            className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors"
            style={{
              transform: isHovered
                ? `translate3d(${mousePosition.x * 5}px, ${mousePosition.y * 5}px, 10px)`
                : 'translate3d(0, 0, 0)',
            }}
          >
            {project.title}
          </motion.h3>

          {/* Project description with 3D translation on hover */}
          <motion.p
            className="text-green-100/80 text-sm leading-relaxed"
            style={{
              transform: isHovered
                ? `translate3d(${mousePosition.x * 3}px, ${mousePosition.y * 3}px, 5px)`
                : 'translate3d(0, 0, 0)',
            }}
          >
            {project.description}
          </motion.p>

          {/* "Explore Project" link with 3D translation and hover effects */}
          {project.link && (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white font-semibold rounded-full shadow-lg hover:shadow-green-500/25 transition-all duration-300 group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                transform: isHovered
                  ? `translate3d(${mousePosition.x * 2}px, ${mousePosition.y * 2}px, 15px)`
                  : 'translate3d(0, 0, 0)',
              }}
            >
              <ExternalLink size={18} className="group-hover:rotate-12 transition-transform" />
              Explore Project
            </motion.a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * ProjectsSection Component
 * The main component displaying a list of projects with a jungle theme.
 * Includes parallax background, floating leaves, and interactive project cards.
 */
const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]); // State to store project data
  const [loading, setLoading] = useState(true); // State to manage loading status
  const [error, setError] = useState<string | null>(null); // State to store any error messages
  const sectionRef = React.useRef<HTMLElement>(null); // Ref for the section to track scroll progress
  // Remove useScroll and scrollYProgress usage and related comments.

  // Mock data for projects with jungle-themed image URLs
  const mockProjects: Project[] = [
    {
      id: 1,
      title: 'Jungle Portfolio',
      description: 'A React-based portfolio with immersive jungle aesthetics, featuring dynamic parallax effects, animated wildlife, and interactive nature elements.',
      imageUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=400&fit=crop&crop=center',
      link: '#',
    },
    {
      id: 2,
      title: 'Forest Explorer',
      description: 'An interactive 3D forest exploration experience with realistic flora animations, wildlife sounds, and immersive environmental storytelling.',
      imageUrl: 'https://images.unsplash.com/photo-1574263867128-a4d63a15b46c?w=600&h=400&fit=crop&crop=center',
      link: '#',
    },
    {
      id: 3,
      title: 'Bamboo Dashboard',
      description: 'A sophisticated dashboard interface inspired by bamboo growth patterns, featuring organic animations and nature-inspired data visualizations.',
      imageUrl: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=400&fit=crop&crop=center',
      link: '#',
    },
  ];

  useEffect(() => {
    // Simulate an API call to fetch project data with a delay
    const timer = setTimeout(() => {
      setProjects(mockProjects); // Set the mock projects
      setLoading(false); // End loading state
    }, 1500); // Simulate 1.5 seconds loading time

    return () => clearTimeout(timer); // Cleanup timer on component unmount
  }, []);

  // Show a loading spinner and message while projects are being fetched
  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-900 font-inter"> {/* Updated loading background */}
        <motion.div
          className="flex flex-col items-center space-y-4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <motion.div
            className="w-16 h-16 border-4 border-green-400 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.p
            className="text-green-300 text-xl font-semibold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Loading jungle projects...
          </motion.p>
        </motion.div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative min-h-screen py-20 overflow-hidden font-inter bg-gray-900" // Set a default dark background for the section
    >
      {/* All previous background elements (animated jungle background, ParallaxLayers, Dark overlay) are removed */}
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
        {/* Animated header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.h2
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              backgroundSize: '200% 200%',
            }}
          >
            Featured Projects
          </motion.h2>
          
          <motion.div
            className="flex items-center justify-center gap-4 text-green-300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <motion.div
              animate={{ rotate: [0, 180, 360] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf size={24} />
            </motion.div>
            <p className="text-lg">Immersive Digital Experiences</p>
            <motion.div
              animate={{ rotate: [360, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Leaf size={24} />
            </motion.div>
          </motion.div>
        </motion.div>

        {error && (
          <motion.div
            className="text-center text-amber-300 mb-8 p-4 bg-amber-900/20 rounded-xl backdrop-blur-sm border border-amber-500/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            {error}
          </motion.div>
        )}

        {/* Projects grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </motion.div>

        {/* Call to action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
            whileHover={{
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(16, 185, 129, 0.4)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Star className="w-5 h-5" />
              View All Projects
              <Star className="w-5 h-5" />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
