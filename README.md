# Gig Sync Frontend

[Try it out!](https://gigsync.netlify.app/)
GigSync is a Service Project Management CMS platform designed to help freelancers and gig workers manage their projects and clients. The frontend application is the user interface for GigSync, providing seamless interaction with the backend API for an intuitive and efficient user experience.

---

## Features

- **User Authentication and Authorization**: Secure login and session management.
- **Dashboard**: Visualize and manage projects and clients from a central interface.
- **Responsive Design**: Optimized for both desktop and mobile devices.
- **Real-Time Updates**: Dynamic updates with minimal reloads.

---

## Technologies Used

- **React.js**: Frontend library for building user interfaces.
- **Axios**: HTTP client for seamless communication with the backend.
- **MUI**: Design framework for styling.
- **MERN Stack**: Integrated with Node.js and MongoDB for full-stack development.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed (check with `node -v` and `npm -v`).
- Backend API running and accessible (refer to [GigSync API](https://github.com/karajelley/gig-sync-api)).

### Steps

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/karajelley/gig-sync-frontend.git
   cd gig-sync-frontend
   ```

2. **Install dependencies**:  
   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   - Create a `.env` file in the root directory.
   - Add the necessary environment variables such as the API base URL (`REACT_APP_API_URL`).

4. **Run the application locally**:  
   ```bash
   npm start
   ```

5. **Access the application at**:  
   `http://localhost:5173`

---

## Deployment

The application can be deployed using platforms such as Vercel or Netlify. Ensure the environment variables are correctly configured for the production API.

---

## Usage

### Key Pages

- **Login/Signup**: Authenticate users to access their data.
- **Dashboard**: Display an overview of projects and clients.
- **Projects**: Add, view, edit, and delete projects.
- **Clients**: Manage client information and view details.

### Component Structure

The application follows a modular structure:

- `src/components`: Reusable UI components.
- `src/pages`: Main application pages.

---

### Frontend Routes

| Route                        | Component         | Purpose                                              |
| ---------------------------- | ----------------- | ---------------------------------------------------- |
| `/login`                     | `Login`           | Initial login page for user authentication.          |
| `/signup`                    | `Signup`          | Registration page for new users.                     |
| `/api/dashboard`             | `Dashboard`       | Overview of user’s projects and clients.             |
| `/api/projects`              | `ProjectsList`    | Displays a list of all projects.                     |
| `/api/projectdetails/:id`    | `ProjectDetails`  | Displays details of a specific project.              |
| `/api/clients`               | `ClientsList`     | Displays a list of all clients.                      |
| `/api/clientdetails/:id`     | `ClientDetails`   | Displays details of a specific client.               |
| `/api/profile`               | `Profile`         | Allows users to adjust account settings.             |


---

## Documentation

- [**Confluence**](https://karajelley.atlassian.net/wiki/spaces/GigSync/overview): Comprehensive project documentation.
- [**Jira**](https://karajelley.atlassian.net/jira/software/projects/PROJ/boards/1?selectedIssue=PROJ-37): Task and issue tracking for the Gig Sync development team.

---

## Justification of Technology Choices

- **React.js**: Provides a dynamic and reactive UI for the application.
- **Axios**: Allows efficient communication with the backend API.
- **MUI**: Facilitates the development of a responsive and visually appealing UI.

These technologies ensure scalability, maintainability, and performance for the application.

---

## Credits

- [**Kara Jelley**](https://www.linkedin.com/in/karajelley): Fullstack Developer & UX Designer. [GitHub Profile](https://github.com/karajelley) [Portfolio](https://www.karajelley.me/)
- [**Diego Cisneros**](https://www.linkedin.com/in/dfcisnerosg/): Fullstack Developer. [GitHub Profile](https://github.com/Kasper1-2)
- **Resources Used**:
  - React.js Documentation.
  - Axios and MUI libraries.
---

## Badges

![React](https://img.shields.io/badge/React-18.2.0-blue)
![Express.js](https://img.shields.io/badge/Express.js-4.17.1-lightgrey)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0.5-green)
![Node.js](https://img.shields.io/badge/Node.js-20.5.1-brightgreen)

