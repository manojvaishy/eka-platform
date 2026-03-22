import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';
import { t, getCurrentLanguage, setCurrentLanguage } from '../utils/translations';
import { 
  ArrowLeft, Edit, MapPin, Star, Award, 
  Briefcase, BookOpen, TrendingUp, Settings, LogOut,
  Shield, Phone, Mail, Calendar, CheckCircle, Camera,
  Heart, MessageCircle, Users, DollarSign, Trophy,
  Target, Zap, Crown, Medal, Globe, Languages
} from 'lucide-react';

function EnhancedProfilePage() {
  const { currentUser: contextUser, setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(getCurrentLanguage());
  
  // Load user data from onboarding or use context user
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      return JSON.parse(savedUserData);
    }
    return contextUser;
  });
  
  const [editFormData, setEditFormData] = useState({
    name: currentUser.name,
    bio: currentUser.bio,
    location: currentUser.location,
    phone: currentUser.phone,
    skills: currentUser.skills,
    interests: currentUser.interests || [],
    profileImage: currentUser.profileImage
  });

  // Update when language changes
  useEffect(() => {
    const lang = getCurrentLanguage();
    setSelectedLanguage(lang);
  }, []);

  // Mock data for demonstration
  const trustScore = currentUser.trustScore || 4.7;
  const verificationStatus = currentUser.verified ? 'verified' : 'none'; // 'verified', 'pending', 'none'
  
  const badges = [
    { id: 1, name: 'First Earning', icon: '💰', earned: true, date: '2024-01-15' },
    { id: 2, name: '10 Jobs Completed', icon: '🎯', earned: true, date: '2024-02-01' },
    { id: 3, name: 'Top Rated', icon: '⭐', earned: true, date: '2024-02-10' },
    { id: 4, name: 'Course Completed', icon: '🎓', earned: true, date: '2024-01-20' },
    { id: 5, name: '50 Jobs Milestone', icon: '🏆', earned: false },
    { id: 6, name: 'Mentor Badge', icon: '👩‍🏫', earned: false },
  ];

  const achievements = [
    { id: 1, title: 'First ₹5,000 Earned', desc: 'Reached first earning milestone', date: '2024-01-15', icon: '💵' },
    { id: 2, title: 'Completed Tailoring Course', desc: 'Professional Tailoring Masterclass', date: '2024-01-20', icon: '🎓' },
    { id: 3, title: '23 Jobs Completed', desc: 'Successfully completed 23 service bookings', date: '2024-02-20', icon: '✅' },
    { id: 4, title: 'Top Rated Seller', desc: 'Maintained 4.7+ rating for 3 months', date: '2024-02-10', icon: '⭐' },
  ];

  const completedCourses = [
    { id: 1, name: 'Professional Tailoring & Stitching', completion: 100, certificate: true },
    { id: 2, name: 'Digital Marketing Basics', completion: 75, certificate: false },
    { id: 3, name: 'English Communication Skills', completion: 100, certificate: true },
  ];

  const languages = [
    { code: 'hindi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'marathi', name: 'मराठी', flag: '🇮🇳' },
  ];

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('onboardingComplete');
    navigate('/');
  };

  const handleVerificationRequest = () => {
    alert('Verification request submitted! Our team will review your profile within 24-48 hours.');
    setShowVerificationModal(false);
  };

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
    setCurrentLanguage(lang);
    // Update user data with new language
    const updatedUser = { ...currentUser, language: lang };
    setCurrentUser(updatedUser);
    localStorage.setItem('userData', JSON.stringify(updatedUser));
    // Force re-render
    window.location.reload();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      const maxSize = 5 * 1024 * 1024; // 5MB

      if (!validFormats.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, or WebP)');
        return;
      }

      if (file.size > maxSize) {
        alert('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditFormData({ ...editFormData, profileImage: reader.result });
        
        // Warn if verification is pending
        if (verificationStatus === 'pending') {
          if (confirm('⚠️ Changing your profile image will restart the verification process. Continue?')) {
            // Image changed, verification will restart
          } else {
            // Revert change
            setEditFormData({ ...editFormData, profileImage: currentUser.profileImage });
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    // Check if critical fields changed during verification
    const criticalFieldsChanged = 
      (verificationStatus === 'pending') && (
        editFormData.name !== currentUser.name ||
        editFormData.phone !== currentUser.phone ||
        editFormData.location.city !== currentUser.location.city ||
        editFormData.profileImage !== currentUser.profileImage
      );

    if (criticalFieldsChanged) {
      if (confirm('⚠️ You changed critical information. Your verification process will restart. Continue?')) {
        alert('Profile updated! Verification process has been restarted.');
        // In real app: update profile and reset verification status
      } else {
        return;
      }
    } else {
      alert('Profile updated successfully!');
    }
    
    setShowEditModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link to="/dashboard" className="flex items-center gap-2">
              <EkaLogo size="sm" />
              <span className="text-xl font-display font-bold gradient-text">Eka</span>
            </Link>
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <select
                value={selectedLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="px-3 py-2 border-2 border-gray-200 rounded-lg text-sm focus:border-primary-500 outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.flag} {lang.name}
                  </option>
                ))}
              </select>
              <button 
                onClick={() => setShowEditModal(true)}
                className="p-2 hover:bg-gray-100 rounded-full"
                title={t('Settings', selectedLanguage)}
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

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Profile Header */}
        <div className="card p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Image */}
            <div className="relative">
              <img 
                src={currentUser.profileImage} 
                alt={currentUser.name}
                className="w-32 h-32 rounded-full border-4 border-primary-200 object-cover"
              />
              {currentUser.verified && (
                <div className="absolute bottom-0 right-0 w-10 h-10 bg-success-500 rounded-full flex items-center justify-center border-4 border-white">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
              )}
              <label className="absolute top-0 right-0 w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:bg-primary-600 transition cursor-pointer">
                <Camera className="w-5 h-5 text-white" />
                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
              </label>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-800">{currentUser.name}</h1>
                    {currentUser.verified ? (
                      <span className="badge badge-success flex items-center gap-1">
                        <Shield className="w-4 h-4" />
                        {t('Verified', selectedLanguage)}
                      </span>
                    ) : (
                      <button
                        onClick={() => setShowVerificationModal(true)}
                        className="badge bg-gray-200 text-gray-700 hover:bg-gray-300 cursor-pointer"
                      >
                        {t('Request Verification', selectedLanguage)}
                      </button>
                    )}
                  </div>
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

              {/* Trust Score */}
              <div className="mb-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">{t('Trust Score', selectedLanguage)}</div>
                    <div className="flex items-center gap-2">
                      <div className="text-3xl font-bold text-primary-600">{trustScore}</div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map(star => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.floor(trustScore)
                                ? 'fill-gold-500 text-gold-500'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-600">{t('Based on', selectedLanguage)}</div>
                    <div className="text-lg font-semibold text-gray-800">
                      {currentUser.completedJobs || 0} {t('completed jobs', selectedLanguage)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p className="text-gray-700 mb-4">{currentUser.bio}</p>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-primary-600">{currentUser.completedJobs || 0}</div>
                  <div className="text-sm text-gray-600">{t('Jobs Done', selectedLanguage)}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-secondary-600">₹{(currentUser.totalEarnings || 0).toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{t('Earned', selectedLanguage)}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-success-600">{completedCourses.length}</div>
                  <div className="text-sm text-gray-600">{t('Courses', selectedLanguage)}</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gold-600">{badges.filter(b => b.earned).length}</div>
                  <div className="text-sm text-gray-600">{t('Badges', selectedLanguage)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['about', 'badges', 'courses', 'achievements', 'settings'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-lg font-semibold whitespace-nowrap transition ${
                activeTab === tab
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'about' && (
          <div className="grid md:grid-cols-2 gap-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-500" />
                Skills
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.skills.map((skill, index) => (
                  <span key={index} className="badge badge-primary">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-secondary-500" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests?.map((interest, index) => (
                  <span key={index} className="badge badge-secondary">
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-success-500" />
                Languages
              </h3>
              <div className="space-y-2">
                {currentUser.languages?.map((lang, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <span className="text-gray-700">{lang}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-gold-500" />
                Active Roles
              </h3>
              <div className="space-y-2">
                {['Learner', 'Skilled Worker'].map((role, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold-500" />
                    <span className="text-gray-700">{role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'badges' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Earned Badges</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {badges.map(badge => (
                <div
                  key={badge.id}
                  className={`p-6 rounded-xl text-center transition ${
                    badge.earned
                      ? 'bg-gradient-to-br from-primary-50 to-secondary-50 border-2 border-primary-200'
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div className="text-5xl mb-3">{badge.icon}</div>
                  <div className="font-bold text-gray-800 mb-1">{badge.name}</div>
                  {badge.earned && badge.date && (
                    <div className="text-xs text-gray-600">
                      Earned: {new Date(badge.date).toLocaleDateString()}
                    </div>
                  )}
                  {!badge.earned && (
                    <div className="text-xs text-gray-500">Not earned yet</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Completed Courses</h3>
            <div className="space-y-4">
              {completedCourses.map(course => (
                <div key={course.id} className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <h4 className="font-bold text-gray-800 mb-1">{course.name}</h4>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary-500 to-secondary-500"
                            style={{ width: `${course.completion}%` }}
                          />
                        </div>
                        <span className="text-sm font-semibold text-gray-600">{course.completion}%</span>
                      </div>
                    </div>
                    {course.certificate && (
                      <button className="ml-4 btn-primary px-4 py-2 text-sm">
                        <Award className="w-4 h-4 mr-2" />
                        Certificate
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="card p-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Achievements</h3>
            <div className="space-y-4">
              {achievements.map(achievement => (
                <div key={achievement.id} className="flex gap-4 p-4 bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg">
                  <div className="text-4xl">{achievement.icon}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800 mb-1">{achievement.title}</h4>
                    <p className="text-gray-600 text-sm mb-2">{achievement.desc}</p>
                    <div className="text-xs text-gray-500">
                      {new Date(achievement.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="card p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Account Settings</h3>
              <div className="space-y-4">
                <button className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Languages className="w-5 h-5 text-primary-500" />
                    <div>
                      <div className="font-semibold text-gray-800">Language Preference</div>
                      <div className="text-sm text-gray-600">Change interface language</div>
                    </div>
                  </div>
                  <span className="text-gray-400">›</span>
                </button>
                <button className="w-full p-4 text-left hover:bg-gray-50 rounded-lg transition flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-success-500" />
                    <div>
                      <div className="font-semibold text-gray-800">Privacy & Security</div>
                      <div className="text-sm text-gray-600">Manage your privacy settings</div>
                    </div>
                  </div>
                  <span className="text-gray-400">›</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full p-4 text-left hover:bg-red-50 rounded-lg transition flex items-center gap-3 text-red-600"
                >
                  <LogOut className="w-5 h-5" />
                  <div>
                    <div className="font-semibold">Logout</div>
                    <div className="text-sm">Sign out of your account</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-8">
            <div className="text-center mb-6">
              <Shield className="w-16 h-16 text-primary-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Request Verification</h2>
              <p className="text-gray-600">
                Get verified to build trust and unlock premium features
              </p>
            </div>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  Verified badge on your profile
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  Higher trust score and visibility
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  Priority in search results
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowVerificationModal(false)}
                className="btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleVerificationRequest}
                className="btn-primary flex-1"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EnhancedProfilePage;
