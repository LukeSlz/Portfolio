import { useEffect, useState } from 'react';
import './projects.scss';
import AnimatedLetters from '../AnimatedLetters/animatedLetters';
import { Project } from './Project';
import { mockProjects } from './mockData';
import { projectsDB } from './projectsDB';
import Modal from './Modal/Modal';



const Projects: React.FC = () => {

  const projectsToShow: Project[] = projectsDB.length > 1 ? projectsDB : mockProjects;

  const [letterClass, setLetterClass] = useState('text-animate');
  const projectsText: string = "Projects";
  const projectsArr: string[] = projectsText.split('');

  useEffect(() => {
    setTimeout(() => {
      return setLetterClass('text-animate-hover')
    }, 3000)
  }, []);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };
  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <div className="container projects-page">
        <div className="text-zone projects-text-zone">
          <h1>
            <AnimatedLetters
              letterClass={letterClass}
              strArr={projectsArr}
              idx={10}
            />
          </h1>
          <p>
            Here is a concise compilation of key projects I have contributed to as a web developer. Each project includes descriptions, the tech stack utilized, <span>the source code repository</span>, my main role and functions, insights, obstacles, learnings, work process, comments, and more.
          </p>
          <p id='note'>
            <span>***</span>Please note that this section of the portfolio is a work in progress, and certain projects may not be deployed due to project scope.
          </p>
        </div>
        <div className="projects__area">
          {projectsToShow.map((project) => (
            <div 
              className="project__container" 
              key={project.id} 
              onClick={() => {handleProjectClick(project)}}
            >
              <img src={project.img} alt={`Imag related to the ${project.name} project`} />
              <h3>{project.name}</h3>
              <p>Stack: {project.stack.join(" | ")}</p>
            </div>
          ))}

            {selectedProject && (
              <Modal onClose={handleCloseModal}>
                <h3>{selectedProject.name}</h3>
                <img src={selectedProject.img} alt={`Imag related to the ${selectedProject.name} project`} />
                <p>{selectedProject.description}</p>
                <p>Tech Stack: {selectedProject.stack.join(" | ")}</p>
                <p>Role: {selectedProject.role}</p>
                <p>{selectedProject.repo}</p>
              </Modal>
            )}

        </div>
      </div>
    </>
  )


}

export default Projects;