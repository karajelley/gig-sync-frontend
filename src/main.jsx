// External Libraries 
import { StrictMode } from 'react'
import { HashRouter as Router } from "react-router-dom";
import { createRoot } from 'react-dom/client'
import { AuthProviderWrapper } from "./context/auth.context";
import { AppContext } from './context/AppContext.jsx';
import { AppProvider } from './context/AppContext.jsx';

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
