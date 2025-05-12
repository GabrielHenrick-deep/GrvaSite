import React, { useEffect, useState } from 'react';
import { Code2, Gamepad2, HeartPulse, Notebook } from 'lucide-react';
import { motion } from 'framer-motion';
import { Projects } from '../types/projects';
import { useNavigate } from 'react-router-dom';

function Projectspage() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Projects[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch projects from the database
    fetch('http://localhost:3001/projects')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch projects');
        }
        return res.json();
      })
      .then(data => {
        console.log('Projects received:', data);
        // Transform the data to match our interface if needed
        const formattedProjects: Projects[] = data.map((project: any) => ({
          image_url: project.image_url,
          nome_project: project.nome_project,
          descri: project.descri,
          key_feature: project.key_feature,
        }));
        setProjects(formattedProjects);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching projects:', err);
        setError('Failed to load projects. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Function to get the appropriate icon based on project name
  const getProjectIcon = (projectName: string) => {
    const name = projectName.toLowerCase();
    if (name.includes('vr') || name.includes('virtual')) {
      return <Gamepad2 className="h-8 w-8 text-teal-400 mr-3" />;
    } else if (name.includes('medical') || name.includes('health')) {
      return <HeartPulse className="h-8 w-8 text-teal-400 mr-3" />;
    } else if (name.includes('dev') || name.includes('development')) {
      return <Code2 className="h-8 w-8 text-teal-400 mr-3" />;
    } else {
      return <Notebook className="h-8 w-8 text-teal-400 mr-3" />;
    }
  };

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
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Loading projects...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-400">{error}</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={project.image_url}
                    alt={project.nome_project}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-8">
                    <div className="flex items-center mb-4">
                      {getProjectIcon(project.nome_project)}
                      <h2 className="text-2xl font-bold">{project.nome_project}</h2>
                    </div>
                    <p className="text-gray-400 mb-6">{project.descri}</p>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-200">Key Features:</h3>
                      <p className="text-gray-400">{project.key_feature}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </motion.div>
  );
}

export default Projectspage;