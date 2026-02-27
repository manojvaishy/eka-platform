import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import { 
  Sparkles, Search, Filter, BookOpen, Clock, Star, 
  Users, Award, TrendingUp, ChevronDown, X, Play,
  Download, CheckCircle, ArrowLeft
} from 'lucide-react';

function CoursesPage() {
  const { courses, currentUser } = useContext(AppContext);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const categories = [
    { id: 'all', name: 'All Courses', icon: '📚' },
    { id: 'sewing', name: 'Tailoring & Sewing', icon: '🧵' },
    { id: 'beauty', name: 'Beauty & Makeup', icon: '💄' },
    { id: 'cooking', name: 'Cooking & Catering', icon: '🍳' },
    { id: 'digital', name: 'Digital Skills', icon: '💻' },
    { id: 'teaching', name: 'Teaching & Training', icon: '👩‍🏫' },
    { id: 'craft', name: 'Handicrafts', icon: '🎨' },
  ];

  // Filter courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
    const matchesLanguage = selectedLanguage === 'all' || course.language === selectedLanguage;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesLevel && matchesLanguage && matchesSearch;
  });

  if (selectedCourse) {
    return <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} />;
  }

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
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-800 mb-2">
            Learn New Skills 📚
          </h1>
          <p className="text-gray-600 text-lg">
            100+ free courses to help you grow and earn
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="mb-6 overflow-x-auto">
          <div className="flex gap-3 pb-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              >
                <span>{category.icon}</span>
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 flex gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border-2 border-gray-200 hover:border-primary-500 transition"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            <ChevronDown className={`w-4 h-4 transition ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {(selectedLevel !== 'all' || selectedLanguage !== 'all') && (
            <button
              onClick={() => {
                setSelectedLevel('all');
                setSelectedLanguage('all');
              }}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <X className="w-4 h-4" />
              Clear Filters
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mb-6 card p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Level</label>
                <select
                  value={selectedLevel}
                  onChange={(e) => setSelectedLevel(e.target.value)}
                  className="input"
                >
                  <option value="all">All Levels</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Language</label>
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="input"
                >
                  <option value="all">All Languages</option>
                  <option value="Hindi">Hindi</option>
                  <option value="English">English</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telugu">Telugu</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-bold text-primary-600">{filteredCourses.length}</span> courses
          </p>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map(course => (
            <div key={course.id} className="card card-hover cursor-pointer" onClick={() => setSelectedCourse(course)}>
              <div className="relative">
                <img 
                  src={course.thumbnail} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                {course.trending && (
                  <span className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    Trending
                  </span>
                )}
                {course.price === 0 && (
                  <span className="absolute top-3 left-3 bg-success-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                    FREE
                  </span>
                )}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-primary text-xs capitalize">{course.level}</span>
                  <span className="badge badge-gold text-xs">{course.language}</span>
                </div>
                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2">{course.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <img 
                    src={course.instructor.image} 
                    alt={course.instructor.name}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm text-gray-600">{course.instructor.name}</span>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{course.duration} mins</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrollmentCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  {course.price === 0 ? (
                    <span className="text-lg font-bold text-success-600">FREE</span>
                  ) : (
                    <span className="text-lg font-bold text-primary-600">₹{course.price}</span>
                  )}
                  <button className="btn-primary px-4 py-2 text-sm">
                    Enroll Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No courses found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Course Detail View Component
function CourseDetailView({ course, onBack }) {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      {/* Header */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Courses</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Preview */}
            <div className="card mb-6 overflow-hidden">
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-50" />
                <button className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition">
                    <Play className="w-10 h-10 text-primary-600 ml-1" />
                  </div>
                </button>
              </div>
            </div>

            {/* Course Info */}
            <div className="card p-6 mb-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="badge badge-primary capitalize">{course.level}</span>
                <span className="badge badge-gold">{course.language}</span>
                {course.certificate && (
                  <span className="badge badge-success">Certificate</span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">{course.title}</h1>
              <p className="text-gray-600 mb-4">{course.description}</p>

              <div className="flex items-center gap-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold">{course.rating}</span>
                  <span>({course.enrollmentCount.toLocaleString()} students)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration} minutes</span>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <img 
                  src={course.instructor.image} 
                  alt={course.instructor.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <p className="font-semibold text-gray-800">{course.instructor.name}</p>
                  <p className="text-sm text-gray-600">{course.instructor.bio}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="card">
              <div className="border-b border-gray-200">
                <div className="flex gap-6 px-6">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'overview'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('syllabus')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'syllabus'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Syllabus
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'reviews'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600 hover:text-gray-800'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">What you'll learn</h3>
                    <ul className="space-y-2 mb-6">
                      {course.skills.map((skill, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{skill}</span>
                        </li>
                      ))}
                    </ul>
                    <h3 className="font-bold text-gray-800 mb-3">Course Details</h3>
                    <p className="text-gray-600">{course.description}</p>
                  </div>
                )}

                {activeTab === 'syllabus' && (
                  <div className="space-y-3">
                    {course.syllabus.map((lesson, index) => (
                      <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{lesson.title}</h4>
                            <p className="text-sm text-gray-600">{lesson.type} • {lesson.duration} mins</p>
                          </div>
                        </div>
                        {lesson.type === 'video' && (
                          <Download className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="text-center py-8 text-gray-500">
                    <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>Reviews will be shown here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="card p-6 sticky top-24">
              <div className="text-center mb-6">
                {course.price === 0 ? (
                  <div className="text-4xl font-bold text-success-600 mb-2">FREE</div>
                ) : (
                  <div className="text-4xl font-bold text-primary-600 mb-2">₹{course.price}</div>
                )}
                <p className="text-gray-600">One-time payment</p>
              </div>

              <button className="btn-primary w-full mb-4 py-4 text-lg">
                Enroll Now
              </button>

              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{course.duration} mins</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Level</span>
                  <span className="font-semibold capitalize">{course.level}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Language</span>
                  <span className="font-semibold">{course.language}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Students</span>
                  <span className="font-semibold">{course.enrollmentCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Certificate</span>
                  <span className="font-semibold">{course.certificate ? 'Yes' : 'No'}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-3">This course includes:</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    Lifetime access
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    Mobile friendly
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    Certificate of completion
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    Downloadable resources
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesPage;
