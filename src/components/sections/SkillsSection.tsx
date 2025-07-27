import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code, Layout, Database, Laptop, Palette, Sparkles } from 'lucide-react';

// Skill categories with icons
const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: <Layout className="w-6 h-6" />,
    skills: [
      { name: 'React', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'HTML/CSS', level: 95 },
      { name: 'Vue.js', level: 70 },
      { name: 'Responsive Design', level: 90 },
    ],
    color: 'from-green-400 to-green-600',
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: <Database className="w-6 h-6" />,
    skills: [
      { name: 'Node.js', level: 85 },
      { name: 'Express', level: 80 },
      { name: 'MongoDB', level: 75 },
      { name: 'RESTful APIs', level: 85 },
      { name: 'GraphQL', level: 65 },
    ],
    color: 'from-amber-400 to-amber-600',
  },
  {
    id: 'animation',
    title: '3D & Animation',
    icon: <Sparkles className="w-6 h-6" />,
    skills: [
      { name: 'Three.js', level: 80 },
      { name: 'GSAP', level: 85 },
      { name: 'WebGL', level: 70 },
      { name: 'CSS Animations', level: 90 },
      { name: 'Framer Motion', level: 85 },
    ],
    color: 'from-blue-400 to-blue-600',
  },
  {
    id: 'design',
    title: 'Design & UI/UX',
    icon: <Palette className="w-6 h-6" />,
    skills: [
      { name: 'Figma', level: 85 },
      { name: 'Adobe XD', level: 75 },
      { name: 'User Experience', level: 80 },
      { name: 'Accessibility', level: 85 },
      { name: 'Color Theory', level: 90 },
    ],
    color: 'from-purple-400 to-purple-600',
  },
];

// Skill progress bar component
const SkillBar: React.FC<{ name: string; level: number; color: string; delay: number }> = ({ 
  name, level, color, delay 
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-medium">{name}</span>
        <span>{level}%</span>
      </div>
      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${level}%` }}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className={`h-full rounded-full bg-gradient-to-r ${color}`}
        />
      </div>
    </div>
  );
};

const SkillsSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="section-container relative min-h-screen py-20"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl mb-12 text-center text-green-800 dark:text-green-300"
        >
          Skills & Expertise
        </motion.h2>
        
        {/* Skill categories */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="jungle-card p-6 md:p-8"
            >
              <div className="flex items-center mb-6">
                <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white`}>
                  {category.icon}
                </div>
                <h3 className="text-2xl ml-4 text-green-800 dark:text-green-300">
                  {category.title}
                </h3>
              </div>
              
              <div>
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    color={category.color}
                    delay={categoryIndex * 0.2 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Other skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 jungle-card p-6 md:p-8"
        >
          <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300 flex items-center">
            <Code className="w-6 h-6 mr-3" />
            Other Technical Skills
          </h3>
          
          <div className="flex flex-wrap gap-3">
            {[
              'Git/GitHub', 'Responsive Design', 'Performance Optimization', 
              'SEO', 'WebSockets', 'Progressive Web Apps', 'JAMstack',
              'CI/CD', 'Testing (Jest, Cypress)', 'Docker', 'AWS', 'Firebase'
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.6 + index * 0.05 }}
                className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Languages */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-12 jungle-card p-6 md:p-8"
        >
          <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300 flex items-center">
            <Laptop className="w-6 h-6 mr-3" />
            Languages
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {[
              { lang: 'English', level: 'Native' },
              { lang: 'Spanish', level: 'Fluent' },
              { lang: 'French', level: 'Intermediate' },
              { lang: 'German', level: 'Basic' }
            ].map((language, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                className="text-center"
              >
                <div className="text-lg font-semibold text-green-700 dark:text-green-400">
                  {language.lang}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {language.level}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;