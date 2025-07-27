import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Award, BookOpen } from 'lucide-react';

const educationData = [
  {
    id: 1,
    period: '2018 - 2022',
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Technology',
    description: 'Graduated with honors, specializing in web development and interactive media.',
    icon: <GraduationCap className="w-6 h-6" />,
  },
  {
    id: 2,
    period: '2022 - 2023',
    degree: 'Master of Science in Digital Design',
    school: 'Creative Arts Institute',
    description: 'Focused on user experience design and creative coding techniques.',
    icon: <Award className="w-6 h-6" />,
  },
  {
    id: 3,
    period: '2023',
    degree: 'Advanced Certificate in 3D Web Development',
    school: 'Interactive Design Academy',
    description: 'Specialized training in Three.js and WebGL for creating immersive web experiences.',
    icon: <BookOpen className="w-6 h-6" />,
  },
];

const EducationSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  
  return (
    <section
      id="education"
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
          Education & Learning Path
        </motion.h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-px top-0 h-full w-0.5 bg-gradient-to-b from-green-300 via-green-500 to-green-700 dark:from-green-700 dark:via-green-600 dark:to-green-800" />
          
          {/* Timeline Items */}
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: 50, x: index % 2 === 0 ? -50 : 50 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className={`relative mb-12 md:mb-16 ${
                index % 2 === 0 ? 'md:pr-8 md:text-right md:ml-auto md:mr-[50%]' : 'md:pl-8 md:ml-[50%]'
              }`}
            >
              {/* Timeline node */}
              <div 
                className={`absolute top-5 md:top-2 z-10 flex items-center justify-center
                  ${index % 2 === 0 ? 'right-[-28px] md:left-auto md:right-[-52px]' : 'left-[-28px] md:left-[-52px]'}`}
              >
                <div className="w-14 h-14 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
                  <div className="text-green-600 dark:text-green-400">
                    {item.icon}
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="jungle-card ml-16 md:ml-0 hover:shadow-xl transition-all duration-300">
                <span className="leaf-badge inline-block mb-2">
                  {item.period}
                </span>
                <h3 className="text-2xl font-semibold mb-2 text-green-800 dark:text-green-300">
                  {item.degree}
                </h3>
                <h4 className="text-lg font-medium mb-4 text-amber-700 dark:text-amber-400">
                  {item.school}
                </h4>
                <p className="text-gray-700 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Additional certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 jungle-card p-8"
        >
          <h3 className="text-2xl mb-6 text-green-800 dark:text-green-300">
            Additional Certifications & Courses
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['Web Animation Masterclass', 'Frontend Performance Optimization', 'UI/UX Design Fundamentals'].map((cert, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className="p-4 rounded-lg bg-white/50 dark:bg-gray-800/50 border border-green-200 dark:border-green-800"
              >
                <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400 mb-2" />
                <h4 className="font-medium">{cert}</h4>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;