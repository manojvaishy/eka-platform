import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, createContext, useEffect } from 'react';

// Import data
import usersData from './data/users.json';
import coursesData from './data/courses.json';
import jobsData from './data/jobs.json';
import servicesData from './data/services.json';
import postsData from './data/posts.json';

// Pages (we'll create these)
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import OnboardingPage from './pages/OnboardingPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import JobsPage from './pages/JobsPage';
import ServicesPage from './pages/ServicesPage';
import CommunityPage from './pages/CommunityPage';
import EnhancedProfilePage from './pages/EnhancedProfilePage';
import DatabasePage from './pages/DatabasePage';

// Create Context for global state
export const AppContext = createContext();

function App() {
  // Initialize user from localStorage or use default
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch (e) {
        console.error('Error parsing saved user data:', e);
        return usersData[0];
      }
    }
    return usersData[0];
  });
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Listen for localStorage changes (when user completes onboarding)
  useEffect(() => {
    const handleStorageChange = () => {
      const savedUser = localStorage.getItem('userData');
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setCurrentUser(userData);
        } catch (e) {}
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // empty deps - no loop

  // Global state
  const contextValue = {
    currentUser,
    setCurrentUser,
    isAuthenticated,
    setIsAuthenticated,
    users: usersData,
    courses: coursesData,
    jobs: jobsData,
    services: servicesData,
    posts: postsData,
  };

  return (
    <AppContext.Provider value={contextValue}>
      <Router basename="/eka-platform">
        <ScrollToTop />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/jobs" element={<JobsPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/community" element={<CommunityPage />} />
            <Route path="/profile" element={<EnhancedProfilePage />} />
            <Route path="/database" element={<DatabasePage />} />
          </Routes>
        </div>
      </Router>
    </AppContext.Provider>
  );
}

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force scroll to top on every route change
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }, 0);
  }, [pathname]);

  return null;
}

export default App;
