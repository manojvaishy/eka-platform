import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';
import { 
  Search, MapPin, Briefcase, Clock,
  Filter, X, ArrowLeft, Building, CheckCircle, Star,
  Calendar, Users, TrendingUp, Send, FileText, Heart
} from 'lucide-react';

function JobsPage() {
  const { jobs, currentUser } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('browse');
  const [savedJobs, setSavedJobs] = useState(new Set());

  const toggleSaveJob = (e, jobId) => {
    e.stopPropagation();
    setSavedJobs(prev => {
      const next = new Set(prev);
      next.has(jobId) ? next.delete(jobId) : next.add(jobId);
      return next;
    });
  };

  const categories = [
    { id: 'all', name: 'All Jobs', icon: '💼' },
    { id: 'sewing', name: 'Tailoring', icon: '🧵' },
    { id: 'beauty', name: 'Beauty', icon: '💄' },
    { id: 'cooking', name: 'Cooking', icon: '🍳' },
    { id: 'digital', name: 'Digital', icon: '💻' },
    { id: 'teaching', name: 'Teaching', icon: '👩‍🏫' },
    { id: 'craft', name: 'Handicrafts', icon: '🎨' },
  ];

  // Filter jobs
  const filteredJobs = jobs.filter(job => {
    const matchesCategory = selectedCategory === 'all' || job.category === selectedCategory;
    const matchesType = selectedType === 'all' || job.type === selectedType;
    const matchesLocation = selectedLocation === 'all' || job.location.state === selectedLocation;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.employer.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesType && matchesLocation && matchesSearch;
  });

  // Sort by distance (nearest first)
  const sortedJobs = [...filteredJobs].sort((a, b) => a.location.distance - b.location.distance);

  if (selectedJob) {
    return (
      <JobDetailView 
        job={selectedJob} 
        onBack={() => setSelectedJob(null)}
        onApply={() => setShowApplicationModal(true)}
      />
    );
  }

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
            Find Your Dream Job 💼
          </h1>
          <p className="text-gray-600 text-lg">
            {sortedJobs.length} opportunities waiting for you
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('browse')}
            className={`pb-3 px-4 font-semibold border-b-2 transition ${
              activeTab === 'browse'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Browse Jobs
          </button>
          <button
            onClick={() => setActiveTab('applied')}
            className={`pb-3 px-4 font-semibold border-b-2 transition ${
              activeTab === 'applied'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            My Applications (3)
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`pb-3 px-4 font-semibold border-b-2 transition ${
              activeTab === 'saved'
                ? 'border-primary-500 text-primary-600'
                : 'border-transparent text-gray-600'
            }`}
          >
            Saved Jobs (5)
          </button>
        </div>

        {activeTab === 'browse' && (
          <>
            {/* Search Bar */}
            <div className="mb-6 grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search jobs, companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none appearance-none"
                >
                  <option value="all">All Locations</option>
                  <option value="Maharashtra">Maharashtra</option>
                  <option value="Delhi">Delhi</option>
                  <option value="Karnataka">Karnataka</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Tamil Nadu">Tamil Nadu</option>
                </select>
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
                <span>Job Type</span>
              </button>
              
              {selectedType !== 'all' && (
                <button
                  onClick={() => setSelectedType('all')}
                  className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                >
                  <X className="w-4 h-4" />
                  Clear
                </button>
              )}
            </div>

            {showFilters && (
              <div className="mb-6 card p-6">
                <h3 className="font-bold text-gray-800 mb-4">Job Type</h3>
                <div className="flex flex-wrap gap-3">
                  {['all', 'full_time', 'part_time', 'freelance', 'remote'].map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedType(type)}
                      className={`px-4 py-2 rounded-lg font-semibold transition ${
                        selectedType === type
                          ? 'bg-primary-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Jobs List */}
            <div className="space-y-4">
              {sortedJobs.map(job => (
                <div 
                  key={job.id} 
                  className="card p-6 hover:shadow-xl transition cursor-pointer"
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex gap-4">
                    {/* Job Thumbnail Image */}
                    {job.thumbnail && (
                      <img 
                        src={job.thumbnail} 
                        alt={job.title}
                        className="w-32 h-32 rounded-lg object-cover flex-shrink-0"
                      />
                    )}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 text-lg mb-1">{job.title}</h3>
                          <div className="flex items-center gap-2">
                            <img 
                              src={job.employer.logo} 
                              alt={job.employer.name}
                              className="w-6 h-6 rounded"
                            />
                            <p className="text-gray-600">{job.employer.name}</p>
                            {job.employer.verified && (
                              <span className="badge badge-success text-xs">✓ Verified</span>
                            )}
                          </div>
                        </div>
                        <button 
                          onClick={(e) => toggleSaveJob(e, job.id)}
                          className="p-2 hover:bg-gray-100 rounded-full"
                        >
                          <Heart className={`w-5 h-5 ${savedJobs.has(job.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location.city}, {job.location.state}</span>
                          <span className="badge badge-primary text-xs ml-2">{job.location.distance}km away</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-4 h-4" />
                          <span className="capitalize">{job.type.replace('_', ' ')}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Posted 2 days ago</span>
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4 line-clamp-2">{job.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {job.skills.slice(0, 3).map((skill, index) => (
                          <span key={index} className="badge badge-primary text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-2xl font-bold text-primary-600">
                            ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600">per month</div>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={(e) => toggleSaveJob(e, job.id)}
                            className={`btn-outline px-4 py-2 flex items-center gap-1 ${savedJobs.has(job.id) ? 'text-red-500 border-red-300' : ''}`}
                          >
                            <Heart className={`w-4 h-4 ${savedJobs.has(job.id) ? 'fill-red-500' : ''}`} />
                            {savedJobs.has(job.id) ? 'Saved' : 'Save'}
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedJob(job); }}
                            className="btn-primary px-6 py-2"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {sortedJobs.length === 0 && (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-600 mb-2">No jobs found</h3>
                <p className="text-gray-500">Try adjusting your filters or search query</p>
              </div>
            )}
          </>
        )}

        {activeTab === 'applied' && (
          <ApplicationsView />
        )}

        {activeTab === 'saved' && (
          <div className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No saved jobs yet</h3>
            <p className="text-gray-500">Save jobs to apply later</p>
          </div>
        )}
      </div>

      {/* Application Modal */}
      {showApplicationModal && (
        <ApplicationModal 
          job={selectedJob}
          onClose={() => setShowApplicationModal(false)}
        />
      )}
    </div>
  );
}

// Job Detail View
function JobDetailView({ job, onBack, onApply }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Jobs</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card p-8">
              <div className="flex gap-4 mb-6">
                <img 
                  src={job.employer.logo} 
                  alt={job.employer.name}
                  className="w-20 h-20 rounded-lg"
                />
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">{job.title}</h1>
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-lg text-gray-600">{job.employer.name}</p>
                    {job.employer.verified && (
                      <span className="badge badge-success">✓ Verified Employer</span>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{job.location.city}, {job.location.state}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Briefcase className="w-4 h-4" />
                      <span className="capitalize">{job.type.replace('_', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} applicants</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                <div className="text-3xl font-bold text-primary-600 mb-1">
                  ₹{job.salary.min.toLocaleString()} - ₹{job.salary.max.toLocaleString()}
                </div>
                <div className="text-gray-600">per month</div>
              </div>

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Job Description</h2>
                  <p className="text-gray-700 leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Required Skills</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.skills.map((skill, index) => (
                      <span key={index} className="badge badge-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Requirements</h2>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Experience: {job.experience}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Education: {job.education}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">Working Hours: {job.workingHours}</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-bold text-gray-800 mb-3">Benefits</h2>
                  <ul className="space-y-2">
                    {job.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card p-6 sticky top-24">
              <button onClick={onApply} className="btn-primary w-full mb-4 py-4 text-lg">
                Apply for this Job
              </button>
              <button className="btn-outline w-full mb-6 py-3">
                Save Job
              </button>

              <div className="space-y-4 text-sm">
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Job Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Openings</span>
                      <span className="font-semibold">{job.openings}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applicants</span>
                      <span className="font-semibold">{job.applicants}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Posted</span>
                      <span className="font-semibold">2 days ago</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires</span>
                      <span className="font-semibold">25 days</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-2">Location</h3>
                  <p className="text-gray-700">{job.location.city}</p>
                  <p className="text-gray-600">{job.location.state}</p>
                  <p className="text-sm text-primary-600 mt-1">{job.location.distance}km from you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Applications View
function ApplicationsView() {
  const applications = [
    { id: 1, job: 'Tailor for Ladies Boutique', company: 'Elegant Fashions', status: 'under_review', appliedDate: '2024-02-20' },
    { id: 2, job: 'Beauty Parlour Staff', company: 'Glamour Beauty Salon', status: 'shortlisted', appliedDate: '2024-02-18' },
    { id: 3, job: 'Home Tutor', company: 'Bright Future Academy', status: 'submitted', appliedDate: '2024-02-22' },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      submitted: { class: 'badge-primary', text: 'Submitted' },
      under_review: { class: 'badge-gold', text: 'Under Review' },
      shortlisted: { class: 'badge-success', text: 'Shortlisted' },
      rejected: { class: 'bg-red-100 text-red-600', text: 'Not Selected' },
    };
    return badges[status] || badges.submitted;
  };

  return (
    <div className="space-y-4">
      {applications.map(app => {
        const badge = getStatusBadge(app.status);
        return (
          <div key={app.id} className="card p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-gray-800 text-lg mb-1">{app.job}</h3>
                <p className="text-gray-600">{app.company}</p>
              </div>
              <span className={`badge ${badge.class}`}>{badge.text}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>Applied on {new Date(app.appliedDate).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="btn-outline px-4 py-2 text-sm">View Details</button>
              <button className="btn-primary px-4 py-2 text-sm">Track Status</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Application Modal
function ApplicationModal({ job, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Apply for {job?.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Cover Letter</label>
              <textarea
                rows="6"
                placeholder="Tell us why you're perfect for this role..."
                className="input"
              ></textarea>
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Resume</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary-500 transition cursor-pointer">
                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PDF, DOC up to 5MB</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-outline flex-1 py-3">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1 py-3">
                Submit Application
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default JobsPage;
