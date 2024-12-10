import React from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { Box, Typography, Grid } from "@mui/material";
import ProjectCard from "./ProjectCard";
import axios from "axios";

function Kanban({
    projects,
    onProjectUpdate,
    handleEditClick,
    handleDeleteClick,
    handleDetailsClick,
    apiUrl,
    storedToken,
  }) {
    const columns = {
      "To Do": projects.filter((project) => project.status === "To Do"),
      "In Progress": projects.filter((project) => project.status === "In Progress"),
      "Completed": projects.filter((project) => project.status === "Completed"),
    };
  
    const onDragEnd = (result) => {
      const { source, destination } = result;
  
      // If dropped outside a valid destination, do nothing
      if (!destination) return;
  
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = Array.from(sourceColumn);
      const destItems = Array.from(destColumn);
      const [movedItem] = sourceItems.splice(source.index, 1);
  
      // Update the status only if the project is moved to a different column
      if (source.droppableId !== destination.droppableId) {
        movedItem.status = destination.droppableId;
  
        // Optimistic UI update
        destItems.splice(destination.index, 0, movedItem);
        onProjectUpdate(
          projects.map((project) =>
            project._id === movedItem._id ? { ...movedItem } : project
          )
        );
  
        // Send API request to persist the status change
        axios
          .put(`${apiUrl}/projects/${movedItem._id}`, { status: movedItem.status }, {
            headers: { Authorization: `Bearer ${storedToken}` },
          })
          .then(() => {
            console.log(`Project ${movedItem._id} status updated to ${movedItem.status}`);
          })
          .catch((error) => {
            console.error("Error updating project status:", error);
  
            // Rollback UI change if the API call fails
            sourceItems.splice(source.index, 0, movedItem);
            destItems.splice(destination.index, 1);
            onProjectUpdate(
              projects.map((project) =>
                project._id === movedItem._id ? { ...movedItem, status: source.droppableId } : project
              )
            );
          });
      } else {
        // Reorder within the same column
        sourceItems.splice(destination.index, 0, movedItem);
        onProjectUpdate(
          projects.map((project) =>
            project._id === movedItem._id ? { ...movedItem } : project
          )
        );
      }
    };
  
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid container spacing={2}>
          {Object.entries(columns).map(([columnId, items]) => (
            <Grid item xs={12} sm={6} md={4} key={columnId}>
              <Typography variant="h6" align="center" gutterBottom>
                {columnId}
              </Typography>
              <Droppable droppableId={columnId}>
                {(provided) => (
                  <Box
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    sx={{
                      backgroundColor: "#f4f4f4",
                      borderRadius: 2,
                      p: 2,
                      minHeight: "300px",
                    }}
                  >
                    {items.map((project, index) => (
                      <Draggable
                        key={project._id}
                        draggableId={project._id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <ProjectCard
                              project={project}
                              handleEditClick={handleEditClick}
                              handleDeleteClick={handleDeleteClick}
                              handleDetailsClick={handleDetailsClick} 
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    );

  }export default Kanban;
