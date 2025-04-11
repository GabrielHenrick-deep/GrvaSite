import React from 'react';
import { Code2, Gamepad2, HeartPulse, Microscope, Notebook as Robot, Brain, Users } from 'lucide-react';
import { motion } from 'framer-motion';



function Projectspage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-900 text-gray-100"
    >
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-600 to-blue-900 text-white py-20">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
        <p className="text-xl">
        Innovative research projects pushing the boundaries of VR and AR technology
        </p>
      </div>
      </div>

      {/* Main Projects Grid */}
      <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-8">
        {/* Project Cards */}
        {[
          {
          title: 'VR Learning Platform',
          description:
            'An immersive educational platform that transforms abstract concepts into interactive 3D experiences.',
          features: [
            'Interactive 3D visualizations of complex concepts',
            'Multi-user collaboration spaces',
            'Real-time data visualization',
            'Customizable learning environments',
          ],
          icon: <Gamepad2 className="h-8 w-8 text-teal-400 mr-3" />,
          image:
            'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=800&q=80',
          },
          {
          title: 'AR Medical Training',
          description:
            'Advanced AR solutions for medical training and surgical planning using holographic displays.',
          features: [
            'Surgical procedure simulation',
            'Anatomical visualization',
            'Patient data overlay',
            'Remote consultation support',
          ],
          icon: <HeartPulse className="h-8 w-8 text-teal-400 mr-3" />,
          image:
            'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=800&q=80',
          },
          {
          title: 'Mixed Reality Dev Tools',
          description:
            'A comprehensive development toolkit for creating cross-platform VR/AR applications.',
          features: [
            'Cross-platform compatibility',
            'Advanced gesture recognition',
            'Environmental mapping',
            'Physics simulation engine',
          ],
          icon: <Code2 className="h-8 w-8 text-teal-400 mr-3" />,
          image:
            'img/Wallpaper_C.png',
          },
          {
          title: 'Industrial AR',
          description:
            'An augmented reality system designed for industrial applications, providing real-time data visualization.',
          features: [
            'Real-time machine monitoring',
            'Maintenance procedure guidance',
            'Quality control assistance',
            'Safety protocol visualization',
          ],
          icon: <Robot className="h-8 w-8 text-teal-400 mr-3" />,
          image:
            'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
          },
        ].map((project, index) => (
          <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            <div className="flex items-center mb-4">
            {project.icon}
            <h2 className="text-2xl font-bold">{project.title}</h2>
            </div>
            <p className="text-gray-400 mb-6">{project.description}</p>
            <div className="space-y-4">
            <h3 className="font-semibold text-gray-200">Key Features:</h3>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              {project.features.map((feature, i) => (
              <li key={i}>{feature}</li>
              ))}
            </ul>
            </div>
          </div>
          </motion.div>
        ))}
        </div>
      </div>
      </section>

      {/* Research Impact */}
      <section className="py-16 bg-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold mb-12 text-center text-gray-100">Research Impact</h2>
        <div className="grid md:grid-cols-3 gap-8">
        {[
          {
          title: '10+ Publications',
          description:
            'Research findings published in leading academic journals and conferences',
          icon: <Brain className="h-6 w-6 text-teal-400 mr-2" />,
          },
          {
          title: '5 Patents',
          description:
            'Novel technologies and methodologies protected through patents',
          icon: <Microscope className="h-6 w-6 text-teal-400 mr-2" />,
          },
          {
          title: '1000+ Users',
          description:
            'Active users benefiting from our research implementations',
          icon: <Users className="h-6 w-6 text-teal-400 mr-2" />,
          },
        ].map((impact, index) => (
          <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          className="bg-gray-700 p-6 rounded-lg shadow-md"
          >
          <div className="flex items-center mb-4">
            {impact.icon}
            <h3 className="text-xl font-semibold text-gray-100">{impact.title}</h3>
          </div>
          <p className="text-gray-400">{impact.description}</p>
          </motion.div>
        ))}
        </div>
      </div>
      </section>
    </motion.div>
  );
}

export default Projectspage;
