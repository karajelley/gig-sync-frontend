// External Libraries 

// Internal Libraries / Components

// Styles / Assets
import './ProjectCard.css'

function ProjectCard({ project }) {

  return (
    <>
      <div className="project-card-container">
        <h4>{project.title}</h4>
        <p>Budget: ${project.budget}</p>
      </div>
    </>
  )
}

export default ProjectCard;