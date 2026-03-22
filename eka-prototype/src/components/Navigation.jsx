import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AppContext } from '../App';
import { Sparkles, ArrowLeft, Bell, Search, X } from 'lucide-react';

function Navigation({ showBackButton = false, title = "Eka" }) {
  const navigate = useNavigate();
  const { currentUser } = useContext(AppContext);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleBack = () => navigate(-1);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/courses`);
      setShowSearch(false);
    }
  };

  const notifications = [
    { id: 1, text: 'New job matching your skills!', time: '2m ago', unread: true },
    { id: 2, text: 'Your course progress: 45%', time: '1h ago', unread: true },
    { id: 3, text: 'Community post liked by 10 people', time: '3h ago', unread: false },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {showBackButton && (
              <button onClick={handleBack} className="p-2 hover:bg-gray-100 rounded-full transition" aria-label="Go back">
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
            )}
            <Link to="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-display font-bold gradient-text">{title}</span>
            </Link>
          </div>

          {/* Search Bar (expanded) */}
          {showSearch && (
            <form onSubmit={handleSearch} className="flex-1 mx-4">
              <input
                autoFocus
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search courses, jobs..."
                className="w-full px-4 py-2 border-2 border-primary-300 rounded-full outline-none focus:border-primary-500"
              />
            </form>
          )}

          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 hover:bg-gray-100 rounded-full"
              aria-label="Search"
            >
              {showSearch ? <X className="w-5 h-5 text-gray-600" /> : <Search className="w-5 h-5 text-gray-600" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2 hover:bg-gray-100 rounded-full relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {showNotifications && (
                <div className="absolute right-0 top-12 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 z-50">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-800">Notifications</h3>
                    <button onClick={() => setShowNotifications(false)}>
                      <X className="w-4 h-4 text-gray-500" />
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map(n => (
                      <div key={n.id} className={`p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${n.unread ? 'bg-purple-50' : ''}`}>
                        <p className="text-sm text-gray-800 mb-1">{n.text}</p>
                        <p className="text-xs text-gray-500">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center">
                    <button className="text-sm text-primary-600 font-semibold hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <Link to="/profile" className="ml-1">
              {currentUser?.profileImage ? (
                <img src={currentUser.profileImage} alt={currentUser.name} className="w-8 h-8 rounded-full border-2 border-primary-300 object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold text-sm">
                  {currentUser?.name?.[0] || 'U'}
                </div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
