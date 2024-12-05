// External Libraries 

// Internal Libraries / Components

// Styles / Assets
import './ProjectCard.css'

function ProjectCard({ project }) {

    return (
      <Box sx={{ minWidth: 275, margin: 2 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h5" component="div">
              {project.title}
            </Typography>
  
            <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
              Budget: ${project.budget}
            </Typography>
          </CardContent>
  
          <CardActions>
            <Button size="small" onClick={() => console.log('Edit Project:', project.id)}>
              Edit Project
            </Button>
            <Button size="small" onClick={() => console.log('View Details:', project.id)}>
              View Details
            </Button>
          </CardActions>
        </Card>
      </Box>
    );
  };

export default ProjectCard;