import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import { 
  Sparkles, ArrowLeft, Edit, MapPin, Star, Award, 
  Briefcase, BookOpen, TrendingUp, Settings, LogOut,
  Shield, Phone, Mail, Calendar, CheckCircle, Camera,
  Heart, MessageCircle, Users, DollarSign
} from 'lucide-react';

function ProfilePage() {
  const { currentUser, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showEditModal, setShowEditModal] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-500" />
              <span className="text-xl font-display font-bold gradient-text">Eka</span>
            </Link>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowEditModal(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
                <ArrowLeft className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Profile Header */}
        <div className="card p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={currentUser.profileImage} 
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-primary-200"
              />
              {currentUser.verified && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-success-500 rounded-full flex items-center justify-center border-4 border-white">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
              <button className="absolute top-0 right-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition">
                <Camera className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{currentUser.name}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{currentUser.location.city}, {currentUser.location.state}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-500" />
                    <span className="text-gray-600">{currentUser.phone}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="btn-outline px-4 py-2 flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{currentUser.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary-600">{currentUser.completedJobs}</div>
                  <div className="text-sm text-gray-600">Jobs Done</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success-600">₹{(currentUser.totalEarnings / 1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-600">Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-600">{currentUser.trustScore}</div>
                  <div className="text-sm text-gray-600">Trust Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{currentUser.badges.length}</div>
                  <div className="text-sm text-gray-600">Badges</div>
                </div>
              </div>
            </div>
          </div>

          {/* Roles */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-3">Active Roles</h3>
            <div className="flex flex-wrap gap-2">
              {currentUser.roles.map((role, index) => (
                <span key={index} className="badge badge-primary capitalize">
                  {role.replace('_', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab('about')}
            className={`pb-3 px-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'about'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            About
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            className={`pb-3 px-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'skills'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Skills & Badges
          </button>
          <button
            onClick={() => setActiveTab('earnings')}
            className={`pb-3 px-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'earnings'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Earnings
          </button>
          <button
            onClick={() => setActiveTab('activity')}
            className={`pb-3 px-4 font-semibold border-b-2 transition whitespace-nowrap ${
              activeTab === 'activity'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Activity
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && <AboutTab currentUser={currentUser} />}
        {activeTab === 'skills' && <SkillsTab currentUser={currentUser} />}
        {activeTab === 'earnings' && <EarningsTab currentUser={currentUser} />}
        {activeTab === 'activity' && <ActivityTab />}

        {/* Logout Button */}
        <div className="mt-8">
          <button 
            onClick={handleLogout}
            className="w-full py-4 bg-red-50 text-red-600 rounded-xl font-semibold hover:bg-red-100 transition flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal 
          currentUser={currentUser}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

// About Tab
function AboutTab({ currentUser }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Personal Information</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Age</span>
            <span className="font-semibold text-gray-800">{currentUser.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Education</span>
            <span className="font-semibold text-gray-800">{currentUser.education}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Member Since</span>
            <span className="font-semibold text-gray-800">{new Date(currentUser.joinedDate).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Verification Status</span>
            <span className={`badge ${currentUser.verified ? 'badge-success' : 'badge-primary'}`}>
              {currentUser.verified ? 'Verified' : 'Pending'}
            </span>
          </div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Languages</h3>
        <div className="flex flex-wrap gap-2">
          {currentUser.languages.map((lang, index) => (
            <span key={index} className="badge badge-primary">
              {lang}
            </span>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
        <div className="space-y-2">
          <p className="text-gray-700">{currentUser.location.city}</p>
          <p className="text-gray-600">{currentUser.location.district}, {currentUser.location.state}</p>
          <p className="text-gray-600">PIN: {currentUser.location.pincode}</p>
        </div>
      </div>
    </div>
  );
}

// Skills Tab
function SkillsTab({ currentUser }) {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">My Skills</h3>
        <div className="flex flex-wrap gap-3">
          {currentUser.skills.map((skill, index) => (
            <div key={index} className="px-4 py-2 bg-gradient-to-r from-primary-50 to-secondary-50 border-2 border-primary-200 rounded-lg">
              <span className="font-semibold text-primary-700">{skill}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements & Badges</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {currentUser.badges.map((badge, index) => (
            <div key={index} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-200">
              <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h4 className="font-bold text-gray-800 text-sm">{badge}</h4>
            </div>
          ))}
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Trust & Safety</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield className="w-8 h-8 text-success-500" />
              <div>
                <h4 className="font-bold text-gray-800">Trust Score</h4>
                <p className="text-sm text-gray-600">Based on reviews and verification</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-success-600">{currentUser.trustScore}</div>
          </div>
          
          {currentUser.verified && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
              <CheckCircle className="w-8 h-8 text-blue-500" />
              <div>
                <h4 className="font-bold text-gray-800">Verified Profile</h4>
                <p className="text-sm text-gray-600">Identity verified by Eka</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Earnings Tab
function EarningsTab({ currentUser }) {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="card p-6 text-center">
          <DollarSign className="w-12 h-12 text-success-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">₹{currentUser.totalEarnings.toLocaleString()}</div>
          <div className="text-gray-600">Total Earnings</div>
        </div>
        <div className="card p-6 text-center">
          <TrendingUp className="w-12 h-12 text-primary-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">₹12,450</div>
          <div className="text-gray-600">This Month</div>
        </div>
        <div className="card p-6 text-center">
          <Briefcase className="w-12 h-12 text-secondary-500 mx-auto mb-3" />
          <div className="text-3xl font-bold text-gray-800 mb-1">{currentUser.completedJobs}</div>
          <div className="text-gray-600">Jobs Completed</div>
        </div>
      </div>

      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { id: 1, type: 'Tailoring Service', amount: 800, date: '2024-02-22', status: 'completed' },
            { id: 2, type: 'Blouse Stitching', amount: 300, date: '2024-02-20', status: 'completed' },
            { id: 3, type: 'Alteration Work', amount: 150, date: '2024-02-18', status: 'completed' },
          ].map(transaction => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-semibold text-gray-800">{transaction.type}</h4>
                <p className="text-sm text-gray-600">{new Date(transaction.date).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-success-600">+₹{transaction.amount}</div>
                <span className="badge badge-success text-xs">{transaction.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Activity Tab
function ActivityTab() {
  return (
    <div className="space-y-6">
      <div className="card p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {[
            { icon: <Heart className="w-5 h-5 text-red-500" />, text: 'Liked a post in Shakti Community', time: '2 hours ago' },
            { icon: <MessageCircle className="w-5 h-5 text-blue-500" />, text: 'Commented on achievement post', time: '5 hours ago' },
            { icon: <BookOpen className="w-5 h-5 text-purple-500" />, text: 'Completed lesson in Tailoring course', time: '1 day ago' },
            { icon: <Briefcase className="w-5 h-5 text-green-500" />, text: 'Applied for Tailor position', time: '2 days ago' },
            { icon: <Award className="w-5 h-5 text-yellow-500" />, text: 'Earned "5 Star Rating" badge', time: '3 days ago' },
          ].map((activity, index) => (
            <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
              <div className="p-2 bg-gray-100 rounded-full">
                {activity.icon}
              </div>
              <div className="flex-1">
                <p className="text-gray-800">{activity.text}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Edit Profile Modal
function EditProfileModal({ currentUser, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Edit Profile</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Name</label>
              <input type="text" defaultValue={currentUser.name} className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Bio</label>
              <textarea rows="4" defaultValue={currentUser.bio} className="input"></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone</label>
              <input type="tel" defaultValue={currentUser.phone} className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Location</label>
              <input type="text" defaultValue={`${currentUser.location.city}, ${currentUser.location.state}`} className="input" />
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-outline flex-1 py-3">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1 py-3">
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
