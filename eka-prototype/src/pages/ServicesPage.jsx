import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';
import { 
  Search, MapPin, Star, Clock,
  Filter, X, ArrowLeft, CheckCircle, Calendar, Phone,
  MessageCircle, Award, TrendingUp, Heart, Shield, Users
} from 'lucide-react';

function ServicesPage() {
  const { services, currentUser } = useContext(AppContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [minRating, setMinRating] = useState(0);

  const categories = [
    { id: 'all', name: 'All Services', icon: '🛍️' },
    { id: 'sewing', name: 'Tailoring', icon: '🧵' },
    { id: 'beauty', name: 'Beauty & Makeup', icon: '💄' },
    { id: 'cooking', name: 'Cooking & Tiffin', icon: '🍳' },
    { id: 'teaching', name: 'Teaching & Tutoring', icon: '👩‍🏫' },
    { id: 'craft', name: 'Handicrafts', icon: '🎨' },
    { id: 'digital', name: 'Digital Services', icon: '💻' },
  ];

  // Filter services
  const filteredServices = services.filter(service => {
    const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
    const matchesRating = service.rating >= minRating;
    const matchesSearch = service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         service.provider.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRating && matchesSearch;
  });

  if (selectedService) {
    return (
      <ServiceDetailView 
        service={selectedService} 
        onBack={() => setSelectedService(null)}
        onBook={() => setShowBookingModal(true)}
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
            Book Services 🛍️
          </h1>
          <p className="text-gray-600 text-lg">
            Connect with skilled women professionals near you
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6 grid md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Your location..."
              className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary-500 outline-none"
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
          </button>
          
          {minRating > 0 && (
            <button
              onClick={() => setMinRating(0)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <X className="w-4 h-4" />
              Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div className="mb-6 card p-6">
            <h3 className="font-bold text-gray-800 mb-4">Minimum Rating</h3>
            <div className="flex gap-3">
              {[0, 3, 4, 4.5].map(rating => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating)}
                  className={`px-4 py-2 rounded-lg font-semibold transition ${
                    minRating === rating
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {rating === 0 ? 'All' : `${rating}+ ⭐`}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Found <span className="font-bold text-primary-600">{filteredServices.length}</span> service providers
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map(service => (
            <div 
              key={service.id} 
              className="card card-hover cursor-pointer"
              onClick={() => setSelectedService(service)}
            >
              <div className="relative">
                <img 
                  src={service.images[0]} 
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                {service.provider.verified && (
                  <span className="absolute top-3 right-3 bg-success-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    Verified
                  </span>
                )}
              </div>
              
              <div className="p-4">
                {/* Provider Info */}
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={service.provider.image} 
                    alt={service.provider.name}
                    className="w-12 h-12 rounded-full border-2 border-primary-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-800">{service.provider.name}</h4>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold">{service.rating}</span>
                      </div>
                      <span className="text-gray-500">({service.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                {/* Service Title */}
                <h3 className="font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{service.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-success-500" />
                    <span>{service.provider.completedJobs} jobs</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{service.responseTime}</span>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-1 text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>{service.location.area}, {service.location.city}</span>
                </div>

                {/* Pricing */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm text-gray-600">Starting from</div>
                    <div className="text-xl font-bold text-primary-600">
                      ₹{Object.values(service.pricing).find(v => typeof v === 'number')?.toLocaleString()}
                    </div>
                  </div>
                  <button className="btn-primary px-4 py-2 text-sm">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-600 mb-2">No services found</h3>
            <p className="text-gray-500">Try adjusting your filters or search query</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && selectedService && (
        <BookingModal 
          service={selectedService}
          onClose={() => setShowBookingModal(false)}
        />
      )}
    </div>
  );
}

// Service Detail View
function ServiceDetailView({ service, onBack, onBook }) {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-orange-50">
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <button onClick={onBack} className="flex items-center gap-2 text-gray-600 hover:text-primary-600">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Services</span>
          </button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="card mb-6 overflow-hidden">
              <img 
                src={service.images[0]} 
                alt={service.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Provider Card */}
            <div className="card p-6 mb-6">
              <div className="flex items-start gap-4">
                <img 
                  src={service.provider.image} 
                  alt={service.provider.name}
                  className="w-20 h-20 rounded-full border-4 border-primary-200"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h2 className="text-2xl font-bold text-gray-800">{service.provider.name}</h2>
                    {service.provider.verified && (
                      <span className="badge badge-success">✓ Verified</span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-lg">{service.rating}</span>
                      <span className="text-gray-600">({service.reviewCount} reviews)</span>
                    </div>
                    <div className="trust-score">
                      <Award className="w-4 h-4" />
                      <span>Trust Score: {service.provider.trustScore}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-success-500" />
                      <span>{service.provider.completedJobs} jobs completed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Responds {service.responseTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Info */}
            <div className="card">
              <div className="border-b border-gray-200">
                <div className="flex gap-6 px-6">
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'about'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('pricing')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'pricing'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    Pricing
                  </button>
                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`py-4 font-semibold border-b-2 transition ${
                      activeTab === 'reviews'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-600'
                    }`}
                  >
                    Reviews
                  </button>
                </div>
              </div>

              <div className="p-6">
                {activeTab === 'about' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{service.description}</p>
                    
                    <h4 className="font-bold text-gray-800 mb-3">Service Details</h4>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Availability: {service.availability}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Service Area: {service.serviceArea.center || 'Multiple locations'}</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-success-500 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">Languages: {service.languages.join(', ')}</span>
                      </li>
                    </ul>
                  </div>
                )}

                {activeTab === 'pricing' && (
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Service Pricing</h3>
                    <div className="space-y-3">
                      {Object.entries(service.pricing).filter(([key, value]) => typeof value === 'number').map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                          <span className="text-gray-700 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className="text-xl font-bold text-primary-600">₹{value.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <div className="mb-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="text-5xl font-bold text-gray-800">{service.rating}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <p className="text-gray-600">{service.reviewCount} reviews</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {[1,2,3].map(i => (
                        <div key={i} className="border-b border-gray-200 pb-4">
                          <div className="flex items-center gap-3 mb-2">
                            <img src={`https://i.pravatar.cc/150?img=${i+10}`} alt="User" className="w-10 h-10 rounded-full" />
                            <div>
                              <h5 className="font-semibold text-gray-800">Customer {i}</h5>
                              <div className="flex items-center gap-1">
                                {[1,2,3,4,5].map(j => (
                                  <Star key={j} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">Excellent service! Very professional and skilled. Highly recommended!</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div className="card p-6 sticky top-24">
              <button onClick={onBook} className="btn-primary w-full mb-4 py-4 text-lg">
                Book Service
              </button>
              
              <div className="flex gap-2 mb-6">
                <button className="btn-outline flex-1 py-3 flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Chat
                </button>
                <button className="btn-outline flex-1 py-3 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call
                </button>
              </div>

              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Location</h4>
                  <p className="text-gray-700">{service.location.area}</p>
                  <p className="text-gray-600">{service.location.city}, {service.location.state}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">Response Time</h4>
                  <p className="text-gray-700">{service.responseTime}</p>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <h4 className="font-bold text-gray-800 mb-2">Availability</h4>
                  <p className="text-gray-700">{service.availability}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Booking Modal
function BookingModal({ service, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-gray-800">Book Service</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6 p-4 bg-purple-50 rounded-lg">
            <img src={service.provider.image} alt={service.provider.name} className="w-12 h-12 rounded-full" />
            <div>
              <h3 className="font-bold text-gray-800">{service.title}</h3>
              <p className="text-sm text-gray-600">by {service.provider.name}</p>
            </div>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Date</label>
              <input type="date" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Select Time</label>
              <input type="time" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Service Location</label>
              <input type="text" placeholder="Enter your address" className="input" />
            </div>
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Additional Notes</label>
              <textarea rows="4" placeholder="Any special requirements..." className="input"></textarea>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Service Fee</span>
                <span className="font-bold text-gray-800">₹{Object.values(service.pricing).find(v => typeof v === 'number')}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-primary-600">
                <span>Total</span>
                <span>₹{Object.values(service.pricing).find(v => typeof v === 'number')}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={onClose} className="btn-outline flex-1 py-3">
                Cancel
              </button>
              <button type="submit" className="btn-primary flex-1 py-3">
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;
