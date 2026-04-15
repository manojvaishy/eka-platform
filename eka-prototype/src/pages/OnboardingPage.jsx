import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, ArrowLeft, Upload, Check,
  User, MapPin, Globe, Briefcase, GraduationCap, Heart
} from 'lucide-react';
import { t, setCurrentLanguage } from '../utils/translations';

function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedLang, setSelectedLang] = useState('english');
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: {
      state: '',
      city: '',
      pincode: ''
    },
    language: 'english',
    skills: [],
    interests: [],
    education: '',
    workPreference: [],
    roles: [],
    profileImage: null,
    phone: '+91 98765 43210', // Mock phone
    bio: ''
  });

  const languages = [
    { code: 'hindi', name: 'हिंदी (Hindi)', flag: '🇮🇳' },
    { code: 'english', name: 'English', flag: '🇬🇧' },
    { code: 'marathi', name: 'मराठी (Marathi)', flag: '🇮🇳' },
    { code: 'tamil', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
    { code: 'telugu', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
    { code: 'bengali', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
    { code: 'gujarati', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
    { code: 'kannada', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  ];

  const handleLanguageSelect = (langCode) => {
    setFormData({ ...formData, language: langCode });
    setSelectedLang(langCode);
  };

  const skillOptions = [
    'Tailoring', 'Cooking', 'Beauty & Makeup', 'Teaching', 'Digital Marketing',
    'Handicrafts', 'Embroidery', 'Mehendi', 'Yoga', 'Baking',
    'Content Writing', 'Social Media', 'Candle Making', 'Jewelry Making'
  ];

  const interestOptions = [
    'Starting a Business', 'Learning New Skills', 'Finding Jobs', 
    'Freelancing', 'Teaching Others', 'Community Building',
    'Financial Independence', 'Work from Home', 'Part-time Work'
  ];

  const educationLevels = [
    '5th Pass or Below',
    '8th Pass',
    '10th Pass',
    '12th Pass',
    'Graduate',
    'Post Graduate',
    'Professional Degree'
  ];

  const workPreferences = [
    'Full Time Job',
    'Part Time Job',
    'Work from Home',
    'Freelance',
    'Own Business',
    'Flexible Hours'
  ];

  const roleOptions = [
    { id: 'learner', name: 'Learner', icon: '📚', desc: 'Learn new skills and courses' },
    { id: 'skilled_worker', name: 'Skilled Worker', icon: '💼', desc: 'Offer services and find jobs' },
    { id: 'mentor', name: 'Mentor', icon: '👩‍🏫', desc: 'Teach and guide others' },
    { id: 'employer', name: 'Employer', icon: '🏢', desc: 'Post jobs and hire talent' },
    { id: 'customer', name: 'Customer', icon: '🛍️', desc: 'Book services and courses' }
  ];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image format and size
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
        setFormData({ ...formData, profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSelection = (field, value) => {
    const current = formData[field];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter(item => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    // Create complete user profile from onboarding data
    const userProfile = {
      id: Date.now().toString(),
      name: formData.name,
      age: parseInt(formData.age),
      phone: localStorage.getItem('userPhone') || formData.phone,
      profileImage: formData.profileImage || 'https://i.pravatar.cc/150?img=1',
      location: formData.location,
      language: formData.language,
      skills: formData.skills,
      interests: formData.interests,
      education: formData.education,
      workPreference: formData.workPreference,
      roles: formData.roles,
      bio: `${formData.roles.join(', ')} | ${formData.skills.slice(0, 3).join(', ')}`,
      verified: false,
      trustScore: 0,
      completedJobs: 0,
      totalEarnings: 0,
      languages: [formData.language === 'hindi' ? 'Hindi' : formData.language === 'english' ? 'English' : 'Marathi'],
      joinedDate: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('userData', JSON.stringify(userProfile));
    localStorage.setItem('onboardingComplete', 'true');
    localStorage.setItem('selectedLanguage', formData.language);
    setCurrentLanguage(formData.language);

    // Save to Firestore
    try {
      const { db } = await import('../firebase');
      const { doc, setDoc } = await import('firebase/firestore');
      const phone = localStorage.getItem('userPhone') || 'unknown';
      await setDoc(doc(db, 'users', `phone_${phone}`), {
        ...userProfile,
        profileImage: userProfile.profileImage?.startsWith('data:') ? '[photo uploaded]' : userProfile.profileImage,
        updatedAt: new Date().toISOString()
      });
      console.log('✅ Data saved to Firestore!');
    } catch (err) {
      console.log('Firestore save skipped:', err.message);
    }
    
    navigate('/dashboard');
  };

  const isStepValid = () => {
    switch(step) {
      case 1: return formData.name && formData.age;
      case 2: return formData.location.state && formData.location.city;
      case 3: return formData.language;
      case 4: return formData.skills.length > 0;
      case 5: return formData.education && formData.workPreference.length > 0;
      case 6: return formData.roles.length > 0;
      default: return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-primary-500" />
            <h1 className="text-3xl font-display font-bold gradient-text">{t('Welcome to Eka', selectedLang)}</h1>
          </div>
          <p className="text-gray-600">{t("Let's set up your profile to get started", selectedLang)}</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div
                key={num}
                className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition ${
                  num < step
                    ? 'bg-success-500 text-white'
                    : num === step
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {num < step ? <Check className="w-6 h-6" /> : num}
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
              style={{ width: `${(step / 6) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-8">
          {/* Step 1: Basic Info */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <User className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('Basic Information', selectedLang)}</h2>
                <p className="text-gray-600">{t('Tell us about yourself', selectedLang)}</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t('Full Name', selectedLang)} *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={t('Enter your full name', selectedLang)}
                  className="input"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t('Age', selectedLang)} *</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  placeholder={t('Enter your age', selectedLang)}
                  className="input"
                  min="18"
                  max="100"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">{t('Profile Picture', selectedLang)} (Optional)</label>
                <div className="flex items-center gap-4">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center">
                      <User className="w-12 h-12 text-gray-400" />
                    </div>
                  )}
                  <label className="btn-outline cursor-pointer">
                    <Upload className="w-4 h-4 mr-2" />
                    {t('Upload Photo', selectedLang)}
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-sm text-gray-500 mt-2">{t('Max 5MB, JPEG/PNG/WebP format', selectedLang)}</p>
              </div>
            </div>
          )}

          {/* Step 2: Location */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <MapPin className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">Location</h2>
                <p className="text-gray-600">Where are you located?</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">State *</label>
                <select
                  value={formData.location.state}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    location: { ...formData.location, state: e.target.value }
                  })}
                  className="input"
                >
                  <option value="">Select State</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                  <option value="Gujarat">Gujarat</option>
                  <option value="Rajasthan">Rajasthan</option>
                  <option value="West Bengal">West Bengal</option>
                  <option value="Telangana">Telangana</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">City *</label>
                <input
                  type="text"
                  value={formData.location.city}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    location: { ...formData.location, city: e.target.value }
                  })}
                  placeholder="Enter your city"
                  className="input"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Pincode</label>
                <input
                  type="text"
                  value={formData.location.pincode}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    location: { ...formData.location, pincode: e.target.value }
                  })}
                  placeholder="Enter pincode"
                  className="input"
                  maxLength="6"
                />
              </div>
            </div>
          )}

          {/* Step 3: Language */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Globe className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">{t('Language Preference', selectedLang)}</h2>
                <p className="text-gray-600">{t('Choose your preferred language', selectedLang)}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {languages.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLanguageSelect(lang.code)}
                    className={`p-4 rounded-xl border-2 transition text-left ${
                      formData.language === lang.code
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="text-2xl mb-2">{lang.flag}</div>
                    <div className="font-semibold text-gray-800">{lang.name}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Skills & Interests */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Briefcase className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">Skills & Interests</h2>
                <p className="text-gray-600">What are you good at?</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Your Skills *</label>
                <div className="flex flex-wrap gap-2">
                  {skillOptions.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSelection('skills', skill)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        formData.skills.includes(skill)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Your Interests</label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map(interest => (
                    <button
                      key={interest}
                      onClick={() => toggleSelection('interests', interest)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        formData.interests.includes(interest)
                          ? 'bg-secondary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {interest}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Education & Work Preference */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <GraduationCap className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">Education & Work</h2>
                <p className="text-gray-600">Tell us about your background</p>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Education Level *</label>
                <select
                  value={formData.education}
                  onChange={(e) => setFormData({ ...formData, education: e.target.value })}
                  className="input"
                >
                  <option value="">Select Education Level</option>
                  {educationLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-3">Work Preference *</label>
                <div className="flex flex-wrap gap-2">
                  {workPreferences.map(pref => (
                    <button
                      key={pref}
                      onClick={() => toggleSelection('workPreference', pref)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        formData.workPreference.includes(pref)
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {pref}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Select Roles */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <Heart className="w-12 h-12 text-primary-500 mx-auto mb-3" />
                <h2 className="text-2xl font-bold text-gray-800">Choose Your Roles</h2>
                <p className="text-gray-600">You can select multiple roles</p>
              </div>

              <div className="space-y-3">
                {roleOptions.map(role => (
                  <button
                    key={role.id}
                    onClick={() => toggleSelection('roles', role.id)}
                    className={`w-full p-4 rounded-xl border-2 transition text-left ${
                      formData.roles.includes(role.id)
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{role.icon}</div>
                      <div className="flex-1">
                        <div className="font-bold text-gray-800">{role.name}</div>
                        <div className="text-sm text-gray-600">{role.desc}</div>
                      </div>
                      {formData.roles.includes(role.id) && (
                        <Check className="w-6 h-6 text-primary-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-3 mt-8">
            {step > 1 && (
              <button onClick={handleBack} className="btn-outline flex-1">
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t('Back', selectedLang)}
              </button>
            )}
            {step < 6 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('Next', selectedLang)}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleComplete}
                disabled={!isStepValid()}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('Complete Setup', selectedLang)}
                <Check className="w-5 h-5 ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
