import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Briefcase, Users, User } from 'lucide-react';
import { t, getCurrentLanguage } from '../utils/translations';

function BottomNav() {
  const location = useLocation();
  const lang = getCurrentLanguage();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
      <div className="flex justify-around">
        <Link 
          to="/dashboard" 
          className={`flex flex-col items-center gap-1 ${isActive('/dashboard') ? 'text-primary-600' : 'text-gray-600'}`}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs">{t('Home', lang)}</span>
        </Link>
        <Link 
          to="/courses" 
          className={`flex flex-col items-center gap-1 ${isActive('/courses') ? 'text-primary-600' : 'text-gray-600'}`}
        >
          <BookOpen className="w-6 h-6" />
          <span className="text-xs">{t('Learn', lang)}</span>
        </Link>
        <Link 
          to="/jobs" 
          className={`flex flex-col items-center gap-1 ${isActive('/jobs') ? 'text-primary-600' : 'text-gray-600'}`}
        >
          <Briefcase className="w-6 h-6" />
          <span className="text-xs">{t('Jobs', lang)}</span>
        </Link>
        <Link 
          to="/community" 
          className={`flex flex-col items-center gap-1 ${isActive('/community') ? 'text-primary-600' : 'text-gray-600'}`}
        >
          <Users className="w-6 h-6" />
          <span className="text-xs">{t('Community', lang)}</span>
        </Link>
        <Link 
          to="/profile" 
          className={`flex flex-col items-center gap-1 ${isActive('/profile') ? 'text-primary-600' : 'text-gray-600'}`}
        >
          <User className="w-6 h-6" />
          <span className="text-xs">{t('Profile', lang)}</span>
        </Link>
      </div>
    </nav>
  );
}

export default BottomNav;
