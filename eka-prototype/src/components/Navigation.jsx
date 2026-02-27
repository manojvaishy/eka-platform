import { Link, useNavigate } from 'react-router-dom';
import { Sparkles, ArrowLeft, Bell, Search } from 'lucide-react';

function Navigation({ showBackButton = false, title = "Eka" }) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back in history
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Go back"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <Link to="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-display font-bold gradient-text">{title}</span>
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Search className="w-5 h-5 text-gray-600" />
            </button>
            <Link to="/profile" className="ml-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                U
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
