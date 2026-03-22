import { Link } from 'react-router-dom';
import EkaLogo from '../components/EkaLogo';
import { Sparkles, BookOpen, Briefcase, Users, TrendingUp, Star, Heart, Award } from 'lucide-react';

function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md shadow-md fixed w-full z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <EkaLogo size="md" />
            </div>
            <div className="hidden md:flex gap-8">
              <a href="#features" className="text-gray-700 hover:text-primary-500 transition">Features</a>
              <a href="#success" className="text-gray-700 hover:text-primary-500 transition">Success Stories</a>
              <a href="#about" className="text-gray-700 hover:text-primary-500 transition">About</a>
            </div>
            <Link to="/login" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Empowering & Motivational */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <div className="inline-block mb-4">
                <span className="badge badge-primary text-lg px-6 py-2">
                <Sparkles className="w-5 h-5 inline mr-2" />
                  Empowering 50,000+ Women
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
                <span className="gradient-text">She Can Shine</span>
                <br />
                <span className="text-gray-800">Your Skills,</span>
                <br />
                <span className="text-gray-800">Your Future</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Learn new skills, earn income, and build your dreams. Join India's largest women empowerment platform. 
                <span className="font-semibold text-primary-600"> Free courses, real opportunities, supportive community.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/login" className="btn-primary text-lg px-8 py-4">
                  Start Your Journey
                </Link>
                <a 
                  href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn-outline text-lg px-8 py-4 flex items-center justify-center gap-2"
                >
                  ▶ Watch Video
                </a>
              </div>
              <div className="mt-8 flex gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary-600">50K+</div>
                  <div className="text-gray-600">Women Empowered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-secondary-600">100+</div>
                  <div className="text-gray-600">Free Courses</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-success-600">₹10Cr+</div>
                  <div className="text-gray-600">Earned by Women</div>
                </div>
              </div>
            </div>
            <div className="relative animate-slide-up">
              <div className="relative z-10">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600" 
                  alt="Empowered Woman" 
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">4.8/5 Rating</div>
                      <div className="text-sm text-gray-600">From 10,000+ Women</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute top-10 -right-10 w-32 h-32 bg-primary-200 rounded-full blur-3xl opacity-50"></div>
              <div className="absolute bottom-10 -left-10 w-32 h-32 bg-secondary-200 rounded-full blur-3xl opacity-50"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Motivational Quote */}
      <section className="py-12 px-6">
        <div className="container mx-auto">
          <div className="quote-box text-center max-w-4xl mx-auto">
            <Heart className="w-12 h-12 mx-auto mb-4" />
            <p className="text-2xl mb-4">
              "Every woman has the power to create her own destiny. Eka is here to light your path."
            </p>
            <p className="text-lg opacity-90">- Empowering Women, One Skill at a Time</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Everything You Need to Succeed</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From learning to earning, we support you at every step of your journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Learn Skills</h3>
              <p className="text-gray-600">
                100+ free courses in tailoring, cooking, beauty, digital skills, and more. Learn in Hindi & English.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Briefcase className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Find Jobs</h3>
              <p className="text-gray-600">
                Thousands of job opportunities near you. Apply with one click. Get hired faster.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-teal to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Earn Income</h3>
              <p className="text-gray-600">
                Offer your services, start your business, earn from home. Your skills, your income.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="card card-hover p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-accent-pink to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Join Community</h3>
              <p className="text-gray-600">
                Connect with 50,000+ women. Share success, get support, grow together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="section-title">Real Women, Real Success</h2>
            <p className="text-xl text-gray-600">Inspiring stories from our Eka family</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Story 1 */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=1" 
                  alt="Priya" 
                  className="w-16 h-16 rounded-full border-4 border-primary-200"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Priya Sharma</h4>
                  <p className="text-sm text-gray-600">Mumbai, Maharashtra</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "Started with zero skills. Now earning ₹25,000/month from tailoring. Eka changed my life!"
              </p>
              <div className="flex gap-2">
                <span className="badge badge-success">₹25K/month</span>
                <span className="badge badge-primary">Tailoring</span>
              </div>
            </div>

            {/* Story 2 */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=5" 
                  alt="Anjali" 
                  className="w-16 h-16 rounded-full border-4 border-primary-200"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Anjali Verma</h4>
                  <p className="text-sm text-gray-600">Delhi</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "From housewife to professional makeup artist. 156 happy clients and counting!"
              </p>
              <div className="flex gap-2">
                <span className="badge badge-success">156 Jobs</span>
                <span className="badge badge-gold">Top Rated</span>
              </div>
            </div>

            {/* Story 3 */}
            <div className="card p-6">
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src="https://i.pravatar.cc/150?img=9" 
                  alt="Meera" 
                  className="w-16 h-16 rounded-full border-4 border-primary-200"
                />
                <div>
                  <h4 className="font-bold text-gray-800">Meera Devi</h4>
                  <p className="text-sm text-gray-600">Lucknow, UP</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "At 45, became a mentor! Now teaching 20+ women. Age is just a number!"
              </p>
              <div className="flex gap-2">
                <span className="badge badge-primary">Mentor</span>
                <span className="badge badge-gold">20+ Students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container mx-auto text-center text-white">
          <Award className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join 50,000+ women who are learning, earning, and achieving their dreams. 
            Your success story starts here!
          </p>
          <Link to="/login" className="inline-block bg-white text-primary-600 px-12 py-4 rounded-lg font-bold text-lg shadow-2xl hover:shadow-glow transform hover:scale-105 transition-all duration-300">
            Join Eka Today - It's Free!
          </Link>
          <p className="mt-6 text-sm opacity-75">No credit card required • 100% Free • Start in 2 minutes</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <EkaLogo size="sm" />
              </div>
              <p className="text-gray-400">
                Empowering women across India through skills, opportunities, and community.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Learn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-400">Courses</a></li>
                <li><a href="#" className="hover:text-primary-400">Certifications</a></li>
                <li><a href="#" className="hover:text-primary-400">Mentors</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Earn</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-400">Find Jobs</a></li>
                <li><a href="#" className="hover:text-primary-400">Offer Services</a></li>
                <li><a href="#" className="hover:text-primary-400">Start Business</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-primary-400">Help Center</a></li>
                <li><a href="#" className="hover:text-primary-400">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary-400">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2024 Eka. Made with ❤️ for women empowerment in India.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
