import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { 
  Sparkles, BookOpen, Briefcase, TrendingUp, Users, 
  Award, Star, ArrowRight,
  Bell, Search, Home, ShoppingBag, User
} from 'lucide-react';

function DashboardPage() {
  const { currentUser: contextUser, setCurrentUser, courses, jobs, posts } = useContext(AppContext);
  
  // Local state to force re-render with localStorage data
  const [displayUser, setDisplayUser] = useState(contextUser);

  // Load user data from localStorage on mount
  useEffect(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      const userData = JSON.parse(savedUserData);
      console.log('Dashboard: Loading user from localStorage:', userData.name);
      setDisplayUser(userData);
      if (setCurrentUser) {
        setCurrentUser(userData); // Update context too if available
      }
    } else {
      console.log('Dashboard: No saved data, using context user:', contextUser?.name || 'Unknown');
      setDisplayUser(contextUser);
    }
  }, [contextUser, setCurrentUser]);

  // Get first name from full name
  const getFirstName = () => {
    if (!displayUser || !displayUser.name) return 'User';
    const firstName = displayUser.name.split(' ')[0];
    console.log('Dashboard: Displaying name:', firstName);
    return firstName;
  };

  // Safety check - if no user data, show loading
  if (!displayUser) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800 mb-2">Loading...</div>
          <p className="text-gray-600">Please wait</p>
        </div>
      </div>
    );
  }

  // Get user's enrolled courses (first 3 for demo)
  const enrolledCourses = courses.slice(0, 3);
  
  // Get recommended jobs (first 4 for demo)
  const recommendedJobs = jobs.slice(0, 4);
  
  // Get recent community posts (first 3 for demo)
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-display font-bold gradient-text">Eka</span>
            </div>
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-full relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <Search className="w-5 h-5 text-gray-600" />
              </button>
              <Link to="/profile" className="flex items-center gap-2">
                <img 
                  src={displayUser.profileImage} 
                  alt={displayUser.name}
                  className="w-8 h-8 rounded-full border-2 border-primary-300 object-cover"
                />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">
            Welcome to Eka, {getFirstName()}! 🌟
          </h1>
          <p className="text-gray-600 text-lg">
            Let's start your journey to success! Here's what you can do today.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <BookOpen className="w-8 h-8 text-primary-500" />
              <span className="text-2xl font-bold text-gray-800">3</span>
            </div>
            <p className="text-gray-600 text-sm">Courses Enrolled</p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-success-500" />
              <span className="text-2xl font-bold text-gray-800">₹{(displayUser.totalEarnings || 0).toLocaleString()}</span>
            </div>
            <p className="text-gray-600 text-sm">Total Earnings</p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-800">{displayUser.trustScore || '4.7'}</span>
            </div>
            <p className="text-gray-600 text-sm">Trust Score</p>
          </div>
          
          <div className="card p-6">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-800">{displayUser.badges?.length || 0}</span>
            </div>
            <p className="text-gray-600 text-sm">Badges Earned</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Continue Learning</h2>
                <Link to="/courses" className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {enrolledCourses.map(course => (
                  <div key={course.id} className="card p-4 flex gap-4">
                    <img 
                      src={course.thumbnail} 
                      alt={course.title}
                      className="w-24 h-24 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                      <p className="text-sm text-gray-600 mb-2">{course.instructor.name}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                            style={{ width: '45%' }}
                          ></div>
                        </div>
                        <span className="text-sm font-semibold text-gray-700">45%</span>
                      </div>
                    </div>
                    <button className="btn-primary px-4 py-2 text-sm">
                      Continue
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* Recommended Jobs */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Jobs For You</h2>
                <Link to="/jobs" className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {recommendedJobs.map(job => (
                  <div key={job.id} className="card p-4 card-hover">
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src={job.employer.logo} 
                        alt={job.employer.name}
                        className="w-12 h-12 rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-800 text-sm mb-1">{job.title}</h3>
                        <p className="text-xs text-gray-600">{job.employer.name}</p>
                      </div>
                      {job.employer.verified && (
                        <span className="badge badge-success text-xs">Verified</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <span>📍 {job.location.city}</span>
                      <span>•</span>
                      <span>{job.location.distance}km away</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-600">
                        ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                      </span>
                      <button className="btn-outline px-3 py-1 text-sm">Apply</button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Community Feed Preview */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Shakti Community</h2>
                <Link to="/community" className="text-primary-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                  View All <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post.id} className="card p-4">
                    <div className="flex items-start gap-3 mb-3">
                      <img 
                        src={post.user.image} 
                        alt={post.user.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-gray-800">{post.user.name}</h4>
                          {post.user.verified && (
                            <span className="text-primary-500">✓</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500">2 hours ago</p>
                      </div>
                      {post.achievement && (
                        <span className="text-2xl">{post.achievement.icon}</span>
                      )}
                    </div>
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <button className="flex items-center gap-1 hover:text-primary-600">
                        ❤️ {post.likes}
                      </button>
                      <button className="flex items-center gap-1 hover:text-primary-600">
                        💬 {post.comments}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="card p-6">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/courses" className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition">
                  <BookOpen className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">Browse Courses</span>
                </Link>
                <Link to="/jobs" className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition">
                  <Briefcase className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">Find Jobs</span>
                </Link>
                <Link to="/services" className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition">
                  <ShoppingBag className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">Offer Services</span>
                </Link>
                <Link to="/community" className="flex items-center gap-3 p-3 hover:bg-purple-50 rounded-lg transition">
                  <Users className="w-5 h-5 text-primary-500" />
                  <span className="text-gray-700">Join Community</span>
                </Link>
              </div>
            </div>

            {/* Your Badges */}
            {displayUser.badges && displayUser.badges.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">Your Achievements</h3>
                <div className="grid grid-cols-3 gap-3">
                  {displayUser.badges.map((badge, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-2">
                        <Award className="w-8 h-8 text-white" />
                      </div>
                      <p className="text-xs text-gray-600">{badge}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Motivational Quote */}
            <div className="quote-box">
              <p className="text-center">
                "Every skill you learn is a step towards your dreams. Keep going!"
              </p>
            </div>

            {/* Skills */}
            {displayUser.skills && displayUser.skills.length > 0 && (
              <div className="card p-6">
                <h3 className="font-bold text-gray-800 mb-4">Your Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {displayUser.skills.map((skill, index) => (
                    <span key={index} className="badge badge-primary">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around">
          <Link to="/dashboard" className="flex flex-col items-center gap-1 text-primary-600">
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/courses" className="flex flex-col items-center gap-1 text-gray-600">
            <BookOpen className="w-6 h-6" />
            <span className="text-xs">Learn</span>
          </Link>
          <Link to="/jobs" className="flex flex-col items-center gap-1 text-gray-600">
            <Briefcase className="w-6 h-6" />
            <span className="text-xs">Jobs</span>
          </Link>
          <Link to="/community" className="flex flex-col items-center gap-1 text-gray-600">
            <Users className="w-6 h-6" />
            <span className="text-xs">Community</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center gap-1 text-gray-600">
            <User className="w-6 h-6" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default DashboardPage;
