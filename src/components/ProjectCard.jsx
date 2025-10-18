import React from 'react'
import { Github, ExternalLink } from 'lucide-react';

const ProjectCard = ({ project }) => {
    return (
        <div className="group bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
            <div className="h-48 flex bg-gradient-to-r from-gray-100 t0-gray-200 items-center justify-center">
                <div className="text-6xl font-bold text-gray-300">
                    {project.title.charAt(0)}
                </div>
            </div>
            <div className="flex flex-col p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 group-hover:text-gray-600 transition-colors">
                    {project.title}
                </h3>
                <p className="text-gray-600 mb-4  text-sm leading-relaxed flex-grow">
                    {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, index) => (
                        <span className="px-3 py-1 rounded-full text-gray-700 bg-gray-100 text-xs" key={index}>
                            {tech}
                        </span>
                    ))}
                </div>
                <div className="flex space-x-4 mt-auto">
                    <a href={project.github} className="flex items-center text-gray-600 hover:text-black text-sm transition-colors">
                        <Github className="w-4 h-4 mr-1" />Code
                    </a>
                    <a href={project.demo} className="flex items-center text-gray-600 hover:text-black text-sm transition-colors">
                        <ExternalLink className="w-4 h-4 mr-1" />Demo
                    </a>
                </div>
            </div>
        </div>
    )
}

export default ProjectCard;

