// External Libraries 
import { AppProvider } from './context/AppContext.jsx';
import { AuthProviderWrapper } from "./context/auth.context";
import { createRoot } from 'react-dom/client'
import { HashRouter as Router } from "react-router-dom";
import { StrictMode } from 'react'
// Internal Libraries / Components
import App from './App.jsx'
// Styles / Assets
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <AppProvider> 
        <AuthProviderWrapper>
          <App />
        </AuthProviderWrapper>
      </AppProvider>
    </Router>
  </StrictMode>,
);

